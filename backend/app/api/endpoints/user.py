from typing import Annotated, List
from fastapi import APIRouter, Body, Depends, HTTPException, status
from app.services.userService import UserService
from app.database import SessionLocal
from sqlalchemy.orm import Session
from app.models.userModel import UserBase, User
from app.models.userSchema import UserSchema
from sqlalchemy.exc import SQLAlchemyError
from urllib.parse import unquote

from app.models.genreModel import GenreBase

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
        raise HTTPException(status_code=404, detail="This user does not exist")




# @router.post("/add_user")
# async def add_user(new_user : UserBase, db : Session = Depends(get_db)):
#     """
#         Add a user in the database
#     """
#     return service.createUser(new_user, db)

@router.post("/add_user", response_model=UserBase, status_code=status.HTTP_201_CREATED)
async def add_user(new_user : UserBase, db : Session = Depends(get_db)):
    """
        Add a user in the database
    """
    service.createUser(new_user, db)
    return new_user
    # result = service.createUser(new_user, db)
    # if 'result' in result.keys():
    #     return new_user
    # else:
    #     if result['Error'] == 'This user does already exist':
    #         raise HTTPException(
    #             status_code=status.HTTP_400_BAD_REQUEST,
    #             detail="User already exists"
    #         )
    #     else:
    #         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        



@router.delete("/delete_user")
async def delete_user(email : str, db : Session = Depends(get_db)):
    return service.delete_user(email, db)

@router.post("/update_user")
async def update_user(user : UserBase, db : Session = Depends(get_db)):
    return service.update_user(user, db)

@router.post("/has_preferences")
async def has_preferences(user : UserBase, db : Session = Depends(get_db)):
    return service.has_preferences(user,db)

@router.get("/has_preferences")
async def has_preferences(email : str, db : Session = Depends(get_db)):
    mail: str = unquote(email)
    return service.has_preferences(mail,db)

@router.get("/has_preferences")
async def has_preferences_by_id(id : int, db : Session = Depends(get_db)):
    return service.has_preferences_by_id(id,db)

@router.post("/set_preferences")
async def set_preferences(email : Annotated[str, Body()], genres : List[GenreBase], db : Session = Depends(get_db)):
    mail: str = unquote(email)
    return service.set_preferences(mail, genres, db)

@router.get("/get_preferences")
async def get_preferences(email : str, db : Session = Depends(get_db)):
    mail: str = unquote(email)
    return service.get_preferences(mail, db)