// frontend/src/components/comments/CommentList.js
import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import api from '../../services/api';

const CommentList = () => {
  // useState ile comments adlı bir state oluşturduk ve başlangıç değeri olarak boş bir dizi atadık
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // API'dan yorumları alıp comments state'ine atayabiliriz
    // Burada örnek olarak statik bir liste kullanıyoruz
    api.getComments().then((response) => {
      setComments(response.data);
    });
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
