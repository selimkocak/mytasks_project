// frontend/src/actions/taskActions.js
export const setTasks = (tasks) => {
    return {
      type: 'SET_TASKS',
      payload: tasks,
    };
  };
  
  export const addTask = (task) => {
    return {
      type: 'ADD_TASK',
      payload: task,
    };
  };
  
  export const updateTask = (task) => {
    return {
      type: 'UPDATE_TASK',
      payload: task,
    };
  };
  
  export const deleteTask = (taskId) => {
    return {
      type: 'DELETE_TASK',
      payload: taskId,
    };
  };
  