// frontend/src/pages/TasksPage.js
import React, { useState, useEffect } from 'react';
import { createTask, getTasks, updateTask, deleteTask } from '../../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');  // New state variable for task description
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTask) {
      await updateTask(selectedTask.id, { title: taskName, description: taskDescription });  // Added description field
      setSelectedTask(null);
    } else {
      await createTask({
        title: taskName,
        description: taskDescription,  // Use the value from state variable
        stage: 1, 
        assignee: 1,
        created_by: 1,
      });
    }
    setTaskName('');
    setTaskDescription('');  // Clear the description field after submitting
    loadTasks();
  };

  const handleEdit = (task) => {
    setTaskName(task.title);
    setTaskDescription(task.description);  // Set the task description when editing
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
          onChange={(e) => setTaskDescription(e.target.value)}  // New input field for task description
        />
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
