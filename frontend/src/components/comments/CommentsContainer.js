// frontend\src\components\comments\CommentsContainer.js
import React, { useState } from 'react';
import CreateComment from './CreateComment';
import CommentsList from './CommentsList';

const CommentsContainer = ({ taskId, userId, taskTitle }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentCreated = () => {
    // Whenever a comment is created, we update the key, causing the comment list to refresh.
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div>
      <CreateComment 
        taskId={taskId}
        userId={userId}
        taskTitle={taskTitle}
        onCommentCreated={handleCommentCreated}
      />
      <CommentsList taskId={taskId} key={refreshKey} />
    </div>
  );
};

export default CommentsContainer;
