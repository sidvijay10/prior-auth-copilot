# backend/main.py
from fastapi import FastAPI, HTTPException
from datetime import datetime, timedelta
from uuid import uuid4
from typing import Dict
from models import CaseResponse  # Import your CaseResponse model
import json
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


# Temporary in-memory storage for cases with their creation times.
cases: Dict[str, datetime] = {}

def read_mock_response(file_name: str) -> dict:
    # Construct the file path by going up one level from the backend directory and then into the assets directory
    path = os.path.join(os.path.dirname(__file__), f"../assets/{file_name}")
    with open(path, 'r') as file:
        return json.load(file)

def get_case_response(case_id: str) -> dict:
    if case_id not in cases:
        raise HTTPException(status_code=404, detail="Case not found")

    creation_time = cases[case_id]
    time_elapsed = (datetime.now() - creation_time).total_seconds()

    # Determine which mock response to return based on the elapsed time.
    if time_elapsed < 10:
        mock_response = read_mock_response('response-1.json')
    elif time_elapsed < 30:
        mock_response = read_mock_response('response-2.json')
    else:
        mock_response = read_mock_response('response-3.json')

    # Replace the placeholder case ID with the actual case ID.
    mock_response["case_id"] = case_id
    return mock_response

@app.post("/cases")
async def create_case():
    # Create a new case with a unique ID and the current timestamp.
    case_id = str(uuid4())
    cases[case_id] = datetime.now()
    return {"id": case_id}

@app.get("/cases/{case_id}")
async def get_case(case_id: str):
    # Get the simulated case response for the given ID.
    return get_case_response(case_id)

@app.get("/cases")
async def get_all_cases():
    # Get the simulated case responses for all cases.
    return [get_case_response(case_id) for case_id in cases]