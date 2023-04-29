from pydantic import BaseModel
from datetime import date

class UserBase(BaseModel):
    first_name : str
    last_name : str
    email : str
    birth_date : date
    password : str
    is_user_account_active : bool
    is_admin : bool

    class Config:
        orm_mode = True

        
class UserLogin(BaseModel):
    email : str
    password : str

class User(UserBase):
    id : int
    class Config:
        orm_mode = True

class UserLogged(BaseModel):
    email: str
    token : str