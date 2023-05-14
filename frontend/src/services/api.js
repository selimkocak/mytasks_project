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

export const getLoggedInUser = () => {
  // Bu fonksiyon genellikle oturum açan kullanıcının bilgilerini döndürür.
  // Kullanıcı bilgilerini nereden aldığınıza bağlı olarak bu fonksiyonu uyarlayabilirsiniz.
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getUserList = async () => {
  // Bu fonksiyon genellikle sunucudan bir kullanıcı listesi alır.
  // Kullanıcı listesini nasıl aldığınıza bağlı olarak bu fonksiyonu uyarlayabilirsiniz.
  return service.get("auth/users/");
};

// user profile
export const getUserProfile = () => {
  return service.get('auth/user-profile/');
};

export const updateUserProfile = (data) => {
  return service.put('auth/user-profile/', data);
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

// Task
export const createTask = async (data) => {
  return service.post("tasks/", data);
};

export const getTasks = async () => {
  return service.get("tasks/");
};

export const getTask = async (id) => {
  return service.get(`tasks/${id}/`);
};

export const updateTask = async (id, data) => {
  return service.put(`tasks/${id}/`, data);
};

export const deleteTask = async (id) => {
  return service.delete(`tasks/${id}/`);
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

// Comment
export const createComment = async (data) => {
  return service.post("comment/", data);
};

export const getComments = async () => {
  return service.get("comment/");
};

export const updateComment = async (id, data) => {
  return service.put(`comment/${id}/`, data);
};

export const deleteComment = async (id) => {
  return service.delete(`comment/${id}/`);
};

// Project
export const createProject = async (data) => {
  return service.post("project/", data);
};

export const getProjects = async () => {
  return service.get("project/");
};

export const updateProject = async (id, data) => {
  return service.put(`project/${id}/`, data);
};

export const deleteProject = async (id) => {
  return service.delete(`project/${id}/`);
};

// Kanban
export const createKanban = async (data) => {
  return service.post("kanban/", data);
};

export const getKanbans = async () => {
  return service.get("kanban/");
};

export const updateKanban = async (id, data) => {
  return service.put(`kanban/${id}/`, data);
};

export const deleteKanban = async (id) => {
  return service.delete(`kanban/${id}/`);
};

// Kanban stages
export const getKanbanStages = async () => {
  return service.get("kanban/stages/");
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
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  createKanban,
  getKanbans,
  updateKanban,
  deleteKanban,
  getKanbanStages,
  createRole,
  getRoles,
  updateRole,
  deleteRole

};
export default apiFunctions;