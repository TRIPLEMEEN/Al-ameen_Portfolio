from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os
import json
from pathlib import Path
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

# Initialize Flask app
app = Flask(__name__, static_folder='public')
CORS(app, resources={
    r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}
})

# Base directory
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / 'data'

# Pydantic models for request/response validation
class ContactForm(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# Helper function to load JSON data
def load_json(filename: str) -> Any:
    try:
        with open(DATA_DIR / filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filename}: {str(e)}")
        return None

# API Routes
@app.route('/api/profile', methods=['GET'])
def get_profile():
    profile = load_json('profile.json')
    if profile is None:
        return jsonify({"error": "Profile data not found"}), 404
    return jsonify(profile)

@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = load_json('projects.json') or []
    return jsonify(projects)

@app.route('/api/experience', methods=['GET'])
def get_experience():
    experience = load_json('experience.json') or []
    return jsonify(experience)

@app.route('/api/education', methods=['GET'])
def get_education():
    education = load_json('education.json') or []
    return jsonify(education)

@app.route('/api/skills', methods=['GET'])
def get_skills():
    skills = load_json('skills.json') or {}
    return jsonify(skills)

@app.route('/api/testimonials', methods=['GET'])
def get_testimonials():
    testimonials = load_json('testimonials.json') or []
    return jsonify(testimonials)

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    blogs = load_json('blogs.json') or []
    return jsonify(blogs)

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        contact_data = ContactForm(**data)
        
        # Here you would typically send an email or save to a database
        print(f"New contact form submission: {contact_data}")
        
        return jsonify({
            "success": True,
            "message": "Your message has been sent successfully!"
        })
    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        return jsonify({
            "success": False,
            "message": "Failed to process your message"
        }), 400

# Serve static files
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('public/images', filename)

# Health check endpoint
@app.route('/api/health')
def health_check():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    DATA_DIR.mkdir(exist_ok=True)
    
    # Run the app
    app.run(host='0.0.0.0', port=5002, debug=True)
