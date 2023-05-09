// frontend\src\components\tasks\TasksList.js
import React, { useState, useEffect } from "react";
import TaskItem from './TaskItem';

const TasksList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // TODO: API isteği yap ve görev listesini al
        // Örnek olarak statik bir liste kullanıyoruz
        setTasks([
            { id: 1, title: "Task 1", description: "This is task 1" },
            { id: 2, title: "Task 2", description: "This is task 2" },
            // ...
        ]);
    }, []);

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TasksList;
