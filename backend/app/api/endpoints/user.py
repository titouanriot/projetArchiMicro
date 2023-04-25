from fastapi import APIRouter, Depends
from app.services.userService import UserService
from app.database import SessionLocal
from sqlalchemy.orm import Session
from app.models.userModel import UserBase, User
from app.models.userSchema import User
from sqlalchemy.exc import SQLAlchemyError

"""
    Describe the parameters of this api file
"""
router = APIRouter(
    prefix='/user',
    tags = ['user']
)

service = UserService()
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally :
        db.close()

@router.get("/get_first_user")
async def get_first_user(db : Session = Depends(get_db)):
    """
        Get the first user in database
    """
    item = db.query(User).first()
    pydantic_user = UserBase.from_orm(item)
    return {'response' : pydantic_user}

@router.get("/get_by_email")
async def get_first_user(email : str, db : Session = Depends(get_db)):
    """
        Get the first user in database
    """
    item = db.query(User).filter_by(email=email).first()
    pydantic_user = UserBase.from_orm(item)
    return {'response' : pydantic_user}

@router.post("/add_user")
async def add_user(new_user : UserBase, db : Session = Depends(get_db)):
    """
        Add a user in the database
    """
    try:
        user_db = User(**new_user.dict())
        db.add(user_db)
        db.commit()
        return {'result' : 'ok'}
    except SQLAlchemyError as e:
        db.rollback()
        return {'result' : 'An error occured'}
