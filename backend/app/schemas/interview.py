from pydantic import BaseModel


class InterviewRequest(BaseModel):
    role: str
    difficulty: str
    questions: int


class AnswerEvaluationRequest(BaseModel):
    question: str
    answer: str