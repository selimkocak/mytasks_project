// frontend/src/pages/TasksPage.js
import React, { useState, useEffect } from 'react';
import { createTask, getTasks, updateTask, deleteTask, getKanbanStages } from '../../services/api'; // getKanbanStages'i import ettik
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
    const response = await getTasks();
    setTasks(response.data);
  };

  const loadKanbanStages = async () => {
    const response = await getKanbanStages();
    setKanbanStages(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      await updateTask(selectedTask.id, { title: taskName, description: taskDescription });
      setSelectedTask(null);
    } else {
      await createTask({
        title: taskName,
        description: taskDescription,
        stage: taskStage,
        assignee: 1,
        created_by: 1,
      });
    }
    setTaskName('');
    setTaskDescription('');
    loadTasks();
  };

  const handleEdit = (task) => {
    setTaskName(task.title);
    setTaskDescription(task.description);
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
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
        <select
          value={taskStage}
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
