// frontend\src\components\assignment\CreateAssignment.js
import React, { useState } from 'react';
import { isRequired, hasMinimumLength } from '../../utils/validation';

const CreateAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form değerlerini validasyonla kontrol et
    if (!isRequired(title)) {
      console.log('Assignment title is required');
      return;
    }

    if (!hasMinimumLength(description, 10)) {
      console.log('Assignment description must be at least 10 characters long');
      return;
    }

    // Form değerlerini kullanarak işlem yap
    // ...

    // Formu sıfırla
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Create Assignment</button>
    </form>
  );
};

export default CreateAssignment;

