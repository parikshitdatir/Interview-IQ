from sqlalchemy.orm import Session

from app.models.interview import InterviewResult


def save_result(
    db: Session,
    role: str,
    difficulty: str,
    score: str,
    feedback: str,
):
    result = InterviewResult(
        role=role,
        difficulty=difficulty,
        score=score,
        feedback=feedback,
    )

    db.add(result)
    db.commit()
    db.refresh(result)

    return result


def get_results(db: Session):
    return db.query(InterviewResult).all()