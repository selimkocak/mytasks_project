// frontend\src\components\tasks\FetchTasks.js
import { getTasks } from '../../services/api';

const fetchTasks = async () => {
  try {
    const response = await getTasks();
    // Görevleri kullanmak için response.data'yı döndürebilirsiniz
    return response.data;
  } catch (error) {
    console.error('Görevleri getirirken hata oluştu:', error);
    throw error;
  }
};

export default fetchTasks;
