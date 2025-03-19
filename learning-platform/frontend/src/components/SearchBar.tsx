import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="mb-8 max-w-3xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for learning tools..."
          className="p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {results.length > 0 && (
        <motion.div
          className="mt-4 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {results.map((result, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-semibold">{result.name}</h3>
              <p>{result.description}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar; 
