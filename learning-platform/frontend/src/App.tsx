import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';
import Profile from './pages/Profile';
import Login from './components/Login';
import Register from './components/Register';
import SearchBar from './components/SearchBar';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Learning Platform</h1>
          <p className="text-gray-600">Explore and learn with AI-powered tools</p>
        </header>
        <SearchBar />
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
};

export default App; 
