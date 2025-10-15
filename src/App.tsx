import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Resident/Dashboard';
import ChairwomanDashboard from './pages/Chairperson/ChairwomanDashboard';
import RequestDocument from './pages/Resident/RequestDocument';
import ReportIncident from './pages/Resident/ReportIncident';
import ScheduleAnAppointment from './pages/Resident/ScheduleAnAppointment';
import MyBarangayID from './pages/Resident/MyBarangayID';
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
      <Route path="/request-document" element={<RequestDocument />} />
      <Route path="/report-incident" element={<ReportIncident />} />
      <Route path="/schedule-an-appointment" element={<ScheduleAnAppointment />} />
      <Route path="/my-barangay-id" element={<MyBarangayID />} />
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
