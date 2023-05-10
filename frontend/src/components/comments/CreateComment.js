// frontend\src\components\comments\CreateComment.js
import React, { useState } from 'react';
import { createComment } from '../../services/api';

const CreateComment = ({ taskId, onCommentCreated }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await createComment({
      taskId,
      text: commentText,
    });

    setCommentText('');
    onCommentCreated(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateComment;
