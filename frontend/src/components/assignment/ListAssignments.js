// frontend/src/components/assignment/ListAssignments.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './ListAssignments.css'; // ListAssignments.css dosyasını içe aktardık

function ListAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAssignments();
        setAssignments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="list-assignments-container"> {/* className ile stil sınıfını ekledik */}
      <h2>List Assignments</h2>
      {assignments.map((assignment) => (
        <div key={assignment.id}>
          <h3>{assignment.title}</h3>
          <p>{assignment.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ListAssignments;
