// frontend\src\components\tasks\UpdateTask.js
import React, { useState } from 'react';
import { updateTask } from '../../services/api';

const UpdateTask = ({ task, loadTasks }) => {
  const [taskName, setTaskName] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskStage, setTaskStage] = useState(task.stage);
  const [taskAssignee, setTaskAssignee] = useState(task.assignee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTask(task.id, {
        title: taskName,
        description: taskDescription,
        stage: taskStage,
        assignee: taskAssignee,
        created_by: 1, // Burada gerçek veri kullanmanız gerekmektedir.
      });
      if (response.status === 200) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  const handleInputChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <option value="stage1">Stage 1</option>
          <option value="stage2">Stage 2</option>
          <option value="stage3">Stage 3</option>
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
          <option value="assignee1">Assignee 1</option>
          <option value="assignee2">Assignee 2</option>
          <option value="assignee3">Assignee 3</option>
        </select>
      </label>
      <button type="submit">Update Task</button>
    </form>
  );
};
export default UpdateTask;