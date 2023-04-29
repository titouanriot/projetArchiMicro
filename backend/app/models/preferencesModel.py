from pydantic import BaseModel


class PreferencesBase(BaseModel):
    id_user : int
    id_genre : int

    class Config:
        orm_mode = True