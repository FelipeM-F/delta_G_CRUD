import React, { useState } from 'react';

export default function AddStudent({ students, setStudents }) {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        photo: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new student object
        const newStudent = {
            name: student.name,
            email: student.email,
            phone: student.phone,
            address: student.address,
            photo: student.photo
        };

        try {
            // Make an API call using fetch
            const response = await fetch('http://localhost:8080/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            });

            if (!response.ok) {
                throw new Error('Failed to add student');
            }

            const addedStudent = await response.json();
            setStudents([...students, addedStudent]);
            console.log('Student added:', addedStudent);
            // Clear the form fields
            setStudent({
                name: '',
                email: '',
                phone: '',
                address: '',
                photo: ''
            });
        } catch (error) {
            console.error('Error adding student:', error.message);
        }
    };


    return (
        <div>
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={student.phone}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={student.address}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Photo:
              <input
                type="text"
                name="photo"
                value={student.photo}
                onChange={handleChange}
              />
            </label>
            <br />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}
