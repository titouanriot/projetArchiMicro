from fastapi import APIRouter, Depends, HTTPException, status, Body
from typing import Annotated
from app.services.userService import UserService
from app.services.groupService import GroupService
from app.database import SessionLocal
from sqlalchemy.orm import Session
from app.models.userModel import UserBase, User
from app.models.userSchema import UserSchema
from sqlalchemy.exc import SQLAlchemyError
from urllib.parse import unquote

from app.api.endpoints.auth import get_user_from_token

"""
    Describe the parameters of this api file
"""
router = APIRouter(
    prefix='/group',
    tags = ['group']
)

service = GroupService()
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally :
        db.close()

        
        
@router.get("/from_member")
async def get_groups_from_members(db : Session = Depends(get_db), user : User = Depends(get_user_from_token)):
    return service.get_groups_from_member(db, user)

@router.get("/from_owner")
async def get_groups_from_owner(db : Session = Depends(get_db), user : User = Depends(get_user_from_token)):
    return service.get_groups_from_owner(db, user)
        
@router.put("/", status_code=status.HTTP_201_CREATED)
async def create_group(group_name : Annotated[str, Body(min_length=1, embed=True)], db : Session = Depends(get_db), user : User = Depends(get_user_from_token)):
    return service.create_group(group_name, db, user)

@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_group(group_name: Annotated[str, Body(min_length=1, embed=True)], db : Session = Depends(get_db), user : User = Depends(get_user_from_token)):
    return service.delete_group(group_name, db ,user)

@router.post("/add_user")
async def add_user_to_group(group_name: Annotated[str, Body(min_length=1, embed=True)],\
                            email: Annotated[str, Body(min_length=1, embed=True)],\
                            db: Session = Depends(get_db),\
                            user: User = Depends(get_user_from_token)):
    return service.add_user_to_group(group_name, email, db, user)