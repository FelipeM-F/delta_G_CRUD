import React, { useState, useEffect } from 'react';
import DeleteStudent from './DeleteStudent';

export default function StudentsList({ handleEdit, handleDelete }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching student list:', error.message);
        }
    };

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map((student, index) => (
                    <li key={student.id}>
                        {student.name} - {student.email}
                        <button onClick={() => handleEdit(student)}>Edit</button>
                        <DeleteStudent studentId={student.id} onDelete={() => handleDelete(index)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
