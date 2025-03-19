import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Library {
  id: string;
  name: string;
  description: string;
  link: string;
}

const LibraryList: React.FC = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);

  useEffect(() => {
    axios.get('/api/libraries')
      .then(response => setLibraries(response.data))
      .catch(error => console.error('Error fetching libraries:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {libraries.map(lib => (
        <motion.div
          key={lib.id}
          className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-800">{lib.name}</h3>
          <p className="text-gray-600">{lib.description}</p>
          <a href={lib.link} className="text-blue-500 hover:underline block mt-2" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default LibraryList; 
