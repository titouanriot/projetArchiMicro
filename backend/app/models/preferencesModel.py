from pydantic import BaseModel


class PreferenceBase(BaseModel):
    id_user : int
    id_genre : int

    class Config:
        orm_mode = True