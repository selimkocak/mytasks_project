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
    const decoded = jwt_decode(token); // Add this line
    const currentTime = Date.now() / 1000; // Get current time in seconds

    if (decoded.exp < currentTime) {
      // Token süresi dolmuş
      console.log("Access token has expired, please login again");
      removeToken(); // token'ı temizle
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log("Error decoding token: ", err);
    removeToken(); // token'ı temizle
    return false;
  }
};