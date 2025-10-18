import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Resident/Dashboard';
import ChairwomanDashboard from './pages/Chairperson/ChairwomanDashboard';
import ResidentManagement from './pages/Chairperson/ResidentManagement';
import BarangayAccessManagement from './pages/Chairperson/BarangayAcessManagement';
import IncidentReportsManagement from './pages/Chairperson/IncidentReportsManagement';
import CreateClearancePermits from './pages/Chairperson/CreateClearancePermits';
import ComposeMessage from './pages/Chairperson/ComposeMessage';
import CreateAnnouncementEvents from './pages/Chairperson/CreateAnnouncementEvents';
import BarangayTransactions from './pages/Chairperson/BarangayTransactions';
import ManageAppointments from './pages/Chairperson/ManageAppointments';
import ReportIncidentChairperson from './pages/Chairperson/ReportIncident';
import MyBarangayIDChairperson from './pages/Chairperson/MyBarangayID';
import RequestDocument from './pages/Resident/RequestDocument';
import ReportIncidentResident from './pages/Resident/ReportIncident';
import MyBarangayIDResident from './pages/Resident/MyBarangayID';
import ScheduleAnAppointment from './pages/Resident/ScheduleAnAppointment';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chairwoman-dashboard" element={<ChairwomanDashboard />} />
      <Route path="/resident-management" element={<ResidentManagement />} />
      <Route path="/barangay-access-management" element={<BarangayAccessManagement />} />
      <Route path="/incident-reports-management" element={<IncidentReportsManagement />} />
      <Route path="/create-clearance-permits" element={<CreateClearancePermits />} />
      <Route path="/compose-message" element={<ComposeMessage />} />
      <Route path="/create-announcement-events" element={<CreateAnnouncementEvents />} />
      <Route path="/barangay-transactions" element={<BarangayTransactions />} />
      <Route path="/manage-appointments" element={<ManageAppointments />} />
      
      {/* Chairperson Routes */}
      <Route path="/chairperson/report-incident" element={<ReportIncidentChairperson />} />
      <Route path="/chairperson/my-barangay-id" element={<MyBarangayIDChairperson />} />
      
      {/* Resident Routes */}
      <Route path="/resident/report-incident" element={<ReportIncidentResident />} />
      <Route path="/resident/my-barangay-id" element={<MyBarangayIDResident />} />
      <Route path="/request-document" element={<RequestDocument />} />
      <Route path="/schedule-an-appointment" element={<ScheduleAnAppointment />} />
      
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
