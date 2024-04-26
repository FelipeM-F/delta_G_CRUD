import React, { useState } from 'react';

export default function UpdatePhoto({ studentId, onUpdatePhoto }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      const response = await fetch(`http://localhost:8080/students/${studentId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update photo.');
      }

      onUpdatePhoto();
      console.log('Photo updated successfully');
    } catch (error) {
      console.error('Error updating photo:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Photo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
