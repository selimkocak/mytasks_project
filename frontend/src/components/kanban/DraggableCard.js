import React, { useState, useEffect } from 'react';
import { getTask} from '../../services/api';
import TaskItem from '../tasks/TaskItem';
import DeleteTask from '../tasks/DeleteTask';
import UpdateTask from '../tasks/UpdateTask';
import { sortTasksByCreateDate } from '../../actions/sortActions';
import './DraggableCard.css';

const DraggableCard = ({ task, moveCard, loadTasks }) => {
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [taskCreator, setTaskCreator] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(task.id);
        if (response.status === 200) {
          setCurrentTask(response.data);
          setTaskCreator(response.data.created_by);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [task.id]);


  useEffect(() => {
    const fetchTaskCreator = async () => {
      try {
        const response = await setTaskCreator(task.id);
        if (response.status === 200) {
          setTaskCreator(response.data);
        }
      } catch (error) {
        console.error('Error fetching task creator:', error);
      }
    };
  
    fetchTaskCreator();
  }, [task.id]);
  

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text');
    moveCard(cardId, stageId);
  };

  const handleUpdateTask = () => {
    setIsEditing(true);
  };

  const handleCloseUpdateTask = () => {
    setIsEditing(false);
  };

  if (!currentTask) {
    return <div>Loading...</div>;
  }

  const sortedTasks = sortTasksByCreateDate([currentTask]);

  return (
    <div
      className="card draggable-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, currentTask.stage)}
    >
      <TaskItem task={sortedTasks[0]} taskId={task.id} creator={taskCreator} />
    
      <div className="card-footer">
      <p>{currentTask.id}</p>
       <p>{taskCreator && taskCreator.first_name}</p>
        <div className="card-footer-buttons">
          <DeleteTask id={task.id} loadTasks={loadTasks} />
          <button className="btn btn-primary" onClick={handleUpdateTask}>
            Edit
          </button>
        </div>
      </div>
      {isEditing && (
        <UpdateTask
          task={sortedTasks[0]}
          taskId={currentTask.id}
          handleCloseModal={handleCloseUpdateTask}
        />
      )}
    </div>
  );
};

export default DraggableCard;
