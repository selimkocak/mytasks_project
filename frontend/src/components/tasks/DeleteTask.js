// frontend\src\components\tasks\DeleteTask.js
import { deleteTask } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';

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
    <>
      <button onClick={handleDelete}>Sil</button>
    </>
  );
};

export default DeleteTask;
