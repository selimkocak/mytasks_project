// frontend/src/components/kanban/ListKanbans.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './ListKanbans.css';

function ListKanbans() {
  const [kanbans, setKanbans] = useState([]);

  useEffect(() => {
    const fetchKanbans = async () => {
      try {
        const response = await api.getKanbans();
        setKanbans(response.data);
      } catch (error) {
        console.error("Error fetching kanbans: ", error);
      }
    };

    fetchKanbans();
  }, []);

  return (
    <div className="kanban-list">
      <h2>Kanban Panoları</h2>
      {kanbans.map((kanban) => (
        <div key={kanban.id} className="kanban-card">
          <h3>{kanban.name}</h3>
          <p>{kanban.description}</p>
          <div className="kanban-actions">
            {/* Buraya kanban panosuna gitmek, düzenlemek ve silmek için düğmeler ekleyebilirsin */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListKanbans;
