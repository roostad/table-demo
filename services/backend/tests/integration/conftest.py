import pytest
from starlette.testclient import TestClient

from app import main
from config.settings import get_settings, Settings


def get_settings_override():
    return Settings(testing=True)


@pytest.fixture(scope="module")
def client():
    main.app.dependency_overrides[get_settings] = get_settings_override
    with TestClient(main.app) as test_client:
        yield test_client
