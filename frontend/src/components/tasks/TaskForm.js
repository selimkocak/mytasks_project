// frontend/src/components/tasks/TaskForm.js
import React, { useState, useEffect } from 'react';
import { createTask, getKanbanStages, getUserList, getLoggedInUser } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const TaskForm = ({ loadTasks }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStage, setTaskStage] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [stages, setStages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadStagesAndUsers = async () => {
      if (!isAuthenticated()) {
        return;
      }
      try {
        const loggedInUser = await getLoggedInUser();
        const loadedStages = await getKanbanStages();
        const loadedUsers = await getUserList();
        if (Array.isArray(loadedStages)) {
          setStages(loadedStages);
        } else {
          console.error('getKanbanStages did not return an array', loadedStages);
        }
        if (Array.isArray(loadedUsers)) {
          setUsers(loadedUsers);
        } else {
          console.error('getUserList did not return an array', loadedUsers);
        }
        if (loggedInUser) {
          setTaskAssignee(loggedInUser.email);
        }
      } catch (error) {
        console.error('Error loading stages and users:', error);
      }
    };

    loadStagesAndUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask({
        title: taskName,
        description: taskDescription,
        stage: taskStage,
        assignee: taskAssignee,
        // created_by: 1, // Kullanıcı kimliğini doğru değerle değiştirin veya gerekirse kaldırın
      });
      if (response.status === 201) {
        setTaskName('');
        setTaskDescription('');
        setTaskStage('');
        setTaskAssignee('');
        await loadTasks();
      }
    } catch (error) {
      console.error('Error creating task: ', error);
    }
  };

  const handleInputChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit} className="task-form">
      <Form.Group controlId="taskName">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={taskName}
          onChange={(e) => handleInputChange(e, setTaskName)}
        />
      </Form.Group>

      <Form.Group controlId="taskDescription">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          type="text"
          value={taskDescription}
          onChange={(e) => handleInputChange(e, setTaskDescription)}
        />
      </Form.Group>

      <Form.Group controlId="taskStage">
        <Form.Label>Stage:</Form.Label>
        <Form.Select
          value={taskStage}
          onChange={(e) => handleInputChange(e, setTaskStage)}
        >
          <option value="">--Select Stage--</option>
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="taskAssignee">
        <Form.Label>Assignee:</Form.Label>
        <Form.Select
          value={taskAssignee}
          onChange={(e) => handleInputChange(e, setTaskAssignee)}
        >
          <option value="">--Select Assignee--</option>
          {users.map((user) => (
            <option key={user.email} value={user.email}>
              {user.email}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Task
      </Button>
    </Form>
  );
};

export default TaskForm;
