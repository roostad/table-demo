
def test_accounts(client):
    """
    UPDATE TEST/API ENDPOINT ONCE DB IS UP AND RUNNING
    """
    response = client.get("/assignments")
    assert response.status_code == 200
