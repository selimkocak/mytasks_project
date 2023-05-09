// frontend/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (data) => {
  return axios.post(API_URL + "auth/register/", data);
};

const login = (data) => {
  return axios.post(API_URL + "auth/token/", data);
};

const logout = () => {
  return axios.post(API_URL + "auth/logout/");
};

const refreshToken = (data) => {
  return axios.post(API_URL + "auth/token/refresh/", data);
};

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

// ... Aynı yapıyı diğer uygulamalar için de uygulayabilirsiniz.

export default {
  register,
  login,
  logout,
  refreshToken,
  listCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
  // ... Diğer uygulamalar için eklediğiniz fonksiyonları da burada export edin.
};
