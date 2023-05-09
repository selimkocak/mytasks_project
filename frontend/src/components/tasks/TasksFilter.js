// frontend\src\components\tasks\TasksFilter.js
import React, { useState } from "react";

const TasksFilter = ({ onFilter }) => {
    const [filter, setFilter] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter(filter);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Filter:
                <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </label>
            <input type="submit" value="Apply Filter" />
        </form>
    );
};

export default TasksFilter;
