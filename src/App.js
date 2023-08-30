import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./DashBoard/AddUser/AddUser";
import Medical from "./DashBoard/Medical/Medical";
import SideNavBar from "./DashBoard/SideNavBar/SideNavBar";
import Patients from "./DashBoard/Patients/Patients";
import Lab from "./DashBoard/Lab/Lab";
import AddPatients from "./DashBoard/AddPatients/AddPatients";
import LabTest from "./Components/LabTest/LabTest";
import PatientsView from "./Components/PatientsView/PatientsView";
import Appointment from "./DashBoard/Appointment/Appointment";
import PatientAppointment from "./Components/PatientAppointment/PatientAppointment";
import FilterPatients from "./DashBoard/FilterPatients/FilterPatients";
import Billing from "./DashBoard/Billing/Billing";
import Report from "./DashBoard/Report/Report";
import Login from "./Auth/Login/Login";
import PatientReport from "./Components/PatientReport/PatientReport";
import MedicinePrescription from "./Components/MedicinePrescription/MedicinePrescription";
import DoctorView from "./DashBoard/DoctorView/DoctorView";
import Stock from "./Components/Stock/Stock";
import AddStock from "./Components/AddStock/AddStock";
import BillingView from "./Components/BillingView/BillingView";
import Admin from "./Auth/Admin/Admin";
import PatientUpdate from "./Auth/Admin/PatientUpdate/PatientUpdate";
import UpdatePatient from "./Auth/Admin/UpdatePatient/UpdatePatient";
import UpdateStaffs from "./Auth/Admin/UpdateStaffs/UpdateStaffs";
import StaffsUpdate from "./Auth/Admin/StaffsUpdate/StaffsUpdate";
import UpdateAppointment from "./Auth/Admin/UpdateAppointment/UpdateAppointment";
import AppointmentUpdate from "./Auth/Admin/UpdateAppointment/AppointmentUpdate/AppointmentUpdate";
import UpdatePerscription from "./Auth/Admin/UpdatePerscription/UpdatePerscription";
import pageNotFound from "./Assets/404.svg"

function App() {
  // Doctor
  // Receptionist
  // Nurse
  // Laboratory
  // Medical
  // Admin

  const role = ["Medical"];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SideNavBar role={role} />}>
          <Route path="/DoctorView" element={<DoctorView role={role} />} />
          <Route
            path="/medicinePrescription/:id"
            element={<MedicinePrescription role={role}/>}
          />
          <Route path="/lab" element={<Lab role={role} />} />
          <Route path="/labTest/:id" element={<LabTest role={role} />} />
          <Route path="/stock" element={<Stock role={role} />} />
          <Route path="/medical" element={<Medical role={role} />} />
          <Route path="/addStock" element={<AddStock role={role} />} />
          <Route path="/patients" element={<Patients role={role} />} />
          <Route path="/adduser" element={<AddUser role={role} />} />
          <Route path="/addpatients" element={<AddPatients role={role} />} />
          <Route path="/appointment" element={<Appointment role={role} />} />
          <Route
            path="/patientAppointment/:id"
            element={<PatientAppointment role={role}/>}
          />
          <Route
            path="/filterPatients"
            element={<FilterPatients role={role} />}
          />
          <Route
            path="/PatientView/:id"
            element={<PatientsView role={role} />}
          />
          <Route
            path="/BillingView/:id"
            element={<BillingView role={role} />}
          />
          <Route
            path="/PatientReport/:id"
            element={<PatientReport role={role} />}
          />
          <Route path="/reports" element={<Report role={role} />} />
          <Route path="/billing" element={<Billing role={role} />} />
          <Route path="/Admin" element={<Admin role={role} />} />
          <Route
            path="/UpdatePatient"
            element={<UpdatePatient role={role} />}
          />
          <Route
            path="/PatientUpdate/:id"
            element={<PatientUpdate role={role} />}
          />
          <Route path="/UpdateStaffs" element={<UpdateStaffs role={role} />} />
          <Route
            path="/StaffsUpdate/:id"
            element={<StaffsUpdate role={role} />}
          />
          <Route
            path="/UpdateAppointment"
            element={<UpdateAppointment role={role} />}
          />
          <Route
            path="/AppointmentUpdate/:id"
            element={<AppointmentUpdate role={role} />}
          />
          <Route
            path="/UpdatePerscription"
            element={<UpdatePerscription role={role} />}
          />

          <Route
            path="*"
            element={
              <div className="accessDenied">
                <img src={pageNotFound} alt="PageNotFound"/>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
