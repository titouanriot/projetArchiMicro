from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class GenreSchema(Base):
    __tablename__ = 'Genre'
    id_genre = Column(Integer, primary_key=True, index=True, nullable=False)
    genre_name = Column(String(255), nullable=False)