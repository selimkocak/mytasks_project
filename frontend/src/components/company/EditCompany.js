// frontend/src/components/company/EditCompany.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function EditCompany({ id }) {
  const [name, setName] = useState('');

  useEffect(() => {
    // Component mount edildiğinde, şirketin mevcut bilgilerini getir
    api.getCompany(id)
      .then(response => setName(response.data.name))
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.updateCompany(id, { name });
      console.log(response.data);

      // Güncelleme başarılı olursa, formu temizle
      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Edit Company</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditCompany;
