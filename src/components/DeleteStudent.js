import React from 'react';
import '../App.css';
export default function DeleteStudent({ studentId, onDelete }) {
  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'          
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      onDelete(studentId);
      console.log('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error.message);
    }
  };

  return (
    <button className='delete-button' onClick={handleClick}>Delete</button>
  );
}
