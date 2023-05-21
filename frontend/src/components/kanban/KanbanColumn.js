// frontend/src/components/kanban/KanbanColumn.js
import React, { useState, useEffect } from 'react';
import { getKanbanStages, apiFunctions } from '../../services/api';
import DraggableCard from './DraggableCard';
import './KanbanColumn.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { isAuthenticated } from '../../utils/auth';

import TaskForm from '../tasks/TaskForm';

const KanbanColumn = ({ stage = {}, tasks = [], moveCard, deleteTask, updateTask, canMoveTo }) => {
  const [show, setShow] = useState(false);
  const [stages, setStages] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const loadStagesAndUserEmail = async () => {
      if (!isAuthenticated()) {
        console.error('No logged in user or user has no id');
        return;
      }

      try {
        const loadedStages = await getKanbanStages();
        const userEmail = await apiFunctions.getLoggedInUserEmail();

        setStages(loadedStages);
        setLoggedInUserEmail(userEmail);
      } catch (err) {
        console.error(err);
        // Handle the error here
      }
    };

    loadStagesAndUserEmail();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadTasks = async () => {
    try {
      await apiFunctions.getTasks();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await apiFunctions.createTask(taskData);
      handleClose();
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="kanban-column">
      <h2 className="kanban-column-title">{stage?.name}</h2>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>
      <div className="card-container">
        {tasks.map((task) => (
          <DraggableCard
            key={task.id}
            task={task}
            moveCard={moveCard}
            deleteTask={deleteTask}
            updateTask={updateTask}
            canMoveTo={canMoveTo}
            loadTasks={loadTasks}
          />
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            stages={stages}
            loggedInUserEmail={loggedInUserEmail}
            createTask={handleCreateTask}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default KanbanColumn;
