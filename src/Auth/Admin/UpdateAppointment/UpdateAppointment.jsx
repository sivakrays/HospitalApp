import React from "react";
import UpdateComponent from "../../../Components/UpdateComponent/UpdateComponent";
import accessDenied from "../../../Assets/Access_Denied.svg";

const UpdateAppointment = (props) => {
  return (
    <>
      {props.role.includes("Admin") ? (
        <div>
          <UpdateComponent path="PatientAppointment" />
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

export default UpdateAppointment;
