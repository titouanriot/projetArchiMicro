from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Boolean, Date
from sqlalchemy.orm import Mapped, relationship, mapped_column, DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "User"
    id_user = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(100), unique=True)
    birth_date = Column(Date)
    password = Column(String(100))
    is_user_account_active = Column(Boolean)
    is_admin = Column(Boolean)
