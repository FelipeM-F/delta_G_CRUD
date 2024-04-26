import React, { useState } from 'react';

export default function AddStudent({ students, setStudents, reloadStudents }) {
  const [student, setStudent] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      photo: null 
  });

  const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'photo') {
          
          setStudent(prevStudent => ({
              ...prevStudent,
              [name]: event.target.files[0] 
          }));
      } else {
          setStudent(prevStudent => ({
              ...prevStudent,
              [name]: value
          }));
      }
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('name', student.name);
      formData.append('email', student.email);
      formData.append('phone', student.phone);
      formData.append('address', student.address);
      formData.append('photo', student.photo);

      try {
          const response = await fetch('http://localhost:8080/students', {
              method: 'POST',
              body: formData 
          });

          if (!response.ok) {
              throw new Error('Failed to add student');
          }

          const addedStudent = await response.json();
          setStudents([...students, addedStudent]);
          console.log('Student added:', addedStudent);
          setStudent({
              name: '',
              email: '',
              phone: '',
              address: '',
              photo: null 
          });        
        window.location.reload();
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
                    required 
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
                    required 
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
                    required 
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
                    required
                  />
                </label>
                <br />
                <label>
                  Photo:
                  <input
                    type="file" 
                    name="photo"
                    onChange={handleChange}
                    required 
                  />
                </label>
                <br />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}
