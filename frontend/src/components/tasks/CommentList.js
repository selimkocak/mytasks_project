// frontend\src\components\tasks\CommentList.js
import React from 'react';

const CommentList = ({ comments }) => (
  <div>
    {comments.map(comment => (
      <div key={comment.id}>
        <h4>{comment.author}</h4>
        <p>{comment.text}</p>
      </div>
    ))}
  </div>
);

export default CommentList;
