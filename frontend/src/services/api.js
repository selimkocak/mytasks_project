// frontend/src/services/api.js
import axios from "axios";

export const API_URL = "http://localhost:8000/api/";

// Create axios instance
const service = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Request interceptor
service.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json"; // Content-Type başlığını ayarla
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


// Response interceptor
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      if (refreshToken) {
        return service
          .post("auth/token/refresh/", { refresh: refreshToken })
          .then((response) => {
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.tokens)
            );
            const config = error.config;
            config.headers["Authorization"] = `Bearer ${response.data.tokens}`;
            return new Promise((resolve, reject) => {
              service
                .request(config)
                .then((response) => {
                  resolve(response);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          })
          .catch((error) => {
            Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  }
);

export const register = (data) => {
  return service.post("auth/register/", data).then((response) => {
    if (response.data.tokens) {
      localStorage.setItem("token", JSON.stringify(response.data.tokens));
    }
    return response;
  });
};

export const login = (data) => {
  return axios.post(API_URL + "auth/token/", data).then((response) => {
    if (response.data.access) {
      localStorage.setItem("token", JSON.stringify(response.data.access));
      // Eğer refresh token dönüyorsa
      if (response.data.refresh) {
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refresh)
        );
      }
    }
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response;
  });
};
// frontend\src\services\api.js
export const resetPassword = (email) => {
  return service.post('auth/reset-password/', { email }, { withCredentials: true });
};


export const logout = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      // Sunucuya logout isteği gönder
      await service.post("auth/logout/", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Kullanıcı ve token verilerini yerel depodan temizle
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch (error) {
    throw new Error("Logout failed");
  }
};

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return user !== null;
};

// Set auth token function
export const setAuthToken = (token) => {
  if (token) {
    service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete service.defaults.headers.common['Authorization'];
  }
};

export const refreshToken = (data) => {
  return axios.post(API_URL + "auth/token/refresh/", data);
};
// frontend\src\services\api.js
export const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
};

// frontend/src/services/api.js
export const getLoggedInUserEmail = async () => {
  try {
    const response = await service.get("auth/user/email/");
    return response.data.email;
  } catch (error) {
    console.error('Error loading logged-in user email:', error);
    return null;
  }
};

export const getUserList = async () => {
  try {
    const response = await service.get("auth/users/");
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("getUserList did not return an array", response.data);
      return []; // Boş bir dizi döndür
    }
  } catch (error) {
    console.error("Error loading user list:", error);
    return []; // Boş bir dizi döndür
  }
};


// user profile frontend\src\services\api.js
export const getUserProfile = () => {
  return service.get('auth/user-profile/');
};

export const updateUserProfile = (data) => {
  return service.put('auth/update-user-profile/', data);
};

export const changePassword = (data) => {
  return service.put('auth/change-password/', data);
};

// company
export const listCompanies = () => {
  return service.get("company/");
};

export const createCompany = (data) => {
  return service.post("company/", data);
};

export const getCompany = (id) => {
  return service.get(`company/${id}/`);
};

export const updateCompany = (id, data) => {
  return service.put(`company/${id}/`, data);
};

export const deleteCompany = (id) => {
  return service.delete(`company/${id}/`);
};

// Task frontend/src/services/api.js
export const createTask = async (data) => {
  try {
    const response = await service.post('tasks/', data);
    return response;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const getTasks = async () => {
  return service.get('tasks/');
};

export const getTask = async (id) => {
  return service.get(`tasks/${id}/`);
};

export const updateTask = async (id, data) => {
  try {
    const response = await service.put(`tasks/${id}/`, data);
    console.log('Task updated successfully');
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};


export const deleteTask = async (id) => {
  try {
    await service.delete(`tasks/${id}/`);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};


// Notification
export const createNotification = async (data) => {
  return service.post("notification/", data);
};

export const getNotifications = async () => {
  return service.get("notification/");
};

export const updateNotification = async (id, data) => {
  return service.put(`notification/${id}/`, data);
};

export const deleteNotification = async (id) => {
  return service.delete(`notification/${id}/`);
};

// Assignment
export const createAssignment = async (data) => {
  return service.post("assignment/", data);
};

export const getAssignments = async () => {
  return service.get("assignment/");
};

export const updateAssignment = async (id, data) => {
  return service.put(`assignment/${id}/`, data);
};

export const deleteAssignment = async (id) => {
  return service.delete(`assignment/${id}/`);
};

// Rating
export const createRating = async (data) => {
  return service.post("rating/", data);
};

export const getRatings = async () => {
  return service.get("rating/");
};

export const updateRating = async (id, data) => {
  return service.put(`rating/${id}/`, data);
};

export const deleteRating = async (id) => {
  return service.delete(`rating/${id}/`);
};

// Comment frontend\src\services\api.js
export const createComment = async (data) => {
  return service.post("comment/comments/create/", data);
};

export const getComments = async () => {
  return service.get("comment/comments/");
};

export const updateComment = async (id, data) => {
  return service.put(`comment/comments/${id}/`, data);
};

export const deleteComment = async (id) => {
  return service.delete(`comment/comments/${id}/`);
};

export const getCommentsByTask = async (taskId) => {
  return service.get(`comment/comments/?task=${taskId}`);
};

export const getCommentCountByTask = async (taskId) => {
  try {
    const response = await getComments();
    if (response.status === 200) {
      const comments = response.data;
      const filteredComments = comments.filter(comment => comment.task === taskId);
      return filteredComments.length;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching comment count:', error);
    return 0;
  }
};
// Project
export const createProject = async (data) => {
  return service.post("project/projects/create/", data);
};

export const getProjects = async () => {
  return service.get("project/projects/");
};

export const updateProject = async (id, data) => {
  return service.put(`project/projects/${id}/`, data);
};



export const deleteProject = async (id) => {
  return service.delete(`project/projects/${id}/`);
};

// Kanban frontend\src\services\api.js
export const createKanban = async (data) => {
  try {
    const response = await service.post("kanban/", data);
    return response;
  } catch (error) {
    console.error('Error creating kanban:', error);
    throw error;
  }
};

export const getKanbans = async () => {
  try {
    const response = await service.get("kanban/");
    return response.data;
  } catch (error) {
    console.error('Error fetching kanbans:', error);
    throw error;
  }
};

export const updateKanban = async (id, data) => {
  try {
    const response = await service.put(`kanban/${id}/`, data);
    console.log('Kanban updated successfully');
    return response.data;
  } catch (error) {
    console.error('Error updating kanban:', error);
    throw error;
  }
};

export const deleteKanban = async (id) => {
  try {
    await service.delete(`kanban/${id}/`);
    console.log('Kanban deleted successfully');
  } catch (error) {
    console.error('Error deleting kanban:', error);
    throw error;
  }
};

// Kanban stages
export const getKanbanStages = async () => {
  try {
    const response = await service.get("kanban/stages/");
    return response.data;
  } catch (error) {
    console.error('Error fetching kanban stages:', error);
    throw error;
  }
};

// Move card
export const moveCard = async (cardId, stageId) => {
  try {
    await service.put(`tasks/${cardId}/move`, { new_stage_id: stageId });
    console.log('Card moved successfully');
  } catch (error) {
    console.error('Error moving card:', error);
    throw error;
  }
};


// Role
export const createRole = async (data) => {
  return service.post("role/", data);
};

export const getRoles = async () => {
  return service.get("role/");
};

export const updateRole = async (id, data) => {
  return service.put(`role/${id}/`, data);
};

export const deleteRole = async (id) => {
  return service.delete(`role/${id}/`);
};

export const apiFunctions = {
  register,
  login,
  logout,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  changePassword,
  listCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
  createRating,
  getRatings,
  updateRating,
  deleteRating,
  createComment,
  getComments,
  updateComment,
  deleteComment,
  getCommentsByTask,
  getCommentCountByTask,
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  createKanban,
  getKanbans,
  updateKanban,
  deleteKanban,
  getKanbanStages,
  moveCard,
  createRole,
  getRoles,
  updateRole,
  deleteRole

};
export default apiFunctions;