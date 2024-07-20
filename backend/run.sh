#!/bin/bash

# Activar entorno virtual
source venv/bin/activate

# Iniciar Celery
celery -A celery_config worker --loglevel=info &

# Iniciar Flask
flask run

