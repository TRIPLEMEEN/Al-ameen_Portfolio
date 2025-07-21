from flask import Blueprint, jsonify, request, send_from_directory, Response, abort
import os
import json
from datetime import datetime
import requests
from urllib.parse import urlparse, unquote

main = Blueprint('main', __name__)

def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

@main.route('/proxy-image/<path:url>')
def proxy_image(url):
    """Proxy image requests to avoid CORS issues"""
    try:
        # Add https:// if not present and ensure it's a valid URL
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
            
        if not is_valid_url(url):
            return jsonify({'error': 'Invalid URL'}), 400
            
        response = requests.get(url, stream=True)
        if response.status_code != 200:
            return jsonify({'error': 'Image not found'}), 404
            
        # Return the image with the appropriate content type
        return Response(
            response.content,
            status=response.status_code,
            content_type=response.headers['Content-Type']
        )
    except Exception as e:
        print(f"Error proxying image: {str(e)}")
        return jsonify({'error': str(e)}), 500

def load_json_data(filename):
    try:
        with open(f'data/{filename}.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []
@main.route('/download-resume')
def download_resume():
    return send_from_directory(
        current_app.static_folder,
        'al-ameen_01_resume.pdf',
        as_attachment=True,
        download_name='AL-AMEEN_ABDULKAREEM_RESUME.pdf'  # This will be the filename when downloaded
    )

@main.route('/')
def home():
    return {
        'message': 'Welcome to the Portfolio API',
        'status': 'success',
        'timestamp': datetime.utcnow().isoformat()
    }

@main.route('/profile')
def get_profile():
    profile = {
        'name': 'AL-AMEEN ABDULKAREEM',
        'title': 'Analyst | Machine Learning Engineer | Educator | AI Specialist',
        'email': 'abdulkareemalameen18@gmail.com',
        'phone': '+44 (0) 7405681617',
        'location': 'E16 2PJ London, United Kingdom',
        'profile_image': '/images/al-ameen-profile.jpg',
        'about': 'I hold a master\'s degree in Computer Science (Distinction) and a degree in Electrical and Electronics Engineering, with exceptional scores in mathematics. With experience as an analyst, ML engineer, and AI engineer, I specialize in developing machine learning models, optimizing business intelligence systems, and delivering data-driven insights.',
        'summary': 'Proficient in Python, PowerBI, SQL, and cloud technologies, I excel in solving complex problems, collaborating cross-functionally, and applying mathematical expertise to AI. My work accelerates innovation and drives impactful, strategic decision-making through data analysis and full-stack development.',
        'social': {
            'linkedin': 'http://linkedin.com/in/al-ameen-abdulkareem-1524ba123',
            'github': 'https://github.com/triplemeen',
            'twitter': ''
        },
        'resume': '/resume.pdf',
        'interests': ['Cooking', 'Basketball', 'Video making and editing'],
        'referees': [
            {
                'name': 'Emma Hugill',
                'position': 'Senior Secondary Consultant',
                'company': 'Connex Education',
                'phone': '01642 573 553',
                'email': 'emma.hugill@connex-education.com'
            },
            {
                'name': 'William Oseland',
                'position': 'Vice Principal',
                'company': 'Outwood Academy Riverside',
                'phone': '07929 143780',
                'email': 'w.oseland@riverside.outwood.com'
            }
        ]
    }
    return jsonify(profile)

@main.route('/projects')
def get_projects():
    projects = [
        {
            'id': 1,
            'title': 'AI Traffic Classification',
            'description': 'A machine learning project for classifying traffic situations using computer vision and deep learning techniques.',
            'technologies': ['Python', 'Jupyter Notebook', 'Computer Vision', 'Deep Learning'],
            'image': '/images/ai-traffic-classification.jpg',
            'github': 'https://github.com/TRIPLEMEEN/AI-HACK-EXPO',
            'demo': '#',
            'achievements': [
                'Developed computer vision models for traffic analysis',
                'Implemented deep learning algorithms for classification',
                'Achieved high accuracy in traffic situation classification'
            ]
        },
        {
            'id': 2,
            'title': 'Loan Prediction for Farmers in India',
            'description': 'Machine learning model to predict loan eligibility for farmers in India based on various agricultural and financial factors.',
            'technologies': ['Python', 'Jupyter Notebook', 'Machine Learning', 'Pandas', 'Scikit-learn'],
            'image': '/images/loan-prediction-farmers.jpg',
            'github': 'https://github.com/TRIPLEMEEN/LOAN-PREDICTION-FOR-FARMERS-IN-INDIA',
            'demo': '#',
            'achievements': [
                'Built predictive models to assess loan eligibility',
                'Analyzed agricultural and financial datasets',
                'Implemented data preprocessing and feature engineering'
            ]
        },
        {
            'id': 3,
            'title': 'TRIPIFY',
            'description': 'A music recommendation application that suggests songs based on user preferences and listening history.',
            'technologies': ['Python', 'Machine Learning', 'Recommendation Systems', 'Flask'],
            'image': '/images/tripify-graphic.svg',
            'github': 'https://github.com/TRIPLEMEEN/TRIPIFY',
            'demo': '#',
            'achievements': [
                'Implemented music recommendation algorithms',
                'Built a user-friendly web interface',
                'Integrated with music streaming APIs'
            ]
        },
        {
            'id': 4,
            'title': 'Alindor MVP',
            'description': 'Minimum Viable Product for Alindor, a project focused on innovative solutions.',
            'technologies': ['Python', 'FastAPI', 'React', 'PostgreSQL'],
            'image': '/images/alindor-mvp.jpg',
            'github': 'https://github.com/TRIPLEMEEN/alindor_mvp',
            'demo': '#',
            'achievements': [
                'Developed core features for the MVP',
                'Implemented responsive frontend components',
                'Set up CI/CD pipeline for deployment'
            ]
        },
        {
            'id': 5,
            'title': 'Sentiment Analysis',
            'description': 'Text analysis application that determines the sentiment of user-provided content using natural language processing.',
            'technologies': ['Python', 'NLP', 'Machine Learning', 'Flask'],
            'image': '/images/sentiment-analysis.jpg',
            'github': 'https://github.com/TRIPLEMEEN/sentiment-analysis',
            'demo': '#',
            'achievements': [
                'Trained sentiment analysis models',
                'Created a web interface for text input',
                'Achieved high accuracy in sentiment classification'
            ]
        },
        {
            'id': 6,
            'title': 'TripMasters App',
            'description': 'A comprehensive travel application for planning and managing trips, built with modern Java technologies.',
            'technologies': ['Java', 'Android', 'Firebase', 'Google Maps API'],
            'image': '/images/tripmasters-app.jpg',
            'github': 'https://github.com/TRIPLEMEEN/TripMastersApp',
            'demo': '#',
            'achievements': [
                'Developed trip planning and management features',
                'Integrated with mapping and location services',
                'Implemented user authentication and data synchronization'
            ]
        }
    ]
    return jsonify(projects)

@main.route('/experience')
def get_experience():
    experience = [
        {
            'id': 1,
            'company': 'Outwood Academy Riverside',
            'position': 'Cover Supervisor (Administrator)',
            'period': 'January 2025 - Present',
            'location': 'United Kingdom',
            'responsibilities': [
                'Supervised classes across computing (Python), IT, and mathematics, delivering pre-planned lessons while adapting content in real time',
                'Designed and implemented tailored learning strategies to bridge knowledge gaps',
                'Delivered engaging lessons and maintained student focus by breaking down complex concepts',
                'Managed the daily cover rota, coordinating teacher absences and deploying staff efficiently',
                'Supported students in using educational technologies, including coding platforms and productivity tools'
            ]
        },
        {
            'id': 2,
            'company': 'Connex Education',
            'position': 'Teacher (Supply/Cover Supervisor)',
            'period': 'May 2023 - January 2025',
            'location': 'United Kingdom',
            'responsibilities': [
                'Delivered clear and engaging explanations of key concepts in Python, computing, and mathematics',
                'Designed and implemented tailored learning strategies to support individual and group progress',
                'Successfully managed multiple classrooms across a range of subjects and year groups',
                'Supported students in developing problem-solving skills and exam techniques',
                'Assessed student engagement and learning during cover lessons'
            ]
        },
        {
            'id': 3,
            'company': 'Impact Fundry',
            'position': 'Business Analyst (Data Science)',
            'period': 'October 2022 - May 2023',
            'location': 'United Kingdom',
            'responsibilities': [
                'Analyzed business processes and goals to drive efficiencies through technology and data, increasing sales by 20%',
                'Managed Business Intelligence workflow using Power BI, ensuring 100% task completion accuracy',
                'Designed and deployed internal tools powered by LLMs (OpenAI/GPT-based)',
                'Built and maintained Retrieval-Augmented Generation (RAG) pipelines using FAISS and SentenceTransformers',
                'Developed intelligent interfaces using prompt engineering best practices',
                'Prepared clear documentation to communicate business requirements and technical specifications'
            ]
        },
        {
            'id': 4,
            'company': 'Turing',
            'position': 'Data Analyst',
            'period': 'March 2022 - September 2022',
            'location': 'Palo Alto, California (Remote)',
            'responsibilities': [
                'Developed Directed Acyclic Graphs (DAGs) on Apache Airflow, reducing task scheduling time by 35%',
                'Implemented a real-time SLA alert system using Slack webhooks, improving monitoring efficiency by 40%',
                'Created and maintained technical and operational documentation',
                'Conducted complex data analysis using SQL, improving query performance by 25%',
                'Designed and implemented full-stack solutions, reducing development time by 20%',
                'Developed RESTful APIs and optimized database queries, enhancing system performance by 30%'
            ]
        },
        {
            'id': 5,
            'company': 'Law Pavilion',
            'position': 'Machine Learning Engineer',
            'period': 'December 2020 - February 2022',
            'location': 'Lagos, Nigeria',
            'responsibilities': [
                'Spearheaded the development of a document summarization platform using Hugging Face, improving processing speed by 40%',
                'Employed Doc2Vec for extracting legal headings, increasing information retrieval efficiency by 35%',
                'Led the development of a Speech-To-Text model for courtroom applications, achieving 90% accuracy',
                'Maintained data standards through validation, verification, and quality assurance',
                'Developed a model for recognizing laws and cases within documents using Prodigy',
                'Engineered efficient APIs using FastAPI for seamless data interaction'
            ]
        },
        {
            'id': 6,
            'company': 'PwC',
            'position': 'Software Engineer',
            'period': 'July 2020 - December 2020',
            'location': 'Lagos, Nigeria',
            'responsibilities': [
                'Managed stakeholder expectations and communicated results effectively',
                'Generated actionable insights, leading to a 15% improvement in business processes',
                'Gained expertise in Data Lifecycle Management (DLM)',
                'Developed knowledge of Data Protection and Data Governance',
                'Managed critical business tasks from inception to launch',
                'Conducted rigorous backtesting and validation of credit risk models'
            ]
        },
        {
            'id': 7,
            'company': 'Fundall',
            'position': 'Artificial Intelligence Engineer',
            'period': 'April 2020 - July 2020',
            'location': 'Lagos, Nigeria',
            'responsibilities': [
                'Created a conversational chatbot using Python, increasing user engagement by 30%',
                'Developed endpoints for a categorizer model, automating item categorization with 95% accuracy',
                'Implemented an OCR model for scanning receipts, achieving 90% accuracy in item categorization',
                'Developed an OCR model for extracting identity information, with an 85% accuracy rate',
                'Built a sentiment analysis model using Twitter data, improving customer sentiment analysis by 25%',
                'Created detailed visual reports in Power BI to present sentiment analysis results'
            ]
        }
    ]
    return jsonify(experience)

@main.route('/education')
def get_education():
    education = [
        {
            'id': 1,
            'degree': 'MSc Computer Science (Distinction)',
            'institution': 'Teesside University',
            'period': 'September 2022 - September 2023',
            'location': 'Middlesbrough, United Kingdom',
            'description': 'Specialized in Data Science and Machine Learning',
            'achievements': [
                'Analyzed NBA player statistics of custom datasets over ten seasons using Microsoft Power BI',
                'Developed multi-page dashboards, improving data visualization techniques by 20%'
            ]
        },
        {
            'id': 2,
            'degree': 'BSc Electrical/Electronic Engineering',
            'institution': 'University of Lagos',
            'period': 'October 2014 - December 2019',
            'location': 'Lagos, Nigeria',
            'description': 'Focused on Electronics and Computer Engineering',
            'achievements': [
                'Specialized in computer systems and programming',
                'Completed coursework in digital systems, microprocessors, and computer architecture'
            ]
        },
        {
            'id': 3,
            'degree': 'WASSCE (West African Senior School Certificate Examination)',
            'institution': 'West African Examination Council (WAEC)',
            'period': '2008 - 2014',
            'location': 'Nigeria',
            'description': 'High School Diploma Equivalent',
            'achievements': [
                'A1 in Mathematics',
                'B2 in English Language',
                'Additional subjects: Physics, Chemistry, Biology, Economics, Geography'
            ]
        }
    ]
    return jsonify(education)

@main.route('/skills')
def get_skills():
    skills = {
        'programming_languages': [
            {'name': 'Python (Advanced)', 'level': 95},
            {'name': 'JavaScript', 'level': 85}
        ],
        'frontend': [
            {'name': 'HTML', 'level': 90},
            {'name': 'React', 'level': 85},
            {'name': 'Bootstrap', 'level': 80}
        ],
        'backend': [
            {'name': 'Flask', 'level': 90},
            {'name': 'FastAPI', 'level': 85}
        ],
        'data_science_ml': [
            {'name': 'Azure ML Studio', 'level': 90},
            {'name': 'NLP', 'level': 88},
            {'name': 'OCR', 'level': 85},
            {'name': 'Scikit-learn', 'level': 90},
            {'name': 'TensorFlow', 'level': 85},
            {'name': 'Keras', 'level': 85},
            {'name': 'Pandas', 'level': 92},
            {'name': 'NumPy', 'level': 90},
            {'name': 'Matplotlib', 'level': 88},
            {'name': 'SpaCy', 'level': 85},
            {'name': 'Hugging Face', 'level': 88},
            {'name': 'Apache Airflow', 'level': 85}
        ],
        'llm_technologies': [
            {'name': 'OpenAI', 'level': 90},
            {'name': 'Azure OpenAI', 'level': 85},
            {'name': 'Hugging Face Transformers', 'level': 88},
            {'name': 'LangChain', 'level': 85},
            {'name': 'RAG Pipelines', 'level': 88}
        ],
        'data_analysis': [
            {'name': 'Power BI', 'level': 92},
            {'name': 'Tableau', 'level': 85},
            {'name': 'SQL', 'level': 90},
            {'name': 'MS Excel', 'level': 90}
        ],
        'devops': [
            {'name': 'Git', 'level': 90},
            {'name': 'Docker', 'level': 85},
            {'name': 'Google Cloud Platform', 'level': 80},
            {'name': 'Heroku', 'level': 80}
        ],
        'soft_skills': [
            'Problem Solving',
            'Team Collaboration',
            'Communication',
            'Project Management',
            'Adaptability',
            'Analytical Thinking',
            'Time Management'
        ]
    }
    return jsonify(skills)

@main.route('/testimonials')
def get_testimonials():
    testimonials = [
        {
            'id': 1,
            'name': 'Emma Hugill',
            'position': 'Senior Secondary Consultant',
            'company': 'Connex Education',
            'content': 'Professional and dedicated individual with excellent communication skills. Consistently delivers high-quality work and demonstrates strong problem-solving abilities.',
            'avatar': '/images/emma-hugill.jpg',
            'date': 'July 2025',
            'rating': 5,
            'phone': '01642 573 553',
            'email': 'emma.hugill@connex-education.com'
        },
        {
            'id': 2,
            'name': 'William Oseland',
            'position': 'Vice Principal',
            'company': 'Outwood Academy Riverside',
            'content': 'Outstanding professional who brings creativity and dedication to every project. A reliable team player with exceptional organizational skills.',
            'avatar': '/images/william-oseland.jpg',
            'date': 'July 2025',
            'rating': 5,
            'phone': '07929 143780',
            'email': 'w.oseland@riverside.outwood.com'
        }
    ]
    return jsonify(testimonials)

@main.route('/blogs')
def get_blogs():
    blogs = [
        {
            'id': 1,
            'title': 'NBA Data Analysis Project',
            'excerpt': 'Analysis of National Basketball Association (NBA) players statistics through ten seasons using Microsoft PowerBI, featuring data visualization and predictive analytics.',
            'date': '2024-09-01',  
            'read_time': '5 min read',
            'tags': ['Data Analysis', 'PowerBI', 'Sports Analytics', 'Data Visualization'],
            'image': '/images/nba.jpeg',
            'url': 'https://www.linkedin.com/feed/update/urn:li:activity:7123456789012345678/'  
        },
        {
            'id': 2,
            'title': 'Learning Python Generators',
            'excerpt': 'Completed the LinkedIn Learning course on Python Generators, covering their creation, usage patterns, and practical applications in Python programming.',
            'date': '2024-10-01',  
            'read_time': '3 min read',
            'tags': ['Python', 'Programming', 'Learning', 'Software Development'],
            'image': '/images/learning-python-generators.jpg',
            'url': 'https://www.linkedin.com/learning/learning-python-generators'
        },
        {
            'id': 3,
            'title': 'Global AI Hub Core Member',
            'excerpt': 'Selected as a Core Member of the Global AI Hub, collaborating with a global community on machine learning and deep learning projects and initiatives.',
            'date': '2022-07-01',  
            'read_time': '2 min read',
            'tags': ['AI', 'Machine Learning', 'Community', 'Global AI Hub'],
            'image': '/images/global-ai-core.jpg',
            'url': 'https://globalaihub.com/'
        }
    ]
    return jsonify(blogs)

@main.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate email format
        import re
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, data['email']):
            return jsonify({'error': 'Please enter a valid email address'}), 400
        
        # Log the message (in production, you'd send an email here)
        print(f"""
        New Contact Form Submission:
        ----------------------------
        Name: {data['name']}
        Email: {data['email']}
        Subject: {data.get('subject', 'No Subject')}
        Message:
        {data['message']}
        ----------------------------
        """)
        
        # In a production environment, you would:
        # 1. Save to a database
        # 2. Send an email notification
        # 3. Add rate limiting
        # 4. Add CAPTCHA verification
        
        return jsonify({
            'message': 'Thank you for your message! I will get back to you soon.',
            'status': 'success'
        }), 200
        
    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        return jsonify({
            'error': 'An error occurred while processing your message. Please try again later.',
            'status': 'error'
        }), 500
    