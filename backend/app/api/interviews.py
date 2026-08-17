from fastapi import APIRouter

from app.schemas.interview import (
    AnswerEvaluationRequest,
    InterviewRequest,
)
from app.services.groq_service import (
    evaluate_answer,
    evaluate_interview,
    generate_questions,
    test_connection,
)

router = APIRouter()


@router.get("/interviews")
def get_interviews():
    return [
        {
            "id": 1,
            "title": "Python",
            "difficulty": "Intermediate",
            "questions": 10,
        },
        {
            "id": 2,
            "title": "Machine Learning",
            "difficulty": "Advanced",
            "questions": 12,
        },
        {
            "id": 3,
            "title": "SQL",
            "difficulty": "Beginner",
            "questions": 8,
        },
    ]


@router.get("/ai-test")
def ai_test():
    return {
        "message": test_connection()
    }


@router.post("/generate-questions")
def generate_interview_questions(data: InterviewRequest):
    return generate_questions(
        role=data.role,
        difficulty=data.difficulty,
        questions=data.questions,
    )


@router.post("/evaluate-answer")
def evaluate(data: AnswerEvaluationRequest):
    return {
        "result": evaluate_answer(
            data.question,
            data.answer,
        )
    }


@router.post("/evaluate-interview")
def evaluate_complete_interview(data: dict):
    return evaluate_interview(data["answers"])