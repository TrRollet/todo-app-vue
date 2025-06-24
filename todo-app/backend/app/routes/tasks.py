from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import SessionLocal

router = APIRouter()

# Dépendance pour obtenir la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/tasks", response_model=list[schemas.TaskOut])
def read_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)

@router.get("/tasks/{task_id}", response_model=schemas.TaskOut)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return task

@router.post("/tasks", response_model=schemas.TaskOut)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

@router.put("/tasks/{task_id}", response_model=schemas.TaskOut)
def update_task(task_id: int, updated_task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task = crud.update_task(db, task_id, updated_task)
    if task is None:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.delete_task(db, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return {"message": "Tâche supprimée avec succès."}

@router.get("/categories", response_model=list[str])
def get_categories():
    return schemas.CATEGORIES