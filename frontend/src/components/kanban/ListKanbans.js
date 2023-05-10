// frontend/src/components/kanban/ListKanbans.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function ListKanbans() {
  const [kanbans, setKanbans] = useState([]);

  useEffect(() => {
    const fetchKanbans = async () => {
      const response = await api.getKanbans();
      setKanbans(response.data);
    };

    fetchKanbans();
  }, []);

  return (
    <div>
      <h2>Kanban Boards</h2>
      {kanbans.map((kanban) => (
        <div key={kanban.id}>
          <h3>{kanban.name}</h3>
          <p>{kanban.description}</p>
          {/* Add buttons to navigate to the kanban board and to edit and delete the kanban board */}
        </div>
      ))}
    </div>
  );
}

export default ListKanbans;
