# Todo App - Application de gestion de tâches

Application simple avec interface Vue.js et API FastAPI pour la gestion de tâches.

## Structure du projet

```
todo-app/
├── backend/                # API FastAPI (Python)
│   ├── app/
│   │   ├── main.py         # Point d'entrée de l'API
│   │   ├── models.py       # Modèles de base de données
│   │   ├── schemas.py      # Validation des données
│   │   ├── database.py     # Configuration de la base de données
│   │   ├── crud.py         # Opérations CRUD
│   │   └── routes/         # Endpoints de l'API
│   │       └── tasks.py    # Endpoints pour les tâches
│   └── requirements.txt
└── frontend/               # Interface utilisateur (Vue.js)
    ├── src/
    │   ├── views/          # Pages de l'application
    │   ├── components/     # Composants Vue
    │   ├── router/         # Configuration du routeur Vue
    │   ├── utils/          # Fonctions utilitaires
    │   ├── assets/         # Images, styles, etc.
    │   ├── stores/         # Gestion d'état avec Pinia
    │   ├── main.js         # Point d'entrée de l'application Vue
    │   └── App.vue         # Composant racine
    └── package.json
```

## Lancement du backend (API)

1. Se placer dans le dossier backend :
```sh
cd backend
```

2. Créer un environnement virtuel (optionnel mais recommandé) :
```sh
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. Installer les dépendances :
```sh
pip install -r requirements.txt
```

4. Lancer le serveur de développement :
```sh
uvicorn app.main:app --reload
```

L'API sera disponible sur http://localhost:8000

## Lancement du frontend

1. Se placer dans le dossier frontend :
```sh
cd frontend
```

2. Installer les dépendances :
```sh
npm install
```

3. Lancer le serveur de développement :
```sh
npm run dev
```

L'interface sera disponible sur http://localhost:5173

### Autres commandes utiles

```sh
# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## Utilisation

1. Lancer d'abord le backend
2. Puis lancer le frontend
3. Ouvrir http://localhost:5173 dans votre navigateur
4. Créer, modifier et gérer vos tâches !
