// frontend\src\components\tasks\UpdateTask.js
import React, { useState, useEffect } from 'react';
import { updateTask, getKanbanStages, getUserList, getLoggedInUserEmail } from '../../services/api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateTask = ({ task, taskId, handleCloseModal, loadTasks }) => {
  const [taskName, setTaskName] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskStage, setTaskStage] = useState(task.stage);
  const [taskAssignee] = useState(task.assignee);
  const [stages, setStages] = useState([]);
  const [, setUsers] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const loadStagesAndUsers = async () => {
      try {
        const loadedStages = await getKanbanStages();
        const loadedUsers = await getUserList();
        const userEmail = await getLoggedInUserEmail();

        setStages(loadedStages);
        setUsers(loadedUsers);
        setLoggedInUserEmail(userEmail);
      } catch (err) {
        console.error(err);
        // Hata durumunu burada ele alabilirsiniz
      }
    };

    loadStagesAndUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await updateTask(taskId, {
        title: taskName,
        description: taskDescription,
        stage: taskStage,
        assignee: taskAssignee,
      });
      if (response.status === 200) {
        handleCloseModal();
        await loadTasks(taskId);
      }
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTaskStage">
            <Form.Label>Stage</Form.Label>
            <Form.Control as="select" value={taskStage} onChange={(e) => setTaskStage(e.target.value)}>
              <option value="">--Select Stage--</option>
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage?.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formTaskAssignee">
            <Form.Label>Assignee</Form.Label>
            <Form.Control
              type="email"
              defaultValue={loggedInUserEmail}
              value={loggedInUserEmail}
              onChange={(e) => setLoggedInUserEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit">Update Task</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTask;
