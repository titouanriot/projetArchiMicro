from pydantic import BaseModel

class WatchedModel(BaseModel):
    id_user : int
    id_movie : int
    appreciation : int

    class Config:
        orm_mode = True