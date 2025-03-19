import React from 'react';
import { useParams } from 'react-router-dom';

const Course: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
      <p>Displaying details for course ID: {id}</p>
      {/* Add course-specific content here */}
    </div>
  );
};

export default Course; 
