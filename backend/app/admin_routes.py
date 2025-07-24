from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required, current_user
from functools import wraps
import os
from . import db
from .models import ContactMessage

admin = Blueprint('admin', __name__)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Simple admin check - in production, use proper authentication
        admin_email = os.environ.get('ADMIN_EMAIL')
        if not admin_email or not hasattr(current_user, 'email') or current_user.email != admin_email:
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated_function

@admin.route('/admin/messages')
@login_required
@admin_required
def admin_messages():
    """Admin view to see all messages"""
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return render_template('admin/messages.html', messages=messages)

@admin.route('/api/admin/messages/<int:message_id>', methods=['GET'])
@login_required
@admin_required
def get_message(message_id):
    """Get a specific message"""
    message = ContactMessage.query.get_or_404(message_id)
    return jsonify(message.to_dict())

@admin.route('/api/admin/messages/<int:message_id>/read', methods=['PUT'])
@login_required
@admin_required
def mark_as_read(message_id):
    """Mark a message as read"""
    message = ContactMessage.query.get_or_404(message_id)
    message.is_read = True
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Message marked as read'})

@admin.route('/api/admin/messages/<int:message_id>', methods=['DELETE'])
@login_required
@admin_required
def delete_message(message_id):
    """Delete a message"""
    message = ContactMessage.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Message deleted'})