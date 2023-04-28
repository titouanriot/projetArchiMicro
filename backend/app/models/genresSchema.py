from sqlalchemy import ForeignKey, PrimaryKeyConstraint, String
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class GenresSchema(Base):
    __tablename__ = 'Genre'
    id_genre = Column(Integer, primary_key=True, index=True)
    genre_name = Column(String(100))