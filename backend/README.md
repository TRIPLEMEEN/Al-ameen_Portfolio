# Portfolio Backend

This is the Flask backend for the portfolio website.

## Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Running the Server

```bash
# Development
flask run --port 5001

# Or directly with Python
python run.py
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py     # Flask app factory
│   └── routes.py       # API routes
├── static/             # Static files
├── templates/          # HTML templates (if needed)
├── .env.example        # Example environment variables
├── requirements.txt    # Python dependencies
└── run.py             # Application entry point
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/projects` - List of projects
- `GET /api/experience` - Work experience

## Development

- The server runs on `http://localhost:5001` by default
- Make sure to update CORS settings in production
