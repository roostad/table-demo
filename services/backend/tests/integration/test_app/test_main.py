from app.main import app


def test_health(client):
    """
    Health Check
    """
    response = client.get("/health/")
    assert response.status_code == 200
    assert response.json() == {"message": "OK"}
