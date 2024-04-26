import React, { useState } from 'react';
import './App.css';
import AddStudent from './components/AddStudent';
import StudentsList from './components/StudentsList';
import EditStudent from './components/EditStudent';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    toggleModal();
  };

  const handleSave = (editedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === editedStudent.id ? editedStudent : student
    );
    setStudents(updatedStudents);
    setEditingStudent(null);
    toggleModal();
    window.location.reload();
  };

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
    window.location.reload();
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD</h1>
        <div className="students-list">
          <StudentsList students={students} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
        <button onClick={toggleModal}>Add Student</button>
        <div className={`modal ${modalOpen ? 'active' : ''}`}>
          <div className="modal-content">
            {editingStudent ? (
              <EditStudent
                student={editingStudent}
                onSave={handleSave}
                onCancel={() => {
                  setEditingStudent(null);
                  toggleModal();
                }}
              />
            ) : (
              <>
                <button className="modal-close-button" onClick={toggleModal}>Close</button>
                <AddStudent students={students} setStudents={setStudents} />
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
