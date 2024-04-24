from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_case():
    # Test case creation
    response = client.post("/cases")
    assert response.status_code == 200
    assert "id" in response.json()
    case_id = response.json()["id"]

    # Test retrieving the newly created case (should be in 'submitted' status)
    response = client.get(f"/cases/{case_id}")
    assert response.status_code == 200
    assert response.json()["status"] == "submitted"
    
    return case_id  # Return case_id for further testing

def test_retrieve_case():
    case_id = test_create_case()

    # Test that initially, the case is in 'submitted' status
    response = client.get(f"/cases/{case_id}")
    assert response.status_code == 200
    assert response.json()["status"] == "submitted"
    
    # Wait for 10 seconds to simulate case status change to 'processing'
    import time
    time.sleep(10)
    response = client.get(f"/cases/{case_id}")
    assert response.status_code == 200
    assert response.json()["status"] == "processing"
    
    # Wait for an additional 20 seconds to simulate case status change to 'complete'
    time.sleep(20)
    response = client.get(f"/cases/{case_id}")
    assert response.status_code == 200
    assert response.json()["status"] == "complete"

def test_get_all_cases():
    # Ensure that the endpoint for retrieving all cases is functioning correctly
    response = client.get("/cases")
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Should return a list of cases

def test_case_not_found():
    # Test for a case ID that does not exist
    response = client.get("/cases/non_existent_case_id")
    assert response.status_code == 404
    assert response.json() == {"detail": "Case not found"}

def test_default():
    # Test the default root endpoint
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
