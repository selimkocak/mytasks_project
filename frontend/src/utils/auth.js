// frontend/src/utils/auth.js
import jwt_decode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      console.log("Access token has expired, please login again");
      removeToken();
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log("Error decoding token: ", err);
    removeToken();
    return false;
  }
};

export const logout = () => {
  removeToken();
};


