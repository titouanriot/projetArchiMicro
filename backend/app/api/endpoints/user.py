from fastapi import APIRouter, Depends
from app.services.userService import UserService
from app.database import SessionLocal
from sqlalchemy.orm import Session
from app.models.userModel import UserBase, User
from app.models.userSchema import UserSchema
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

@router.get("/get_all")
async def get_all_users(db : Session = Depends(get_db)):
    return service.get_all_users(db)

@router.get("/get_by_email")
async def get_by_email(email : str, db : Session = Depends(get_db)):
    """
        Get the first user in database
    """
    doesExist = service.checkIfExists(email, db)
    if doesExist :
        item = db.query(UserSchema).filter_by(email=email).first()
        pydantic_user = UserBase.from_orm(item)
        return {'response' : pydantic_user}
    else:
        return {'Error' : 'This user does not exist'}

@router.post("/add_user")
async def add_user(new_user : UserBase, db : Session = Depends(get_db)):
    """
        Add a user in the database
    """
    return service.createUser(new_user, db)


@router.delete("/delete_user")
async def delete_user(email : str, db : Session = Depends(get_db)):
    return service.delete_user(email, db)

@router.post("/update_user")
async def update_user(user : UserBase, db : Session = Depends(get_db)):
    return service.update_user(user, db)
