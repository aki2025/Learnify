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

## Installation

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
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start
   ```
   The app will run on http://localhost:3000.

### Back-End Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
3. Create a `.env` file with the following environment variables:
   ```
   MONGO_URI=mongodb://localhost:27017/learning_platform
   SECRET_KEY=your-secret-key
   GITHUB_TOKEN=your-github-token
   OPENAI_API_KEY=your-openai-api-key
   JWT_SECRET_KEY=your-jwt-secret-key
   DEBUG=True
   PORT=5000
4. Start the Flask server:
   ```bash
   python src/app.py
   ```
   The API will run on http://localhost:5000.

### MongoDB Setup
- Ensure MongoDB is running and the `MONGO_URI` points to your instance.
- Seed the `libraries_collection` with sample data, e.g.:
  ```json
  { "id": "1", "name": "React", "description": "A JS library", "link": "https://reactjs.org" }
  ```

## Usage

1. Start the front-end development server:
   ```bash
   cd frontend
   npm start
   ```
2. Start the back-end Flask server:
   ```bash
   cd backend
   python src/app.py
   ```
3. Access the application at http://localhost:3000.

## API

The Learning Platform provides the following API endpoints:

- `/api/search`: Performs semantic search using OpenAI embeddings.
- `/api/chat`: Interacts with the AI chatbot powered by OpenAI's GPT-3.5-turbo.
- `/api/auth/register`: Registers a new user.
- `/api/auth/login`: Authenticates a user and returns a JWT token.
- `/api/auth/logout`: Logs out a user and invalidates the JWT token.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure the tests pass.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Testing

To run the tests, execute the following command in the `backend` directory:

```bash
pytest
```

This will run the test suite for the Learning Platform's back-end.
