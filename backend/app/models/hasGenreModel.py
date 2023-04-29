from pydantic import BaseModel

class HasGenreBase(BaseModel):
    id_genre: int
    id_movie: int

    class Config:
        orm_mode = True