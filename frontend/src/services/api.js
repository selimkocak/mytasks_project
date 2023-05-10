// frontend/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (data) => {
  return axios.post(API_URL + "auth/register/", data)
    .then((response) => {
      if (response.data.tokens) {
        localStorage.setItem('token', JSON.stringify(response.data.tokens));
      }
      return response;
    });
};

const login = (data) => {
  return axios.post(API_URL + "auth/token/", data)
    .then((response) => {
      if (response.data.user && response.data.tokens) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.tokens));
      }
      return response;
    });
};

const logout = () => {
  return axios.post(API_URL + "auth/logout/")
    .then((response) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return response;
    });
};

const refreshToken = (data) => {
  return axios.post(API_URL + "auth/token/refresh/", data);
};

// company
const listCompanies = () => {
  return axios.get(API_URL + "company/");
};

const createCompany = (data) => {
  return axios.post(API_URL + "company/", data);
};

const getCompany = (id) => {
  return axios.get(API_URL + `company/${id}/`);
};

const updateCompany = (id, data) => {
  return axios.put(API_URL + `company/${id}/`, data);
};

const deleteCompany = (id) => {
  return axios.delete(API_URL + `company/${id}/`);
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


const apiFunctions = {
  register,
  login,
  logout,
  refreshToken,
  listCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
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
  createRole,
  getRoles,
  updateRole,
  deleteRole

};
export default apiFunctions;