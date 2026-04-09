from typing import Dict, Any, Optional
from datetime import datetime
from app.connectors.base import BaseConnector, UsageData
from app.connectors.registry import ConnectorRegistry


def create_stub_connector(platform_key: str, name: str, auth: str, base_api_url: str):
    """Dynamically creates and registers a stub BaseConnector class."""

    class StubConnector(BaseConnector):
        platform_name = platform_key
        base_url = base_api_url
        auth_type = auth

        def get_auth_headers(self) -> Dict[str, str]:
            # Stub implementation
            return {}

        async def validate_connection(self) -> bool:
            # Stub implementation - automatically assume valid for mock environments
            return True

        async def fetch_usage(
            self,
            start_date: Optional[datetime] = None,
            end_date: Optional[datetime] = None,
        ) -> UsageData:
            import random

            # Generate deterministic but random-looking mock data
            seed = sum(ord(c) for c in self.platform_name)
            random.seed(seed)
            return UsageData(
                platform=self.platform_name,
                organization_id=self.organization_id,
                connection_id=self.connection_id,
                total_cost_usd=round(random.uniform(10, 200), 2),
                requests_count=random.randint(100, 5000),
                last_synced_at=datetime.utcnow(),
            )

        async def handle_webhook(
            self, payload: Dict[str, Any], signature: Optional[str] = None
        ) -> UsageData:
            pass

    # Rename class for debugging purposes
    StubConnector.__name__ = f"{name.replace(' ', '')}Connector"

    # Register directly
    ConnectorRegistry.register(platform_key)(StubConnector)


# =====================================================================
# Phase 2 Growth Platforms
# =====================================================================
create_stub_connector("hubspot", "HubSpot", "oauth2", "https://api.hubapi.com")
create_stub_connector(
    "elevenlabs", "ElevenLabs", "api_key", "https://api.elevenlabs.io"
)
create_stub_connector("stripe", "Stripe", "oauth2", "https://api.stripe.com")
create_stub_connector("shopify", "Shopify", "oauth2", "https://{shop}.myshopify.com")
create_stub_connector("mistral", "Mistral AI", "api_key", "https://api.mistral.ai")
create_stub_connector(
    "gemini", "Gemini", "api_key", "https://generativelanguage.googleapis.com"
)

# =====================================================================
# Phase 3 World-Class Platforms
# =====================================================================
create_stub_connector(
    "salesforce", "Salesforce", "oauth2", "https://yourInstance.salesforce.com"
)
create_stub_connector("zoho_crm", "Zoho CRM", "oauth2", "https://www.zohoapis.com")
create_stub_connector(
    "activecampaign", "ActiveCampaign", "api_key", "https://yourInstance.api-us1.com"
)
create_stub_connector("heygen", "HeyGen", "api_key", "https://api.heygen.com")
create_stub_connector("runway", "Runway", "api_key", "https://api.runwayml.com")
create_stub_connector("notion", "Notion", "oauth2", "https://api.notion.com")
create_stub_connector("airtable", "Airtable", "oauth2", "https://api.airtable.com")
create_stub_connector("slack", "Slack", "oauth2", "https://slack.com/api")
create_stub_connector("pipedream", "Pipedream", "api_key", "https://api.pipedream.com")
create_stub_connector(
    "activepieces", "Activepieces", "api_key", "https://cloud.activepieces.com/api"
)
create_stub_connector(
    "aws_bedrock", "AWS Bedrock", "api_key", "https://bedrock.us-east-1.amazonaws.com"
)
create_stub_connector(
    "gcp_vertex",
    "GCP Vertex AI",
    "api_key",
    "https://us-central1-aiplatform.googleapis.com",
)
create_stub_connector(
    "azure_openai", "Azure OpenAI", "api_key", "https://yourInstance.openai.azure.com"
)
create_stub_connector(
    "perplexity", "Perplexity AI", "api_key", "https://api.perplexity.ai"
)
create_stub_connector("cohere", "Cohere", "api_key", "https://api.cohere.ai")
create_stub_connector("waalaxy", "Waalaxy", "api_key", "https://api.waalaxy.com")
create_stub_connector(
    "instantly", "Instantly.ai", "api_key", "https://api.instantly.ai"
)
create_stub_connector(
    "power_automate", "Power Automate", "oauth2", "https://api.flow.microsoft.com"
)
