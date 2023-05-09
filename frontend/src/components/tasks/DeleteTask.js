// frontend\src\components\tasks\DeleteTask.js
import React from "react";

const DeleteTask = (props) => {
    const { taskId } = props;

    const handleDelete = () => {
        // TODO: Görevi silmek için API'ye bir istek gönder
        console.log("Task Deleted:", taskId);
    };

    return (
        <button onClick={handleDelete}>
            Delete Task
        </button>
    );
};

export default DeleteTask;
