// frontend/src/components/tasks/TasksPage.js
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { createTask, getTasks, updateTask, deleteTask, getKanbanStages } from '../../services/api';
import './TasksPage.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskStage, setTaskStage] = useState('');
  const [kanbanStages, setKanbanStages] = useState([]);

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
      setTasks(response.data);
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
      setKanbanStages(response.data);
    } catch (error) {
      console.error('Error fetching kanban stages: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      try {
        await updateTask(selectedTask.id, { title: taskName, description: taskDescription, stage: taskStage });
        setSelectedTask(null);
      } catch (error) {
        console.error('Error updating task: ', error);
      }
    } else {
      try {
        await createTask({
          title: taskName,
          description: taskDescription,
          stage: taskStage,
          assignee: 1,
          created_by: 1,
        });
      } catch (error) {
        console.error('Error creating task: ', error);
      }
    }
    setTaskName('');
    setTaskDescription('');
    setTaskStage('');
    loadTasks();
  };

  const handleEdit = (task) => {
    setTaskName(task.title);
    setTaskDescription(task.description);
    setTaskStage(task.stage);
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <select          value={taskStage}
          onChange={(e) => setTaskStage(e.target.value)}
        >
          {kanbanStages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
        <button type="submit">{selectedTask ? 'Update' : 'Create'} Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;

