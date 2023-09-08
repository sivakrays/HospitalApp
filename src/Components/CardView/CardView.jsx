import React  from "react";
import "./CardView.css";

const CardView = ({patientName,mrnNo,photo}) => {
  return (
    <>
      <div className="patient__cardView shadow-sm rounded border-0  ">
        <div className="patient__card card p-3">
          <div className="card__img  rounded">
            <img src={photo} alt="" className="rounded " />
          </div>
          <div className="card__details">
            <p className="patient__menno mt-3 fw-lighter">
              MrnNo: {mrnNo}
            </p>
            <p className="patient__name fw-lighter">
              Name: {patientName}
            </p>
          </div>
          <button className="card_btn btn btn-primary btn-block">View</button>
        </div>
      </div>
    </>
  );
};

export default CardView;
