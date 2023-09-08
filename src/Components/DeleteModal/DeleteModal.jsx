import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./DeleteModal.css";
import { del } from "../../ApiCalls/ApiCalls";

const DeleteModal = ({
  handleClose,
  show,
  patientData,
  staffData,
  id,
  patientFields,
  staffFields,
}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleDelete = (id) => {
    if (staffFields === true) {
      config.headers.userId = id;
      del(`/userId`, config).then((res) => {
        console.log(res.data);
        handleClose();
      });
    } else if (patientFields === true) {
      config.headers.mrnNo = id;
      del(`/mrnNo`, config).then((res) => {
        console.log(res.data);
        handleClose()
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton>
          <h4 className="modal-title">Confirm Deletion</h4>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <p className="fs-4">Are you sure you want to delete this user?</p>
          <div className="user-info">
            <div>
              <b>ID:</b> {staffData && staffData.userId}
              {patientData && patientData.mrnNo}
            </div>
            <div>
              <b>Name:</b> {patientData && patientData.firstName}{" "}
              {patientData.lastName}
              {staffData && staffData.userName}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
