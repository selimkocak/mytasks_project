// frontend/src/components/tasks/TasksList.js
import React, { useState, useEffect } from "react";
import TaskItem from './TaskItem';

const TasksList = () => {
    const [tasks, setTasks] = useState([]); // tasks için ayrı bir state oluşturduk
    const [comments, setComments] = useState([]); // comments için ayrı bir state oluşturduk

    useEffect(() => {
        setTasks([
            { id: 1, title: "Task 1", description: "This is task 1" },
            { id: 2, title: "Task 2", description: "This is task 2" },
            // ...
        ]);
        setComments([
            { id: 1, author: "User 1", text: "This is comment 1" },
            { id: 2, author: "User 2", text: "This is comment 2" },
            // ...
          ]);
    }, [setTasks, setComments]); // setTasks ve setComments fonksiyonlarını bağımlılıklar listesine ekledik

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TasksList;
