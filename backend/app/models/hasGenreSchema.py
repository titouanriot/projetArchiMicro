from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer
from sqlalchemy.orm import DeclarativeBase

from app.models.genreSchema import GenreSchema
from app.models.movieSchema import MovieSchema

class Base(DeclarativeBase):
    pass

class HasGenreSchema(Base):
    __tablename__ = 'HasGenre'
    __table_args__ = (
        PrimaryKeyConstraint('id_genre', 'id_movie'),
    )
    id_genre = Column(Integer, ForeignKey(GenreSchema.id_genre), nullable=False)
    id_movie = Column(Integer, ForeignKey(MovieSchema.id_movie), nullable=False)