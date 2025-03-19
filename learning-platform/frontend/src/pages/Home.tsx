import React from 'react';
import LibraryList from '../components/LibraryList';

const Home: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Libraries</h2>
      <LibraryList />
    </div>
  );
};

export default Home; 
