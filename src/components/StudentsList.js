import React, { useState, useEffect } from 'react';
import './StudentsList.css';
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
        <div className="table-container">
            <h1>Student List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th >Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <button  className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                            </td>
                            <td>
                                <DeleteStudent studentId={student.id} onDelete={() => handleDelete(index)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
