// frontend/src/components/company/DeleteCompany.js
import React from 'react';
import api from '../../services/api';

function DeleteCompany({ id }) {

  const handleDelete = async () => {
    try {
      const response = await api.deleteCompany(id);
      console.log(response.data);

      // Silme işlemi başarılı olursa, belki kullanıcıyı bir başka sayfaya yönlendirebiliriz
      // veya belirli bir durumu güncelleyebiliriz. Bu örnekte basitlik adına, sadece konsola bir mesaj yazdırıyoruz.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Delete Company</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteCompany;
