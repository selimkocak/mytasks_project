// frontend\src\components\tasks\CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ taskId, onCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onCommentSubmit(taskId, comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Write a comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
