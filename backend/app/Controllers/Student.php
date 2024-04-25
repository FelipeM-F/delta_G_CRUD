<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\StudentModel;

class Student extends ResourceController
{
    private $studentModel;

    public function __construct()
    {
        $this->studentModel = new StudentModel();
        header("Access-Control-Allow-Origin: http://localhost:3000");
        header("Access-Control-Allow-Methods: POST,PUT,DELETE, GET, OPTIONS");
        header("Access-Control-Allow-Headers: X-PINGOTHER,Content-Type, Accept, Authorization");
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('HTTP/1.1 200 OK');
            exit();
        }
    }

    public function options()
    {
        // Respond to the OPTIONS request with the appropriate headers
        header("Access-Control-Allow-Origin: http://localhost:3000");
        header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Max-Age: 86400");
    }

    public function list()
    {
        try {
            $students = $this->studentModel->findAll();

            if (empty($students)) {
                return $this->fail('No students found.', 404);
            }

            return $this->respond($students);
        } catch (\Exception $e) {
            return $this->failServerError('Error fetching student data: ' . $e->getMessage());
        }
    }

    public function create()
    {
        try {
            $data = $this->request->getJSON(true);

            $newStudent = [
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'photo' => $data['photo'],
            ];

            $this->studentModel->insert($newStudent);

            return $this->respond(['message' => 'Student added successfully'], 201);
        } catch (\Exception $e) {
            return $this->failServerError('Error adding student: ' . $e->getMessage());
        }
    }

    public function update($id = null)
    {
        try {
            $data = $this->request->getJSON(true);

            $student = $this->studentModel->find($id);

            if (!$student) {
                return $this->fail('Student not found.', 404);
            }
            $student['name'] = $data['name'];
            $student['email'] = $data['email'];
            $student['phone'] = $data['phone'];
            $student['address'] = $data['address'];
            $student['photo'] = $data['photo'];

            $this->studentModel->update($id, $student);

            return $this->respond(['message' => 'Student updated successfully'], 200);
        } catch (\Exception $e) {
            return $this->failServerError('Error updating student: ' . $e->getMessage());
        }
    }

    public function delete($id = null)
    {
        try {
            $student = $this->studentModel->find($id);

            if (!$student) {
                return $this->fail('Student not found.', 404);
            }

            $this->studentModel->delete($id);

            return $this->respond(['message' => 'Student deleted successfully'], 200);
        } catch (\Exception $e) {
            return $this->failServerError('Error deleting student: ' . $e->getMessage());
        }
    }
}
