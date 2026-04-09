from typing import Dict, Type
from app.connectors.base import BaseConnector


class ConnectorRegistry:
    _registry: Dict[str, Type[BaseConnector]] = {}

    @classmethod
    def register(cls, platform_name: str):
        def decorator(connector_class: Type[BaseConnector]):
            cls._registry[platform_name.lower()] = connector_class
            return connector_class

        return decorator

    @classmethod
    def get_connector(
        cls,
        platform_name: str,
        connection_data: Dict,
        organization_id: str,
        connection_id: str,
    ) -> BaseConnector:
        key = platform_name.lower()
        if key not in cls._registry:
            raise ValueError(f"No connector for {platform_name}")
        return cls._registry[key](connection_data, organization_id, connection_id)
