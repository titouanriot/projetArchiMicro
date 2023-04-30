from pydantic import BaseModel

class BelongToModel(BaseModel):
    id_user: int
    id_group: int

    class Config:
        orm_mode = True