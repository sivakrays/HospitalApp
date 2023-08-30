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
import PatientUpdate from "./Auth/Admin/PatientUpdate/PatientUpdate"
import UpdatePatient from "./Auth/Admin/UpdatePatient/UpdatePatient"
import UpdateStaffs from "./Auth/Admin/UpdateStaffs/UpdateStaffs"
import StaffsUpdate from "./Auth/Admin/StaffsUpdate/StaffsUpdate"
import UpdateAppointment from "./Auth/Admin/UpdateAppointment/UpdateAppointment"
import AppointmentUpdate from "./Auth/Admin/UpdateAppointment/AppointmentUpdate/AppointmentUpdate"
import UpdatePerscription from "./Auth/Admin/UpdatePerscription/UpdatePerscription"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SideNavBar />}>
          <Route path="/DoctorView" element={<DoctorView />} />
          <Route
            path="/medicinePrescription/:id"
            element={<MedicinePrescription />}
          />
          <Route path="/lab" element={<Lab />} />
          <Route path="/labTest/:id" element={<LabTest />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/addStock" element={<AddStock />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/addpatients" element={<AddPatients />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route
            path="/patientAppointment/:id"
            element={<PatientAppointment />}
          />
          <Route path="/filterPatients" element={<FilterPatients />} />
          <Route path="/PatientView/:id" element={<PatientsView />} />
          <Route path="/BillingView/:id" element={<BillingView />} />
          <Route path="/PatientReport/:id" element={<PatientReport />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/UpdatePatient" element={<UpdatePatient />}/>
          <Route path="/PatientUpdate/:id" element={<PatientUpdate />}/>
          <Route path="/UpdateStaffs" element={<UpdateStaffs />}/>
          <Route path="/StaffsUpdate/:id" element={<StaffsUpdate />}/>
          <Route path="/UpdateAppointment" element={<UpdateAppointment />}/>
          <Route path="/AppointmentUpdate/:id" element={<AppointmentUpdate />}/>
          <Route path="/UpdatePerscription" element={<UpdatePerscription />}/>
          
          <Route
            path="*"
            element={
              <div className="mt d-flex justify-content-center align-items-center h-75">
                Oops!!! Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
