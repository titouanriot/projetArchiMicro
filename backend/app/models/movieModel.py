from pydantic import BaseModel
from datetime import date

class MovieBase(BaseModel):
    id_movie: int
    original_title: str
    title: str
    language: str
    popularity: float
    poster_path: str
    release_date: date
    runtime: int
    vote_average: float
    vote_count: int
    overview: str

    class Config:
        orm_mode = True