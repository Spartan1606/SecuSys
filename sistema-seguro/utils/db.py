from sqlalchemy import create_engine as ce
from sqlalchemy.orm import sessionmaker as sm, declarative_base as dec
from dotenv import load_dotenv as ld
import os

ld()

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://sistema_user:Getsumenofuukatsu1@localhost/sistema_seguro"

engine = ce(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

LocalSession = sm(autocommit=False, autoflush= False, bind=engine)

Base = dec()

def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()