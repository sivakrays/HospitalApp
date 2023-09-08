import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import pageNotFound from "./Assets/404.svg";
import CardView from "./Components/CardView/CardView";
import { useContext } from "react";
import { AuthContext } from "./Context/authContext";

function App() {

  const {currentUser} = useContext(AuthContext)


  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to={'/'}/>
    }
    return children
  }

  // Doctor
  // Receptionist
  // Nurse
  // Laboratory
  // Medical
  // Admin
  const role = currentUser && currentUser.roles
  // const role = ["Admin"];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/cardView" element={<ProtectedRoute><CardView /></ProtectedRoute>} />
        <Route element={<ProtectedRoute><SideNavBar role={role} /></ProtectedRoute>}>
          <Route path="/DoctorView" element={<ProtectedRoute><DoctorView role={role} /></ProtectedRoute>} />
          <Route
            path="/medicinePrescription/:id"
            element={<ProtectedRoute><MedicinePrescription role={role} /></ProtectedRoute>}
          />
          <Route path="/lab" element={<ProtectedRoute><Lab role={role} /></ProtectedRoute>} />
          <Route path="/labTest/:id" element={<ProtectedRoute><LabTest role={role} /></ProtectedRoute>} />
          <Route path="/stock" element={<ProtectedRoute><Stock role={role} /></ProtectedRoute>} />
          <Route path="/medical" element={<ProtectedRoute><Medical role={role} /></ProtectedRoute>} />
          <Route path="/addStock" element={<ProtectedRoute><AddStock role={role} /></ProtectedRoute>} />
          <Route path="/patients" element={<ProtectedRoute><Patients role={role} /></ProtectedRoute>} />
          <Route path="/adduser" element={<ProtectedRoute><AddUser role={role} /></ProtectedRoute>} />
          <Route path="/addpatients" element={<ProtectedRoute><AddPatients role={role} /></ProtectedRoute>} />
          <Route path="/appointment" element={<ProtectedRoute><Appointment role={role} /></ProtectedRoute>} />
          <Route
            path="/patientAppointment/:id"
            element={<ProtectedRoute><PatientAppointment role={role} /></ProtectedRoute>}
          />
          <Route
            path="/filterPatients"
            element={<ProtectedRoute><FilterPatients role={role} /></ProtectedRoute>}
          />
          <Route
            path="/PatientView/:id"
            element={<ProtectedRoute><PatientsView role={role} /></ProtectedRoute>}
          />
          <Route
            path="/BillingView/:id"
            element={<ProtectedRoute> <BillingView role={role} /></ProtectedRoute>}
          />
          <Route
            path="/PatientReport/:id"
            element={<ProtectedRoute><PatientReport role={role} /></ProtectedRoute>}
          />
          <Route path="/reports" element={<ProtectedRoute><Report role={role} /></ProtectedRoute>} />
          <Route path="/billing" element={<ProtectedRoute><Billing role={role} /></ProtectedRoute>} />
          <Route path="/Admin" element={<ProtectedRoute><Admin role={role} /></ProtectedRoute>} />
          <Route
            path="/UpdatePatient"
            element={<ProtectedRoute><UpdatePatient role={role} /></ProtectedRoute>}
          />
          <Route
            path="/PatientUpdate/:id"
            element={<ProtectedRoute><PatientUpdate role={role} /></ProtectedRoute>}
          />
          <Route path="/UpdateStaffs" element={<ProtectedRoute><UpdateStaffs role={role} /></ProtectedRoute>} />
          <Route
            path="/StaffsUpdate/:id"
            element={<ProtectedRoute><StaffsUpdate role={role} /></ProtectedRoute>}
          />
          <Route
            path="/UpdateAppointment"
            element={<ProtectedRoute><UpdateAppointment role={role} /></ProtectedRoute>}
          />
          <Route
            path="/AppointmentUpdate/:id"
            element={<ProtectedRoute><AppointmentUpdate role={role} /></ProtectedRoute>}
          />
          <Route
            path="/UpdatePerscription"
            element={<ProtectedRoute><UpdatePerscription role={role} /></ProtectedRoute>}
          />

          <Route
            path="*"
            element={
              <div className="accessDenied">
                <img src={pageNotFound} alt="PageNotFound" />
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
