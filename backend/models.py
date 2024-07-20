from . import db
from datetime import datetime

class Lot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text)
    custom_fields = db.Column(db.JSON)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.Text)
    due_date = db.Column(db.DateTime)
    is_cyclical = db.Column(db.Boolean, default=False)
    cycle_days = db.Column(db.Integer, nullable=True)
    dependency_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=True)
    lot_id = db.Column(db.Integer, db.ForeignKey('lot.id'), nullable=True)
    attached_images = db.Column(db.JSON)

    dependency = db.relationship('Task', remote_side=[id], backref='dependents')
    lot = db.relationship('Lot', backref='tasks')
