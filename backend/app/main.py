from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.interviews import router as interview_router
from app.api.auth import router as auth_router

from app.core.database import Base
from app.core.database import engine

from app.models.user import User
from app.models.interview import InterviewResult

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="InterviewIQ AI API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(interview_router)


@app.get("/")
def root():
    return {
        "message": "InterviewIQ AI Backend Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }