// frontend/src/components/role/DeleteRole.js
import React from 'react';
import { deleteRole } from '../../services/api';

function DeleteRole({ roleId, afterDelete }) {
    const handleDelete = async () => {
        try {
            await deleteRole(roleId);
            afterDelete(roleId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete Role
        </button>
    );
}

export default DeleteRole;
