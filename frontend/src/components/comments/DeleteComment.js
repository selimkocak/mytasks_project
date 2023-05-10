// frontend/src/components/comments/DeleteComment.js
import React from 'react';
import { deleteComment } from '../../services/api';

const DeleteComment = ({ commentId }) => {
  const handleDelete = async () => {
    await deleteComment(commentId);
  };

  return (
    <div>
      <h2>Delete Comment</h2>
      <button onClick={handleDelete}>Delete Comment</button>
    </div>
  );
};

export default DeleteComment;
