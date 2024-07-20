# backend/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  # Importar CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost/mydb'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)  # Habilitar CORS en toda la aplicación


    from .models import Task, Lot

    @app.route('/')
    def home():
        return "Hello, World!"

    # Registrar rutas
    from .routes import task_bp, lot_bp
    app.register_blueprint(task_bp, url_prefix='/api')
    app.register_blueprint(lot_bp, url_prefix='/api')


    # Imprimir todas las rutas registradas
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint}: {rule}")


    return app
