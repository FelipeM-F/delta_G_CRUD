import React, { useState } from 'react';

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
      // Fazer uma solicitação PUT para atualizar o aluno usando fetch
      const response = await fetch(`http://localhost:8080/students/${editedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedStudent)
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      // Se a atualização for bem-sucedida, chamar a função onSave para atualizar a lista de alunos
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
          />
        </label>
        <br />
        <label>
          Photo:
          <input
            type="text"
            name="photo"
            value={editedStudent.photo}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}
