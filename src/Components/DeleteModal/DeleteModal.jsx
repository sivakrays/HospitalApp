import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./DeleteModal.css";
import { del } from "../../ApiCalls/ApiCalls";
import { ToastContainer, toast } from "react-toastify";
import accessDenied from "../../Assets/Access_Denied.svg";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({
  handleClose,
  show,
  patientData,
  staffData,
  appointmentData,
  id,
  patientFields,
  staffFields,
  appointmentFields,
}) => {
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(id);

  // Handle Delete Function

  const notify = () => {
    toast.success("Data Deleted Successfully", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleDelete = (id) => {
    if (staffFields === true) {
      config.headers.userId = id;
      del(`/userId`, config).then((res) => {
        console.log(res.data);
        handleClose();
        notify();
        setTimeout(() => {
          window.location.reload();
          // navigate("/UpdateAppointment");
        }, 500);
      });
    } else if (patientFields === true) {
      config.headers.mrnNo = id;
      del(`/mrnNo`, config).then((res) => {
        console.log(res.data);
        handleClose();
        notify();
        setTimeout(() => {
          window.location.reload();
          // navigate("/UpdateAppointment");
        }, 500);
      });
    } else if (appointmentFields === true) {
      config.headers.appointmentId =
        appointmentData[0] && appointmentData[0].appointmentId;
      del(`/appointmentId`, config).then((res) => {
        console.log(res.data);
        notify();
        setTimeout(() => {
          window.location.reload();
          // navigate("/UpdateAppointment");
        }, 1000);
      });
    }
  };

  console.log(
    "AppointmentId",
    appointmentData[0] && appointmentData[0].appointmentId
  );
  console.log("appointmentFields", appointmentFields);
  console.log("patientFields", patientFields);
  console.log("staffFields", staffFields);

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
              {appointmentData[0] && appointmentData[0].appointmentId}
            </div>
            <div>
              <b>Name:</b> {patientData && patientData.firstName}{" "}
              {patientData.lastName}
              {staffData && staffData.userName}
              {appointmentData[0] &&
                appointmentData[0].patient.firstName +
                  " " +
                  appointmentData[0].patient.lastName}
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

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DeleteModal;
