from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_mail import Mail
import os
from dotenv import load_dotenv

# Initialize extensions
mail = Mail()

# Load environment variables
load_dotenv()



def create_app():
    app = Flask(__name__, static_folder='../static')
    CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",  # For local development
            "http://localhost:4173",  # Vite preview server
            "[http://127.0.0.1](http://127.0.0.1):4173",  # Alternative localhost
            "https://al-ameen-portfolio.vercel.app",  # Your Vercel domain
            "https://al-ameen-portfolio-*.vercel.app"  # All preview deployments
        ],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
    }
})
    
    # Email configuration
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] =False
    app.config['MAIL_USERNAME'] = 'abdulkareemalameen18@gmail.com'  # Load from environment
    app.config['MAIL_PASSWORD'] = 'neio-aogj-ybxh-cksf'  # Load from environment
    app.config['MAIL_DEFAULT_SENDER'] = 'abdulkareemalameen18@gmail.com'
    
    # Initialize extensions
    mail.init_app(app)
    # Configuration
    app.config['SECRET_KEY'] = 'a2ffdf56c6753086c6337725daace3c97e43ace0652b16f4259c4df8600b34f7'  # Change this in production
    
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
