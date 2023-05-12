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
  config => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
      if (refreshToken) {
        return service.post("auth/token/refresh/", { refresh: refreshToken })
          .then(response => {
            localStorage.setItem('token', JSON.stringify(response.data.tokens));
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${response.data.tokens}`;
            return new Promise((resolve, reject) => {
              service.request(config).then(response => {
                resolve(response);
              }).catch((err) => {
                reject(err);
              })
            });
          })
          .catch(error => {
            Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  }
);

export const register = (data) => {
  return service.post("auth/register/", data)
    .then((response) => {
      if (response.data.tokens) {
        localStorage.setItem('token', JSON.stringify(response.data.tokens));
      }
      return response;
    });
};

export const login = (data) => {
  return axios.post(API_URL + "auth/token/", data)
    .then((response) => {
      if (response.data.user && response.data.tokens) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.tokens));
      }
      return response;
    });
};

export const logout = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(API_URL + "auth/logout/", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return response;
    });
};

export const refreshToken = (data) => {
  return axios.post(API_URL + "auth/token/refresh/", data);
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
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}tasks/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTasks = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}tasks/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTask = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}tasks/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}tasks/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}tasks/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Notification
export const createNotification = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}notification/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNotifications = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}notification/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateNotification = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}notification/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteNotification = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}notification/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Assignment
export const createAssignment = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}assignment/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAssignments = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}assignment/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAssignment = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}assignment/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAssignment = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}assignment/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Rating
export const createRating = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}rating/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRatings = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}rating/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRating = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}rating/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRating = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}rating/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Comment
export const createComment = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}comment/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getComments = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}comment/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateComment = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}comment/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteComment = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}comment/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Project
export const createProject = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}project/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProjects = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}project/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProject = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}project/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProject = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}project/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Kanban
export const createKanban = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}kanban/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getKanbans = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}kanban/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateKanban = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}kanban/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteKanban = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}kanban/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// kanban stages
export const getKanbanStages = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}/kanban/stages/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Role
export const createRole = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(`${API_URL}role/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRoles = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}role/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRole = async (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(`${API_URL}role/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRole = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(`${API_URL}role/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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