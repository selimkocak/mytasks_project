// frontend/src/components/role/UpdateRole.js
import React, { useState, useEffect } from 'react';
import { updateRole, getRoles } from '../../services/api';
import './UpdateRole.css';

function UpdateRole({ roleId }) {
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        fetchRole();
    }, []);

    const fetchRole = async () => {
        try {
            const response = await getRoles();
            const role = response.data.find(role => role.id === roleId);
            setRoleName(role.name);
        } catch (error) {
            console.error("Error fetching role: ", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateRole(roleId, { name: roleName });
            alert('Role updated successfully');
        } catch (error) {
            console.error("Error updating role: ", error);
        }
    };

    return (
        <form className="update-role-form" onSubmit={handleSubmit}>
            <label>
                Role Name:
                <input type="text" value={roleName} onChange={e => setRoleName(e.target.value)} />
            </label>
            <button className="update-button" type="submit">Update Role</button>
        </form>
    );
}

export default UpdateRole;
