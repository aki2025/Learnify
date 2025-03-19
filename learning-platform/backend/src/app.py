import logging
from flask import Flask, jsonify, request
from flask_caching import Cache
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from models import users_collection, libraries_collection
import openai
import numpy as np
from scipy.spatial.distance import cosine

# Set up logging
logging.basicConfig(level=logging.INFO, filename="app.log", format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Set up caching
cache = Cache(app, config={"CACHE_TYPE": "simple"})

# Set up Flask-Login and JWT
login_manager = LoginManager()
login_manager.init_app(app)
jwt = JWTManager(app)

# OpenAI API key
openai.api_key = Config.OPENAI_API_KEY

# User model for Flask-Login
class User(UserMixin):
    def __init__(self, username, password_hash):
        self.username = username
        self.password_hash = password_hash

    @staticmethod
    def get(user_id):
        user_data = users_collection.find_one({"username": user_id})
        if user_data:
            return User(user_data["username"], user_data["password_hash"])
        return None

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

# Helper function to generate embeddings
def generate_embedding(text):
    response = openai.Embedding.create(input=text, model="text-embedding-ada-002")
    return response['data'][0]['embedding']

# Update library embeddings (run periodically or on data update)
def update_library_embeddings():
    libraries = libraries_collection.find()
    for lib in libraries:
        if 'description' in lib and 'embedding' not in lib:
            embedding = generate_embedding(lib['description'])
            libraries_collection.update_one({'_id': lib['_id']}, {'$set': {'embedding': embedding}})

# Routes

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400
    password_hash = generate_password_hash(password)
    users_collection.insert_one({"username": username, "password_hash": password_hash})
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user_data = users_collection.find_one({"username": username})
    if user_data and check_password_hash(user_data["password_hash"], password):
        user = User(username, user_data["password_hash"])
        login_user(user)
        access_token = create_access_token(identity=username)
        return jsonify({"message": "Login successful", "access_token": access_token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@app.route("/api/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify({"username": current_user}), 200

@app.route("/api/libraries", methods=["GET"])
@cache.cached(timeout=300)
def get_libraries():
    try:
        libraries = list(libraries_collection.find({}, {"_id": 0}))
        return jsonify(libraries)
    except Exception as e:
        logger.error(f"Error fetching libraries: {e}")
        return jsonify({"error": "Failed to fetch libraries"}), 500

@app.route("/api/search", methods=["GET"])
def search():
    query = request.args.get("q", "")
    if not query:
        return jsonify([])
    try:
        query_embedding = generate_embedding(query)
        libraries = list(libraries_collection.find({'embedding': {'$exists': True}}))
        results = []
        for lib in libraries:
            similarity = 1 - cosine(query_embedding, lib['embedding'])
            results.append({'library': lib, 'similarity': similarity})
        results.sort(key=lambda x: x['similarity'], reverse=True)
        return jsonify([r['library'] for r in results[:5]])  # Top 5 results
    except Exception as e:
        logger.error(f"Error in search: {e}")
        return jsonify({"error": "Search failed"}), 500

@app.route("/api/chat", methods=["POST"])
def chat():
    message = request.json.get("message", "")
    if not message:
        return jsonify({"response": "Please ask something!"})
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": message}]
        )
        return jsonify({"response": response['choices'][0]['message']['content']})
    except Exception as e:
        logger.error(f"Error in chat: {e}")
        return jsonify({"response": "Sorry, I couldn't respond."}), 500

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"], host="0.0.0.0", port=app.config["PORT"]) 
