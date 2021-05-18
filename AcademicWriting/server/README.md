# Server

[![Python Version](https://img.shields.io/badge/Python-3.9-blue)](https://img.shields.io/badge/Python-3.9-blue)

## Schritte

1. Virtual Environment erstellen:

```python
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Lokale Postgres Datenbank erstellen:
```bash
psql postgres -U username

> postgres=# CREATE DATABASE academicwriting_db;
```

3. Environment Variablen erstellen:

```bash
export SECRET_KEY=XXXX
export DATABASE_URL=postgresql+psycopg2://username:password@localhost:5432/academicwriting_db
export APP_SETTINGS=api.config.DevelopmentConfig
```

4. Datenbank erstellen:

```bash
python manage.py db init
python manage.py db migrate
python manage.py db upgrade
```

5. Flask-Server starten:

```bash
python run.py
```

Packageliste erstellen:

```python
pip freeze > requirements.txt
```

API-Route = http://127.0.0.1:5000/api/




## Hilfreiche Links

### Datenbank

https://realpython.com/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/
https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb


### Authentifizierung

https://realpython.com/token-based-authentication-with-flask/

### Projektstruktur

https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project
