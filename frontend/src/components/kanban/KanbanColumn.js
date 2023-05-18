// frontend\src\components\kanban\KanbanColumn.js
import React, { useState, useEffect } from 'react';
import { createTask, getKanbanStages, getUserList, getLoggedInUser } from '../../services/api';
import DraggableCard from './DraggableCard';
import './KanbanColumn.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { isAuthenticated } from '../../utils/auth';

const KanbanColumn = ({ stage = {}, tasks = [], moveCard, deleteTask, updateTask, canMoveTo }) => {
  const [taskName, setTaskName] = useState(''); 
  const [taskDescription, setTaskDescription] = useState(''); 
  const [taskStage, setTaskStage] = useState(''); 
  const [taskAssignee, setTaskAssignee] = useState(''); 
  const [show, setShow] = useState(false);
  const [stages, setStages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadStagesAndUsers = async () => {
      if (!isAuthenticated()) {
        console.error('No logged in user or user has no id');
        return;
      }

      try {
        const loadedStages = await getKanbanStages();
        const loadedUsers = await getUserList();
        const loggedInUser = await getLoggedInUser();

        setStages(loadedStages);
        setUsers(loadedUsers);
        setTaskAssignee(loggedInUser.id);
      } catch (err) {
        console.error(err);
        // Hatayı burada ele alabilirsiniz
      }
    };

    loadStagesAndUsers();
}, []);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    moveCard(cardId, stage.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCreateTask = async () => {
    await createTask({
      title: taskName,
      description: taskDescription,
      stage: taskStage,
      assignee: taskAssignee,
    });
    setTaskName(''); // Görev oluşturulduktan sonra alanları sıfırla
    setTaskDescription('');
    setTaskStage('');
    setTaskAssignee('');
    handleClose();
  };

  return (
    <div className="kanban-column">
      <h2 className="kanban-column-title">{stage?.name}</h2>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>
      <div className="card-container" onDrop={handleDrop} onDragOver={handleDragOver}>
        {tasks.map((task) => (
          <DraggableCard
            key={task.id}
            task={task}
            moveCard={moveCard}
            deleteTask={deleteTask}
            updateTask={updateTask}
            canMoveTo={canMoveTo}
          />
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" placeholder="Enter task name" 
                            value={taskName} 
                            onChange={e => setTaskName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control type="text" placeholder="Enter task description"
                            value={taskDescription} 
                            onChange={e => setTaskDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formTaskStage">
              <Form.Label>Stage</Form.Label>
              <Form.Control as="select" value={taskStage} 
                            onChange={e => setTaskStage(e.target.value)}>
                <option value="">--Select Stage--</option>
                {stages && stages.map(stage => 
                  <option key={stage.id} value={stage.id}>{stage?.name}</option>
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTaskAssignee">
              <Form.Label>Assignee</Form.Label>
              <Form.Control as="select" value={taskAssignee} 
                            onChange={e => setTaskAssignee(e.target.value)}>
                <option value="">--Select Assignee--</option>
                {users && users.map(user => 
                  <option key={user.id} value={user.id}>{user?.name}</option>
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};  

export default KanbanColumn;