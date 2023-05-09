// frontend/src/components/CommentItem.js
import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div>
      <h5>{comment.author}</h5> {/* Yorum yapan kullanıcının adını gösterir */}
      <p>{comment.text}</p> {/* Yorum metnini gösterir */}
    </div>
  );
};

export default CommentItem;
