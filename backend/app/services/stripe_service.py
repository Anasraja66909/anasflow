import stripe
import os
from sqlalchemy.orm import Session
from app.models import Subscription
from datetime import datetime

# Initialize stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_demo")


class StripeService:
    @staticmethod
    def create_checkout_session(
        user_id: str,
        plan_id: str,
        billing_cycle: str,
        success_url: str,
        cancel_url: str,
    ):
        """Create a Stripe Checkout session for a subscription"""
        # In a real app, these would be the actual stripe_price_ids
        # For demo, we use placeholder prices if real keys are missing
        price_id = f"price_{plan_id}_{billing_cycle}"

        try:
            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "product_data": {
                                "name": f"AnasFlow {plan_id.title()} Plan",
                            },
                            "unit_amount": (
                                2900
                                if plan_id == "starter"
                                else 7900 if plan_id == "agency" else 19900
                            ),
                            "recurring": {
                                "interval": (
                                    "month" if billing_cycle == "monthly" else "year"
                                )
                            },
                        },
                        "quantity": 1,
                    }
                ],
                mode="subscription",
                success_url=success_url,
                cancel_url=cancel_url,
                client_reference_id=user_id,
                metadata={"plan_id": plan_id, "billing_cycle": billing_cycle},
            )
            return session.url
        except Exception as e:
            print(f"Stripe Session Error: {e}")
            # Fallback for demo if stripe keys are invalid
            return "https://checkout.stripe.com/demo"

    @staticmethod
    def handle_webhook(payload: bytes, sig_header: str, db: Session):
        """Handle Stripe webhook events"""
        webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "")

        try:
            event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
        except Exception as e:
            print(f"Webhook Signature Error: {e}")
            return False

        # Handle specifically: checkout.session.completed
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            user_id = session.get("client_reference_id")
            subscription_id = session.get("subscription")
            customer_id = session.get("customer")
            plan_id = session.get("metadata", {}).get("plan_id", "starter")

            if user_id:
                # Update DB
                sub = (
                    db.query(Subscription)
                    .filter(Subscription.user_id == user_id)
                    .first()
                )
                if not sub:
                    sub = Subscription(user_id=user_id)
                    db.add(sub)

                sub.plan = plan_id
                sub.status = "active"
                sub.stripe_customer_id = customer_id
                sub.stripe_subscription_id = subscription_id
                sub.current_period_start = datetime.utcnow()
                db.commit()

        return True
