// frontend/src/components/role/DeleteRole.js
import React from 'react';
import { deleteRole } from '../../services/api';
import './DeleteRole.css';

function DeleteRole({ roleId, afterDelete }) {
    const handleDelete = async () => {
        try {
            await deleteRole(roleId);
            afterDelete(roleId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button className="delete-role-button" onClick={handleDelete}>
            Delete Role
        </button>
    );
}

export default DeleteRole;
