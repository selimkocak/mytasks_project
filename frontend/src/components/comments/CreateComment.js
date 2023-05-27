// frontend/src/components/comments/CreateComment.js
import React, { useState } from 'react';
import { createComment } from '../../services/api';
import { isRequired } from '../../utils/validation'; // validation.js dosyasını içe aktardık
import './CreateComment.css';

const CreateComment = ({ taskId, onCommentCreated }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Gerekli validasyonları kontrol et
    if (!isRequired(commentText)) {
      setError('Comment text is required');
      return;
    }

    try {
      const response = await createComment({
        taskId,
        text: commentText,
      });

      setCommentText('');
      setError('');
      onCommentCreated(response.data);
    } catch (error) {
      setError('Error creating comment');
    }
  };

  return (
    <form className="create-comment-form" onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Submit</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};


export default CreateComment;
