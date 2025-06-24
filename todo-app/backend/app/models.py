from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base

class Task(Base):
    """
    Modèle pour représenter une tâche dans la base de données.
    
    Attributs:
        id (int): Identifiant unique de la tâche.
        title (str): Titre de la tâche.
        description (str): Description de la tâche.
        category (str): Catégorie de la tâche.
        priority (str): Priorité de la tâche.
        due_date (datetime): Date d'échéance de la tâche.
    """
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, nullable=False)
    priority = Column(String, nullable=False)
    status = Column(String, nullable=False)
    due_date = Column(DateTime, nullable=False)
