from fastapi import APIRouter, Depends, status, HTTPException
from app.services.userService import UserService
from app.database import SessionLocal
from sqlalchemy.orm import Session
from app.models.userModel import UserBase, User, UserLogged, UserLogin
from datetime import timedelta
from jose import JWTError, jwt
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer

from app.security import create_access_token
from app.config import settings

"""
    Describe the parameters of this api file
"""
router = APIRouter(
    prefix='/auth',
    tags = ['auth']
)


service = UserService()
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally :
        db.close()

        
def authenticate_user(email: str, password: str, db : Session):
    user = service.get_user_by_email(email, db)
    if not user:
        return False
    if not password == user.password:
        return False
    return user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
    
def get_user_from_token(token: str = Depends(oauth2_scheme), db : Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not resolve credentials"
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

        email: str = payload.get('email')
        exp: int = int(payload.get('exp'))
        if datetime.utcnow() > datetime.fromtimestamp(exp):
            raise credentials_exception
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = service.get_user_withid_by_email(email, db)
    if user is None:
        raise credentials_exception
    return user

    
@router.post("/login", response_model=UserLogged)
async def user_login(data: UserLogin, db : Session = Depends(get_db)):
    user = authenticate_user(data.email, data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect username or password')
    access_token = create_access_token(
        data={"email": user.email}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {'token': access_token, 'email': user.email}