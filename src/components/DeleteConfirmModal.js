import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmModal = ({ show, onHide, onConfirm, error }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this item?
    </Modal.Body>
  </Modal>
);

export default DeleteConfirmModal;