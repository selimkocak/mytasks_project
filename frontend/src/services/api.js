// frontend/src/services/api.js
import axios from "axios";

export const API_URL = "http://localhost:8000/api/";

export const register = (data) => {
  return axios.post(API_URL + "auth/register/", data)
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
  return axios.post(API_URL + "auth/logout/")
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
<<<<<<< HEAD
  return axios.get(API_URL + 'auth/user-profile/');
  };
  
export const updateUserProfile = (data) => {
  return axios.put(API_URL + 'auth/user-profile/', data);
  };
  
export const changePassword = (data) => {
  return axios.put(API_URL + 'auth/change-password/', data);
  };

// company
export const listCompanies = () => {
  return axios.get(API_URL + "company/");
};

export const createCompany = (data) => {
  return axios.post(API_URL + "company/", data);
};

export const getCompany = (id) => {
  return axios.get(API_URL + `company/${id}/`);
};

const updateCompany = (id, data) => {
  return axios.put(API_URL + `company/${id}/`, data);
};

export const deleteCompany = (id) => {
  return axios.delete(API_URL + `company/${id}/`);
=======
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(API_URL + 'auth/user-profile/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserProfile = (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(API_URL + 'auth/user-profile/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(API_URL + 'auth/change-password/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
 
// company
export const listCompanies = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(API_URL + "company/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCompany = (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.post(API_URL + "company/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCompany = (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(API_URL + `company/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCompany = (id, data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.put(API_URL + `company/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCompany = (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.delete(API_URL + `company/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
>>>>>>> parent of 0034424 (api.js services)
};

// Task
export const createTask = async (data) => {
  return axios.post(`${API_URL}tasks/`, data);
};

export const getTasks = async () => {
  return axios.get(`${API_URL}tasks/`);
};

export const getTask = async (id) => {
  return axios.get(`${API_URL}tasks/${id}/`);
};

export const updateTask = async (id, data) => {
  return axios.put(`${API_URL}tasks/${id}/`, data);
};

export const deleteTask = async (id) => {
  return axios.delete(`${API_URL}tasks/${id}/`);
};


// Notification
export const createNotification = async (data) => {
  return axios.post(`${API_URL}notification/`, data);
};

export const getNotifications = async () => {
  return axios.get(`${API_URL}notification/`);
};

export const updateNotification = async (id, data) => {
  return axios.put(`${API_URL}notification/${id}/`, data);
};

export const deleteNotification = async (id) => {
  return axios.delete(`${API_URL}notification/${id}/`);
};

// Assignment
export const createAssignment = async (data) => {
  return axios.post(`${API_URL}assignment/`, data);
};

export const getAssignments = async () => {
  return axios.get(`${API_URL}assignment/`);
};

export const updateAssignment = async (id, data) => {
  return axios.put(`${API_URL}assignment/${id}/`, data);
};

export const deleteAssignment = async (id) => {
  return axios.delete(`${API_URL}assignment/${id}/`);
};

// Rating
export const createRating = async (data) => {
  return axios.post(`${API_URL}rating/`, data);
};

export const getRatings = async () => {
  return axios.get(`${API_URL}rating/`);
};

export const updateRating = async (id, data) => {
  return axios.put(`${API_URL}rating/${id}/`, data);
};

export const deleteRating = async (id) => {
  return axios.delete(`${API_URL}rating/${id}/`);
};

// Comment
export const createComment = async (data) => {
  return axios.post(`${API_URL}comment/`, data);
};

export const getComments = async () => {
  return axios.get(`${API_URL}comment/`);
};

export const updateComment = async (id, data) => {
  return axios.put(`${API_URL}comment/${id}/`, data);
};

export const deleteComment = async (id) => {
  return axios.delete(`${API_URL}comment/${id}/`);
};

// Project
export const createProject = async (data) => {
  return axios.post(`${API_URL}project/`, data);
};

export const getProjects = async () => {
  return axios.get(`${API_URL}project/`);
};

export const updateProject = async (id, data) => {
  return axios.put(`${API_URL}project/${id}/`, data);
};

export const deleteProject = async (id) => {
  return axios.delete(`${API_URL}project/${id}/`);
};

// Kanban
export const createKanban = async (data) => {
  return axios.post(`${API_URL}kanban/`, data);
};

export const getKanbans = async () => {
  return axios.get(`${API_URL}kanban/`);
};

export const updateKanban = async (id, data) => {
  return axios.put(`${API_URL}kanban/${id}/`, data);
};

export const deleteKanban = async (id) => {
  return axios.delete(`${API_URL}kanban/${id}/`);
};

// kaban stage
export const getKanbanStages = async () => {
<<<<<<< HEAD
  return axios.get(`${API_URL}kanban/stages/`);
=======
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.get(`${API_URL}kanban/stages/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
>>>>>>> parent of 0034424 (api.js services)
};


// Role
export const createRole = async (data) => {
  return axios.post(`${API_URL}role/`, data);
};

export const getRoles = async () => {
  return axios.get(`${API_URL}role/`);
};

export const updateRole = async (id, data) => {
  return axios.put(`${API_URL}role/${id}/`, data);
};

export const deleteRole = async (id) => {
  return axios.delete(`${API_URL}role/${id}/`);
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