// frontend\src\components\tasks\EditTask.js
import React, { useState } from "react";

const EditTask = (props) => {
    const { task } = props;

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Form verilerini backend'e gönder
        console.log("Task Edited:", { title, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <input type="submit" value="Edit Task" />
        </form>
    );
};

export default EditTask;
