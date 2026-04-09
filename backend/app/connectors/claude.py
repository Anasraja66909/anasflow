from app.connectors.base import BaseConnector, UsageData
from app.connectors.registry import ConnectorRegistry
from datetime import datetime


@ConnectorRegistry.register("claude")
class ClaudeConnector(BaseConnector):
    platform_name = "claude"
    base_url = "https://api.anthropic.com"
    auth_type = "api_key"

    async def validate_connection(self) -> bool:
        # Implement actual validation logic
        return True

    async def fetch_usage(self, start_date=None, end_date=None) -> UsageData:
        # Dummy data for MVP
        return UsageData(
            platform=self.platform_name,
            organization_id=self.organization_id,
            connection_id=self.connection_id,
            total_cost_usd=0.0,
            last_synced_at=datetime.utcnow(),
        )

    async def handle_webhook(self, payload, signature=None) -> UsageData:
        # Dummy webhook handler
        return await self.fetch_usage()

    def get_auth_headers(self):
        return {"x-api-key": self.connection_data.get("api_key", "")}
