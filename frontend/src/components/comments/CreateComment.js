// frontend/src/components/comments/CreateComment.js
import React, { useState } from 'react';
import { createComment } from '../../services/api';
import { isRequired } from '../../utils/validation'; // validation.js dosyasını içe aktardık
import './CreateComment.css';

const CreateComment = ({ taskId, onCommentCreated }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Gerekli validasyonları kontrol et
    if (!isRequired(commentText)) {
      console.log('Comment text is required');
      return;
    }

    const response = await createComment({
      taskId,
      text: commentText,
    });

    setCommentText('');
    onCommentCreated(response.data);
  };

  return (
    <form className="create-comment-form" onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateComment;

