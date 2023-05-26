// frontend/src/components/tasks/ListTasks.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { isAuthenticated } from '../../utils/auth';
import { loadTasks } from '../../services/api';
import { setTasks } from '../../actions/taskActions';

const ListTasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const authenticated = isAuthenticated();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await loadTasks();
        dispatch(setTasks(data));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <div>
      <h2>Tasks</h2>
      {authenticated ? ( 
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Stage</th>
              <th>Assignee</th>
              <th>Created By</th>
              <th>Create Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.stage}</td>
                <td>{task.assignee}</td>
                <td>{task.created_by}</td>
                <td>{task.create_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Please log in to view tasks.</p> 
      )}
    </div>
  );
};

export default ListTasks;
