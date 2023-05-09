// frontend\src\components\tasks\CreateTask.js
import React, { useState } from "react";

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Form verilerini backend'e gönder
        console.log("Task Created:", { title, description });
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
            <input type="submit" value="Create Task" />
        </form>
    );
};

export default CreateTask;
