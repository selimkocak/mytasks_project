// frontend/src/components/role/CreateRole.js
import React, { useState } from 'react';
import { createRole } from '../../services/api';
import './CreateRole.css';

function CreateRole() {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const roleData = { name: name };
        try {
            const response = await createRole(roleData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="create-role-form" onSubmit={handleSubmit}>
            <label>
                Role Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <input className="submit-button" type="submit" value="Submit" />
        </form>
    );
}

export default CreateRole;
