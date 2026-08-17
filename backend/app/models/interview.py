from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.core.database import Base


class InterviewResult(Base):

    __tablename__ = "interview_results"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    role = Column(String(100))

    difficulty = Column(String(50))

    score = Column(String(20))

    feedback = Column(Text)