// frontend/src/components/comments/CreateComment.js
import React, { useState } from 'react';
import { createComment } from '../../services/api';
import './CreateComment.css'; // CreateComment.css dosyasını içe aktardık

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
    <form className="create-comment-form" onSubmit={handleSubmit}> {/* className ile stil sınıfını ekledik */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateComment;
