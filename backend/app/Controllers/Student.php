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
        header("Access-Control-Allow-Origin: " . getenv('cors.allowedOrigins'));
        header("Access-Control-Allow-Methods: " . getenv('cors.allowedMethods'));
        header("Access-Control-Allow-Headers: " . getenv('cors.allowedHeaders'));
        header("Access-Control-Expose-Headers: " . getenv('cors.exposedHeaders'));
        header("Access-Control-Allow-Credentials: " . (getenv('cors.allowCredentials') === 'true' ? 'true' : 'false'));
        header("Access-Control-Max-Age: " . getenv('cors.maxAge'));
    

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
            header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
            die(); 
        }
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
        $file = $this->request->getFile('photo');
        if ($file && $file->isValid() && !$file->hasMoved()) {

            $newName = $file->getRandomName();
            $targetPath = realpath(__DIR__ . '/../../writable/uploads');
            $file->move($targetPath, $newName);

            $data = $this->request->getPost();
            $data['photo'] = $newName;

            if ($this->studentModel->insert($data)) {
                return $this->respondCreated(['message' => 'Student added successfully', 'data' => $data]);
            } else {
                return $this->failValidationErrors($this->studentModel->errors());
            }
        }

        return $this->failValidationErrors('Invalid file.');
    }

    public function update($id = null)
    {
        try {
            $data = $this->request->getJSON(true);
    
            $student = $this->studentModel->find($id);
    
            if (!$student) {
                return $this->fail('Student not found.', 404);
            }
    
            if ($student['photo']) {
                $targetPath = realpath(__DIR__ . '/../../writable/uploads');
                $filePath = $targetPath . '/' . $student['photo']; 
                if (file_exists($filePath)) {
                    unlink($filePath); 
                }
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
    
            if ($student['photo']) {
                $targetPath = realpath(__DIR__ . '/../../writable/uploads');
                $filePath = $targetPath . '/' . $student['photo'];
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
    
            $this->studentModel->delete($id);
    
            return $this->respond(['message' => 'Student deleted successfully'], 200);
        } catch (\Exception $e) {
            return $this->failServerError('Error deleting student: ' . $e->getMessage());
        }
    }

    
}
