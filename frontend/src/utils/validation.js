// frontend\src\utils\validation.js

// Boşluk kontrolü
export const isRequired = (value) => {
  return value.trim() !== '';
};

// E-posta formatı kontrolü
export const isValidEmail = (value) => {
  // E-posta formatı kontrolü için uygun bir regex kullanabilirsiniz
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

// Şifre gücü kontrolü
export const isStrongPassword = (value) => {
  // Şifrenin güçlü olması için gerekli kriterleri belirleyebilirsiniz
  // Örneğin: en az 8 karakter, büyük harf, küçük harf, sayı, özel karakter içermesi gibi
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

// Minimum karakter sayısı kontrolü
export const hasMinimumLength = (value, length) => {
  return value.length >= length;
};
