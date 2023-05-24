// frontend\src\components\tasks\DeleteTask.js
import { deleteTask } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';
import Button from 'react-bootstrap/Button';

const DeleteTask = ({ id, loadTasks }) => { 
  const handleDelete = async () => {
    if (isAuthenticated()) {
      try {
        await deleteTask(id);
        await loadTasks(); 
        console.log('Görev başarıyla silindi');
      } catch (error) {
        console.error('Görev silinirken hata oluştu:', error);
      }
    } else {
      console.log('Lütfen giriş yapın');
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>Sil</Button>
  );
};

export default DeleteTask;
