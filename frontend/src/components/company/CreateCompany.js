// frontend/src/components/company/CreateCompany.js
import React, { useState } from 'react';
import api from '../../services/api';

function CreateCompany() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.createCompany({ name });
      console.log(response.data);

      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create Company</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCompany;
