# Learning Platform

A web-based learning platform that dynamically pulls content from a GitHub repository, featuring a modern GUI and AI-powered tools like semantic search and a chatbot. Built with React, Flask, and MongoDB, and integrated with OpenAI for AI capabilities.

## Features
- **Dynamic Content**: Fetches and displays learning libraries from a GitHub repository.
- **User Authentication**: Register, login, and manage profiles using Flask-Login and JWT.
- **AI-Powered Search**: Semantic search with OpenAI embeddings for natural language queries.
- **AI Chatbot**: Interactive assistant powered by OpenAI's GPT-3.5-turbo.
- **Responsive GUI**: Styled with Tailwind CSS and animated with Framer Motion.

## Tech Stack

### Front-End
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **HTTP Client**: Axios

### Back-End
- **Framework**: Flask
- **Database**: MongoDB (via PyMongo)
- **Caching**: Flask-Caching
- **Authentication**: Flask-Login, Flask-JWT-Extended
- **AI Integration**: OpenAI API

## Setup Instructions

### Prerequisites
- **Node.js** and **npm** (for front-end)
- **Python 3.x** (for back-end)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **OpenAI API Key** (for AI features)

### Front-End Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend

2. Install dependencies:
bash

npm install

3. Start the development server:
bash

npm start

The app will run on http://localhost:3000.

4. Back-End Setup
Navigate to the backend directory:
bash

cd backend

6 Install dependencies:
bash

pip install -r requirements.txt

7. Create a .env file with the following environment variables:

MONGO_URI=mongodb://localhost:27017/learning_platform
SECRET_KEY=your-secret-key
GITHUB_TOKEN=your-github-token
OPENAI_API_KEY=your-openai-api-key
JWT_SECRET_KEY=your-jwt-secret-key
DEBUG=True
PORT=5000

8. Start the Flask server:
bash

python src/app.py

The API will run on http://localhost:5000.

9. MongoDB Setup
Ensure MongoDB is running and the MONGO_URI points to your instance.

Seed the libraries_collection with sample data, e.g.:
json

{ "id": "1", "name": "React", "description": "A JS library", "link": "https://reactjs.org" }

10. Deployment on Replit
Create a Replit Project: Import this repository or start a new Python repl.

Set Up Secrets: In the "Secrets" tab, add:
MONGO_URI

SECRET_KEY

GITHUB_TOKEN

OPENAI_API_KEY

JWT_SECRET_KEY

Install Dependencies:
Back-end: pip install -r requirements.txt (in backend)

Front-end: npm install (in frontend)

Configure Procfile: Use the provided Procfile to run the back-end.

Run the App: Click "Run" in Replit to start the app. Adjust the front-end proxy in package.json if needed.

NOTES
THE /API/SEARCH ENDPOINT USES OPENAI EMBEDDINGS FOR SEMANTIC SEARCH.

THE /API/CHAT ENDPOINT INTEGRATES WITH OPENAI'S GPT-3.5-TURBO FOR THE CHATBOT.

USER AUTHENTICATION IS SECURED WITH FLASK-LOGIN AND JWT TOKENS.

THE PLATFORM IS FULLY FUNCTIONAL AND READY FOR DEPLOYMENT.

THIS PROJECT IS COMPLETE AND OPTIMIZED FOR BOTH DEVELOPMENT AND PRODUCTION ENVIRONMENTS. FOR FURTHER ASSISTANCE, FEEL FREE TO REACH OUT!

   
