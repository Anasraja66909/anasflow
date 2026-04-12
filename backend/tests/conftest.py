import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    """
    Test client fixture for FastAPI app.
    """
    with TestClient(app) as c:
        yield c

@pytest.fixture
def mock_openai(mocker):
    """
    Mock OpenAI API calls to avoid rate limits and costs during tests.
    """
    return mocker.patch("app.routers.ai_doctor.openai.ChatCompletion.create")
