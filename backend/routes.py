from flask import Blueprint, request, jsonify
from .models import Task, Lot
from . import db
from datetime import datetime

import os
import uuid


task_bp = Blueprint('task_bp', __name__)
lot_bp = Blueprint('lot_bp', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@task_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'name': task.name,
        'notes': task.notes,
        'due_date': task.due_date,
        'is_cyclical': task.is_cyclical,
        'cycle_days': task.cycle_days,
        'dependency_id': task.dependency_id,
        'lot_id': task.lot_id,
        'attached_images': task.attached_images
    } for task in tasks])

@task_bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.form.to_dict()
    attached_files = request.files.getlist('attached_images')

    attached_images = []
    for file in attached_files:
        filename = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        attached_images.append(file_path)

    task = Task(
        name=data['name'],
        notes=data.get('notes'),
        due_date=datetime.strptime(data['due_date'], '%Y-%m-%d') if data.get('due_date') else None,
        is_cyclical=data.get('is_cyclical', 'false').lower() in ['true', '1'],
        cycle_days=int(data['cycle_days']) if data.get('cycle_days') else None,
        dependency_id=int(data['dependency_id']) if data.get('dependency_id') else None,
        lot_id=int(data['lot_id']) if data.get('lot_id') else None,
        attached_images=attached_images
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({'message': 'Task created'}), 201


@task_bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    task = Task.query.get_or_404(id)
    task.name = data['name']
    task.notes = data.get('notes')
    task.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d') if data.get('due_date') else None
    task.is_cyclical = data.get('is_cyclical', False)
    task.cycle_days = data.get('cycle_days')
    task.dependency_id = data.get('dependency_id')
    task.lot_id = data.get('lot_id')
    task.attached_images = data.get('attached_images')
    db.session.commit()
    return jsonify({'message': 'Task updated'})

@task_bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})

@lot_bp.route('/lots', methods=['GET'])
def get_lots():
    lots = Lot.query.all()
    return jsonify([{
        'id': lot.id,
        'name': lot.name,
        'created_at': lot.created_at,
        'notes': lot.notes,
        'custom_fields': lot.custom_fields
    } for lot in lots])

@lot_bp.route('/lots', methods=['POST'])
def create_lot():
    data = request.get_json()
    lot = Lot(
        name=data['name'],
        created_at=datetime.utcnow(),
        notes=data.get('notes'),
        custom_fields=data.get('custom_fields')
    )
    db.session.add(lot)
    db.session.commit()
    return jsonify({'message': 'Lot created'}), 201

@lot_bp.route('/lots/<int:id>', methods=['PUT'])
def update_lot(id):
    data = request.get_json()
    lot = Lot.query.get_or_404(id)
    lot.name = data['name']
    lot.notes = data.get('notes')
    lot.custom_fields = data.get('custom_fields')
    db.session.commit()
    return jsonify({'message': 'Lot updated'})

@lot_bp.route('/lots/<int:id>', methods=['DELETE'])
def delete_lot(id):
    lot = Lot.query.get_or_404(id)
    db.session.delete(lot)
    db.session.commit()
    return jsonify({'message': 'Lot deleted'})
