// frontend/src/components/comments/CommentsList.js
import React, { useEffect, useState } from 'react';
import { getComments } from '../../services/api';
import './CommentsList.css'; // CommentsList.css dosyasını içe aktardık

const CommentsList = ({ taskId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getComments(taskId);
      setComments(response.data);
    };

    fetchData();
  }, [taskId]);

  return (
    <div className="comments-list"> {/* className ile stil sınıfını ekledik */}
      {comments.map((comment) => (
        <div className="comment" key={comment.id}> {/* className ile stil sınıfını ekledik */}
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
