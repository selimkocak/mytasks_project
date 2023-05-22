// frontend/src/components/tasks/DeleteTask.js
import React from 'react';
import { deleteTask } from '../../services/api';

const DeleteTask = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteTask(id);
      onDelete(); // Görev kartlarını yeniden yüklemek için bir fonksiyonu tetikleyin
      console.log('Görev başarıyla silindi');
    } catch (error) {
      console.error('Görev silinirken hata oluştu:', error);
    }
  };

  return (
    <>
      <button onClick={handleDelete}>
        Sil
      </button>
    </>
  );
};

export default DeleteTask;

