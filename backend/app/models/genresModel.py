from pydantic import BaseModel

class GenresBase(BaseModel):
    id : int
    name : str

    class Config:
        orm_mode = True