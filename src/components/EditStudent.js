import React, { useState } from 'react';
import './EditStudent.css';
import UpdatePhoto from './UpdatePhoto'; 

export default function EditStudent({ student, onSave, onCancel }) {
  const [editedStudent, setEditedStudent] = useState(student);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedStudent(prevStudent => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/students/${editedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedStudent),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      onSave(editedStudent);
      console.log('Student updated successfully');
    } catch (error) {
      console.error('Error updating student:', error.message);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedStudent.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={editedStudent.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={editedStudent.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={editedStudent.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <button className='edit' type="submit">Save</button>
        <button className='edit' type="button" onClick={onCancel}>Cancel</button>
      </form>

      <UpdatePhoto studentId={editedStudent.id} onUpdatePhoto={() => console.log('Photo updated!')} />
    </div>
  );
}
