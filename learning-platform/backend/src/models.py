from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI, maxPoolSize=50)
db = client.get_default_database()

users_collection = db.users
libraries_collection = db.libraries 
