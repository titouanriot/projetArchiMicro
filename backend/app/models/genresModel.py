from pydantic import BaseModel

class GenresBase(BaseModel):
    id_genre : int
    genre_name : str

    class Config:
        orm_mode = True