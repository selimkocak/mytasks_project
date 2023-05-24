// frontend/src/components/kanban/ListKanbans.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './ListKanbans.css';
import Card from 'react-bootstrap/Card';

function ListKanbans() {
  const [kanbans, setKanbans] = useState([]);

  useEffect(() => {
    const fetchKanbans = async () => {
      try {
        const response = await api.getKanbans();
        if (response.data && Array.isArray(response.data)) { // response.data'nın bir dizi olduğunu doğrula
          const sortedKanbans = response.data.sort((a, b) => a.order - b.order);
          setKanbans(sortedKanbans);
        }
      } catch (error) {
        console.error("Kanban panoları alınırken bir hata oluştu: ", error);
      }
    };

    fetchKanbans();
  }, []);

  return (
    <div className="kanban-list">
      <h2>stage</h2>
      {kanbans.map((kanban) => (
        <Card key={kanban.id} className="kanban-card">
          <Card.Body>
            <Card.Title>{kanban.name}</Card.Title>
            <Card.Text>{kanban.description}</Card.Text>
            <div className="kanban-actions">
              {/* Kanban panosuna gitmek, düzenlemek ve silmek için düğmeler ekleyebilirsin */}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ListKanbans;