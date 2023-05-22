// frontend\src\components\tasks\TaskForm.js
import React, { useState, useEffect } from 'react';
import { createTask, getKanbanStages, getUserList, getLoggedInUser } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';
import './TaskForm.css';

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

      }
      if (response.status === 201) {
        await loadTasks; // Görevlerin yeniden yüklenmesi için loadTasks fonksiyonunu çağırın
      }
  
    } catch (error) {
      console.error('Error creating task: ', error);
    }
  };

  const handleInputChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>
        Title:
        <input
          type="text"
          name="taskName"
          value={taskName}
          onChange={(e) => handleInputChange(e, setTaskName)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="taskDescription"
          value={taskDescription}
          onChange={(e) => handleInputChange(e, setTaskDescription)}
        />
      </label>
      <label>
        Stage:
        <select
          name="taskStage"
          value={taskStage}
          onChange={(e) => handleInputChange(e, setTaskStage)}
        >
          <option value="">--Select Stage--</option>
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Assignee:
        <select
          name="taskAssignee"
          value={taskAssignee}
          onChange={(e) => handleInputChange(e, setTaskAssignee)}
        >
          <option value="">--Select Assignee--</option>
          {users.map((user) => (
            <option key={user.email} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
