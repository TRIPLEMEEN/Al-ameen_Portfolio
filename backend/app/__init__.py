from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__, static_folder='../static')
    CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",  # For local development
            "https://al-ameen-portfolio-armrh83fj.vercel.app"  # Your Vercel frontend URL
        ]
    }
})
    
    # Configuration
    app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this in production
    
    # Serve static files from the public/images directory using absolute path
    @app.route('/images/<path:path>')
    def serve_images(path):
        # Get the absolute path to the project root
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
        images_dir = os.path.join(project_root, 'public', 'images')
        return send_from_directory(images_dir, path)
        
    # Register blueprints
    from .routes import main
    app.register_blueprint(main)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found"}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Internal server error"}), 500
    
    return app
