# backend/models.py
from typing import List, Optional
from pydantic import BaseModel

class Step(BaseModel):
    key: str
    question: str
    options: List[dict]
    logic: Optional[List[dict]] = None
    reasoning: str
    decision: str
    next_step: str
    is_met: bool
    is_final: bool
    evidence: List[dict]

class CaseResponse(BaseModel):
    case_id: str
    status: str
    procedure_name: str
    cpt_codes: List[str]
    summary: Optional[str] = None
    is_met: bool
    is_complete: bool
    steps: Optional[List[Step]] = None
