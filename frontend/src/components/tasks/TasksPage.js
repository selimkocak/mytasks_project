// frontend/src/components/tasks/TasksPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import { createTask, getTasks, updateTask, deleteTask, getKanbanStages } from '../../services/api';
import './TasksPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskStage, setTaskStage] = useState('');
  const [kanbanStages, setKanbanStages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    loadTasks();
    loadKanbanStages();
  }, []);

  const loadTasks = async () => {
    if (!isAuthenticated()) {
      return;
    }
    try {
      const response = await getTasks();
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  const loadKanbanStages = async () => {
    if (!isAuthenticated()) {
      return;
    }
    try {
      const response = await getKanbanStages();
      if (response.status === 200) {
        setKanbanStages(response.data);
      }
    } catch (error) {
      console.error('Error fetching kanban stages: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      try {
        const response = await updateTask(selectedTask.id, {
          title: taskName,
          description: taskDescription,
          stage: taskStage,
          assignee: 1,
          created_by: 1,
        });
        if (response.status === 200) {
          setSelectedTask(null);
          loadTasks();
        }
      } catch (error) {
        console.error('Error updating task: ', error);
      }
    } else {
      try {
        const response = await createTask({
          title: taskName,
          description: taskDescription,
          stage: taskStage,
          assignee: 1,
          created_by: 1,
        });
        if (response.status === 201) {
          setTaskName('');
          setTaskDescription('');
          setTaskStage('');
          loadTasks();
        }
      } catch (error) {
        console.error('Error creating task: ', error);
      }
    }
  };

  const handleEdit = (task) => {
    setTaskName(task.title);
    setTaskDescription(task.description);
    setTaskStage(task.stage);
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      if (response.status === 200) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <div className="container">
      <h1>Tasks</h1>
<form onSubmit={handleSubmit}>
<div className="mb-3">
<label htmlFor="taskName" className="form-label">
Task name
</label>
<input
type="text"
className="form-control"
id="taskName"
value={taskName}
onChange={(e) => setTaskName(e.target.value)}
/>
</div>
<div className="mb-3">
<label htmlFor="taskDescription" className="form-label">
Task description
</label>
<input
type="text"
className="form-control"
id="taskDescription"
value={taskDescription}
onChange={(e) => setTaskDescription(e.target.value)}
/>
</div>
<div className="mb-3">
<label htmlFor="taskStage" className="form-label">
Task stage
</label>
<select
className="form-select"
id="taskStage"
value={taskStage}
onChange={(e) => setTaskStage(e.target.value)}
>
{kanbanStages.map((stage) => (
<option key={stage.id} value={stage.id}>
{stage.name}
</option>
))}
</select>
</div>
<button type="submit" className="btn btn-primary">
{selectedTask ? 'Update' : 'Create'} Task
</button>
</form>
<ul>
{tasks.map((task) => (
<li key={task.id}>
<h2>{task.title}</h2>
<p>{task.description}</p>
<button
className="btn btn-secondary"
onClick={() => handleEdit(task)}
>
Edit
</button>
<button
className="btn btn-danger"
onClick={() => handleDelete(task.id)}
>
Delete
</button>
</li>
))}
</ul>
</div>
);
};

export default TasksPage;
