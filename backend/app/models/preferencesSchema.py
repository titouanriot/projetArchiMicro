from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class PreferencesSchema(Base):
    __tablename__ = 'Preferences'
    __table_args__ = (
        PrimaryKeyConstraint('id_user', 'id_genre'),
    )
    id_user = Column(Integer, ForeignKey("User.id_user"),nullable=False)
    id_genre = Column(Integer, ForeignKey("Genre.id_genre"), nullable=False)
