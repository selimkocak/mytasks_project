import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { getNotifications, deleteNotification } from '../../services/api';
import './NotificationList.css';

function NotificationList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      alert('Notification deleted successfully');
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification: ', error);
    }
  };

  const columns = [
    {
      dataField: 'user',
      text: 'USER',
      sort: true,
    },
    {
      dataField: 'title',
      text: 'TITLE',
      sort: true,
    },
    {
      dataField: 'created_at',
      text: 'CREATED AT',
      sort: true,
    },
    {
      dataField: 'read',
      text: 'READ',
      sort: true,
      formatter: (cell) => (cell ? 'Yes' : 'No'),
    },
    {
      text: 'ACTIONS',
      formatter: (_, row) => (
        <Button variant="danger" onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="notification-list-container">
      <h2>Notifications</h2>
      <BootstrapTable
        keyField="id"
        data={notifications}
        columns={columns}
        bootstrap4
        striped
        hover
        condensed
      />
    </div>
  );
}

export default NotificationList;
