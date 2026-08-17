from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.auth.jwt import create_access_token
from app.auth.password import hash_password
from app.auth.password import verify_password

from app.core.dependencies import get_db

from app.crud.user import (
    create_user,
    get_user_by_email,
)

from app.schemas.user import (
    UserLogin,
    UserRegister,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
):

    existing_user = get_user_by_email(
        db,
        user.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    new_user = create_user(
        db=db,
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
    )

    token = create_access_token(
        {
            "sub": new_user.email
        }
    )

    return {
        "message": "Registration successful",
        "access_token": token,
        "token_type": "bearer",
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):

    db_user = get_user_by_email(
        db,
        user.email,
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials.",
        )

    if not verify_password(
        user.password,
        db_user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials.",
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }