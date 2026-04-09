from typing import Dict, Any, Optional
from datetime import datetime
from app.connectors.base import BaseConnector, UsageData, ConnectorError
from app.connectors.registry import ConnectorRegistry


@ConnectorRegistry.register("retell")
class RetellConnector(BaseConnector):
    platform_name = "retell"
    base_url = "https://api.retellai.com"
    auth_type = "api_key"

    def get_auth_headers(self) -> Dict[str, str]:
        api_key = self.connection_data.get("api_key")
        if not api_key:
            raise ConnectorError("API Key not found for Retell AI connection")
        return {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

    async def validate_connection(self) -> bool:
        try:
            # Retell has a GET /list-agents or similar simple endpoint for validation
            res = await self.safe_request(
                "GET", f"{self.base_url}/list-agents", headers=self.get_auth_headers()
            )
            return isinstance(res, list)
        except Exception as e:
            self.logger.error("retell_validation_failed", error=str(e))
            return False

    async def fetch_usage(
        self, start_date: Optional[datetime] = None, end_date: Optional[datetime] = None
    ) -> UsageData:
        # Placeholder for usage statistics
        return UsageData(
            platform=self.platform_name,
            organization_id=self.organization_id,
            connection_id=self.connection_id,
            total_cost_usd=0.0,
            last_synced_at=datetime.utcnow(),
        )

    async def handle_webhook(
        self, payload: Dict[str, Any], signature: Optional[str] = None
    ) -> UsageData:
        pass
