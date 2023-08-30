import React from "react";
import PatientAppointment from "../../../../Components/PatientAppointment/PatientAppointment";
import accessDenied from "../../../../Assets/Access_Denied.svg";

const AppointmentUpdate = (props) => {
  return (
    <>
      {props.role.includes("Admin") ? (
        <div>
          <PatientAppointment />
        </div>
      ) : (
        <div className="accessDenied">
          <img src={accessDenied} alt="Access Denied" />
          {/* <p>Access Denied</p> */}
        </div>
      )}
    </>
  );
};

export default AppointmentUpdate;
