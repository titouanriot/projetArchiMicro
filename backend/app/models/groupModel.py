from pydantic import BaseModel
from datetime import date

class GroupBase(BaseModel):
    group_name : str
    owner : int

    class Config:
        orm_mode = True

class Group(GroupBase):
    id_group : int

    class Config:
        orm_mode = True

        

class BelongToBase(BaseModel):

    id_user: int
    id_group: int

    class Config:
        orm_mode = True