// frontend/src/components/comments/CreateComment.js
import React, { useState, useEffect } from 'react';
import { createComment } from '../../services/api';
import { isRequired } from '../../utils/validation';
import { getLoggedInUserEmail } from '../../services/api';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateComment = ({ taskId, taskTitle, onCommentCreated }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await getLoggedInUserEmail();
        setUserEmail(email);
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isRequired(commentText)) {
      setError('Comment text is required');
      return;
    }

    try {
      const response = await createComment({
        task: taskId,
        user: userEmail,
        content: commentText,
      });

      setCommentText('');
      setError('');
      onCommentCreated(response);
      handleModalClose();
    } catch (error) {
      setError('Error creating comment');
    }
  };

  return (
    <>
      <Button variant="light" onClick={handleModalOpen}>
        💬
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUser">
              <Form.Label>User</Form.Label>
              <Form.Control type="text" value={userEmail} disabled />
            </Form.Group>

            <Form.Group controlId="formTask">
              <Form.Label>Task</Form.Label>
              <Form.Control type="text" value={taskTitle} disabled />
            </Form.Group>

            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Form.Group>

            {error && <p className="error-message">{error}</p>}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateComment;
