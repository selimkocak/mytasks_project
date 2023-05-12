// frontend/src/utils/validation.js

export const validateLoginForm = (email, password) => {
    const errors = {};
  
    if (!email) {
      errors.email = 'Email alanı boş bırakılamaz.';
    }
  
    if (!password) {
      errors.password = 'Şifre alanı boş bırakılamaz.';
    }
  
    return errors;
  };
  
  export const validateRegisterForm = (email, password, confirmPassword) => {
    const errors = {};
  
    if (!email) {
      errors.email = 'Email alanı boş bırakılamaz.';
    }
  
    if (!password) {
      errors.password = 'Şifre alanı boş bırakılamaz.';
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Şifreler uyuşmuyor.';
    }
  
    return errors;
  };
  