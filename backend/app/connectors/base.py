from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime
from pydantic import BaseModel
import httpx
import structlog
from app.connectors.utils.retry import retry_with_backoff

logger = structlog.get_logger()


class UsageData(BaseModel):
    platform: str
    organization_id: str
    connection_id: str
    total_cost_usd: float = 0.0
    input_tokens: int = 0
    output_tokens: int = 0
    requests_count: int = 0
    executions_count: int = 0
    last_synced_at: datetime
    metadata: Dict[str, Any] = {}
    error_count: int = 0


class BaseConnector(ABC):
    platform_name: str
    base_url: str
    auth_type: str

    def __init__(
        self, connection_data: Dict[str, Any], organization_id: str, connection_id: str
    ):
        self.connection_data = connection_data
        self.organization_id = organization_id
        self.connection_id = connection_id
        self.client = httpx.AsyncClient(timeout=30.0)
        self.logger = logger.bind(platform=self.platform_name, org_id=organization_id)

    @abstractmethod
    async def validate_connection(self) -> bool:
        pass

    @abstractmethod
    async def fetch_usage(
        self, start_date: Optional[datetime] = None, end_date: Optional[datetime] = None
    ) -> UsageData:
        pass

    @abstractmethod
    async def handle_webhook(
        self, payload: Dict[str, Any], signature: Optional[str] = None
    ) -> UsageData:
        pass

    async def safe_request(self, method: str, url: str, **kwargs) -> Dict:
        return await retry_with_backoff(self._make_request, method, url, **kwargs)

    async def _make_request(self, method: str, url: str, **kwargs):
        async with self.client as client:
            response = await client.request(method, url, **kwargs)
            response.raise_for_status()
            return response.json()

    def get_auth_headers(self) -> Dict[str, str]:
        raise NotImplementedError
