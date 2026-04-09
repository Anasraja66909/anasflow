from typing import Dict, Any, Optional
from datetime import datetime
from app.connectors.base import BaseConnector, UsageData, ConnectorError

from app.connectors.registry import ConnectorRegistry


@ConnectorRegistry.register("manychat")
class ManyChatConnector(BaseConnector):
    platform_name = "manychat"
    base_url = "https://api.manychat.com/fb"
    auth_type = "api_key"

    def get_auth_headers(self) -> Dict[str, str]:
        api_key = self.connection_data.get("api_key")
        if not api_key:
            raise ConnectorError("API Key not found for ManyChat connection")
        return {"Authorization": f"Bearer {api_key}", "Accept": "application/json"}

    async def validate_connection(self) -> bool:
        try:
            # Hit me endpoint
            res = await self.safe_request(
                "GET", f"{self.base_url}/page/getInfo", headers=self.get_auth_headers()
            )
            return res.get("status") == "success"
        except Exception as e:
            self.logger.error("manychat_validation_failed", error=str(e))
            return False

    async def fetch_usage(
        self, start_date: Optional[datetime] = None, end_date: Optional[datetime] = None
    ) -> UsageData:
        # Placeholder for usage statistics, Manychat doesn't strictly have an easily pullable cost API, just limits.
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
