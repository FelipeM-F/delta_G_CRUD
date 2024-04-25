import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import StudentsList from './components/StudentsList';
import EditStudent from './components/EditStudent';
import StudentDetails from './components/StudentDetails'; // Importe o componente de detalhes do aluno

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const toggleModal = () => setModalOpen(!isModalOpen);

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
  };

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
  };

  return (
    <Router>
      <div className="App">
        <h1>CRUD</h1>
        <div className="students-list">
          <StudentsList students={students} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
        <button onClick={toggleModal}>Add Student</button>
        <div className={`modal ${isModalOpen ? 'active' : ''}`}>
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
              <button onClick={toggleModal}>Close</button>
              <AddStudent students={students} setStudents={setStudents} />
            </>
          )}
        </div>
        {/* Defina a rota para a página de detalhes do aluno */}
        <Switch>
          <Route path="/student/:id" component={StudentDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
