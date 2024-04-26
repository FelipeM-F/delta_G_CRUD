<?php

namespace App\Models;

use CodeIgniter\Model;

class StudentModel extends Model
{
    protected $table = 'students'; 

    protected $primaryKey = 'id'; 

    protected $allowedFields = ['name', 'email', 'phone', 'address', 'photo']; 

    public function insert($data = null, bool $returnID = true)
    {

        if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['address'])) {
            return false; 
        }

        if ($this->where('email', $data['email'])->countAllResults() > 0) {
            return false; 
        }

        return parent::insert($data, $returnID);
    }
}