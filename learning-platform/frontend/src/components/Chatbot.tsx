import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input) return;
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/chat', { message: input }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, I couldn\'t respond.', isUser: false }]);
    }
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
        >
          Chat
        </button>
      )}
      {isOpen && (
        <motion.div
          className="w-80 h-96 bg-white rounded-lg shadow-xl p-4 flex flex-col"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-red-500">
              X
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mb-2 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded ${msg.isUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="p-2 flex-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask me anything..."
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot; 
