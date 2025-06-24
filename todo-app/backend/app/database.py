from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de la base SQLite (fichier local tasks.db)
DATABASE_URL = "sqlite:///./tasks.db"

# Connecteur SQLAlchemy pour la base de données SQLite
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Crée une session pour interagir avec la DB
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base de laquelle tous les modèles SQLAlchemy vont hériter
Base = declarative_base()
