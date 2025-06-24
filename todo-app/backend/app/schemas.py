from pydantic import BaseModel, Field, field_validator
from datetime import datetime, timezone
from typing import Optional

CATEGORIES = ["Perso", "Pro"] # Catégories fixes pour simplifier
STATUSES = ["À faire", "En cours", "Terminé"]
PRIORITIES = ["Haute", "Moyenne", "Basse"]

def validate_future_date(v):
    """Fonction utilitaire pour valider les dates futures"""
    # Si c'est une string ISO, la parser
    if isinstance(v, str):
        v = datetime.fromisoformat(v.replace('Z', '+00:00'))
    
    # Extraire seulement la date (ignorer l'heure et timezone)
    if v.tzinfo is not None:
        v_date = v.date()
    else:
        v_date = v.date()
    
    # Comparer avec la date actuelle
    today = datetime.now().date()
    
    # Vérifier si la date est dans le futur (on accepte le jour même)
    if v_date < today:
        raise ValueError("La date d'échéance doit être aujourd'hui ou dans le futur.")
    
    return v

class TaskCreate(BaseModel):
    """Schema pour la création de tâches"""
    title: str = Field(..., min_length=3)
    description: Optional[str] = None
    category: str
    priority: str
    status: str
    due_date: datetime

    @field_validator("due_date")
    def check_due_date(cls, v):
        return validate_future_date(v)

    @field_validator("category")
    def validate_category(cls, v):
        if v not in CATEGORIES:
            raise ValueError(f"Catégorie invalide. Choisir parmi : {CATEGORIES}")
        return v

    @field_validator("priority")
    def validate_priority(cls, v):
        if v not in PRIORITIES:
            raise ValueError(f"Priorité invalide. Choisir parmi : {PRIORITIES}")
        return v
    
    @field_validator("status")
    def validate_status(cls, v):
        if v not in STATUSES:
            raise ValueError(f"Statut invalide. Choisir parmi : {STATUSES}")
        return v

class TaskUpdate(BaseModel):
    """Schema pour la mise à jour de tâches"""
    title: str = Field(..., min_length=3)
    description: Optional[str] = None
    category: str
    priority: str
    status: str
    due_date: datetime
    
    @field_validator("category")
    def validate_category(cls, v):
        if v not in CATEGORIES:
            raise ValueError(f"Catégorie invalide. Choisir parmi : {CATEGORIES}")
        return v

    @field_validator("priority")
    def validate_priority(cls, v):
        if v not in PRIORITIES:
            raise ValueError(f"Priorité invalide. Choisir parmi : {PRIORITIES}")
        return v
    
    @field_validator("status")
    def validate_status(cls, v):
        if v not in STATUSES:
            raise ValueError(f"Statut invalide. Choisir parmi : {STATUSES}")
        return v

class TaskOut(BaseModel):
    """Schema de sortie pour les tâches - AUCUNE validation"""
    id: int
    title: str
    description: Optional[str] = None
    category: str
    priority: str
    status: str
    due_date: datetime
    
    class Config:
        from_attributes = True