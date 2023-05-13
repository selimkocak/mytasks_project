// frontend/src/components/role/ListRoles.js
import React, { useEffect, useState } from 'react';
import { getRoles } from '../../services/api';
import DeleteRole from './DeleteRole';
import './ListRoles.css';

function ListRoles() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await getRoles();
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles: ", error);
        }
    };

    const handleDelete = (deletedRoleId) => {
        setRoles(roles.filter(role => role.id !== deletedRoleId));
    };

    return (
        <div className="role-list">
            <h2>Role List</h2>
            {roles.map(role => (
                <div key={role.id} className="role-item">
                    <h3>{role.name}</h3>
                    <DeleteRole roleId={role.id} afterDelete={handleDelete} />
                </div>
            ))}
        </div>
    );
}

export default ListRoles;
