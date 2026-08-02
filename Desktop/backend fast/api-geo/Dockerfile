# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copie des fichiers
COPY requirements.txt .
COPY main.py .
COPY tunisia.geojson .

# Installation des dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Exposition du port
EXPOSE 8000

# Démarrage de l'application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]