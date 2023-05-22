// frontend/src/components/tasks/ListTasks.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../services/api';
import { setTasks } from '../../actions/taskActions';

const ListTasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListTasks;
