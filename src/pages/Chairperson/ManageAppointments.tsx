import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaSearch, FaSort } from 'react-icons/fa';

type AppointmentStatus = '' | 'Accepted' | 'Declined';

interface Appointment {
  id: number;
  appointmentId: string;
  residentName: string;
  residentUUID: string;
  subject: string;
  appointmentWith: string;
  dateTime: string;
  status: AppointmentStatus;
  purpose: string;
  contactNumber: string;
}

const ManageAppointments: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('manage-appointments');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'All' | AppointmentStatus>('All');

  // Role protection
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || userRole !== 'chairwoman') {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      appointmentId: 'MTG-2025-001',
      residentName: 'Luc Elric Trevecedo',
      residentUUID: '9f47a2d3-8a4b-4d1f-9e9f-1b6a04f0b3c8',
      subject: 'Barangay Certificate Discussion',
      appointmentWith: 'Barangay Secretary',
      dateTime: '2025-10-15T10:00',
      status: 'Accepted',
      purpose: 'Discuss requirements for barangay clearance certificate and validate residency details.',
      contactNumber: '0927 993 2190',
    },
    {
      id: 2,
      appointmentId: 'MTG-2025-002',
      residentName: 'Jewell Asia Batalla',
      residentUUID: '8e36b1c2-7b3a-3c2e-8d8e-0a5b93e9a2b7',
      subject: 'Budget Planning Meeting',
      appointmentWith: 'Barangay Treasurer',
      dateTime: '2025-10-12T14:00',
      status: 'Accepted',
      purpose: 'Review proposed community project budget and finalize allocation for Q4 initiatives.',
      contactNumber: '0915 234 5678',
    },
    {
      id: 3,
      appointmentId: 'MTG-2025-003',
      residentName: 'Maria Santos',
      residentUUID: '7d25a0b1-6a29-2b1d-7c7d-9a4b82d8a1a6',
      subject: 'Community Event Planning',
      appointmentWith: 'Barangay Chairperson',
      dateTime: '2025-10-20T15:00',
      status: '',
      purpose: 'Coordinate upcoming barangay fiesta activities and volunteer assignments.',
      contactNumber: '0916 345 6789',
    },
    {
      id: 4,
      appointmentId: 'MTG-2025-004',
      residentName: 'Juan Dela Cruz',
      residentUUID: '6c14b9a0-5b18-1a0c-6b6c-8a3a71c7a0a5',
      subject: 'Infrastructure Concerns',
      appointmentWith: 'Barangay Kagawad 1',
      dateTime: '2025-10-18T09:00',
      status: '',
      purpose: 'Discuss road repairs and drainage issues in the community.',
      contactNumber: '0917 456 7890',
    },
  ]);

  // Format date for display
  const formatDate = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Filter by search term
  const filteredBySearch = appointments.filter(apt =>
    apt.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.appointmentWith.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by status
  const filteredByStatus = statusFilter === 'All'
    ? filteredBySearch
    : filteredBySearch.filter(apt => apt.status === statusFilter);

  // Sort by date
  const sortedAppointments = [...filteredByStatus].sort((a, b) => {
    const dateA = new Date(a.dateTime).getTime();
    const dateB = new Date(b.dateTime).getTime();
    return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const totalPages = Math.ceil(sortedAppointments.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedAppointments = sortedAppointments.slice(startIndex, endIndex);

  // Handle status change
  const handleStatusChange = (appointmentId: number, newStatus: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === appointmentId ? { ...apt, status: newStatus } : apt)
    );
  };

  // Toggle sort direction
  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Get status style
  const getStatusStyle = (status: AppointmentStatus) => {
    const styles = {
      '': { bg: '#f3f4f6', color: '#6b7280', border: '#d1d5db' },
      'Accepted': { bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' },
      'Declined': { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
    };
    return styles[status];
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <ChairwomanDashboardNav activeSection={activeSection} setActiveSection={setActiveSection} />

      <div style={{ marginLeft: '280px', flex: 1 }}>
        {/* Header */}
        <header style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem 2rem', 
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: 0 
          }}>
            Manage Appointments
          </h1>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280',
            marginTop: '0.25rem',
            marginBottom: 0
          }}>
            Review and manage appointment requests from residents. Accept or decline based on availability.
          </p>
        </header>

        {/* Main Content */}
        <main style={{ padding: '2rem' }}>
          {/* Filters and Search */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <FaSearch
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    width: '1rem',
                    height: '1rem'
                  }}
                />
                <input
                  type="text"
                  placeholder="Search by name, ID, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'All' | AppointmentStatus)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="">Awaiting Response</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              {/* Sort by Date */}
              <div>
                <button
                  onClick={toggleSort}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaSort />
                  Sort by Date ({sortDirection === 'desc' ? 'Newest First' : 'Oldest First'})
                </button>
              </div>

              {/* Entries Per Page */}
              <div>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value={10}>Show 10 entries</option>
                  <option value={25}>Show 25 entries</option>
                  <option value={50}>Show 50 entries</option>
                  <option value={100}>Show 100 entries</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>
                      Appointment ID
                    </th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>
                      Resident Name
                    </th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>
                      Resident UUID
                    </th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>
                      Date & Time
                    </th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    paginatedAppointments.map((apt, index) => (
                      <tr
                        key={apt.id}
                        style={{
                          borderBottom: index !== paginatedAppointments.length - 1 ? '1px solid #f3f4f6' : 'none',
                          transition: 'background-color 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: '#1f2937' }}>
                          {apt.appointmentId}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 500, color: '#1f2937', marginBottom: '0.25rem' }}>
                            {apt.residentName}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                            {apt.subject}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.125rem' }}>
                            with {apt.appointmentWith}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#6b7280' }}>
                          {apt.residentUUID}
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 500 }}>{formatDate(apt.dateTime)}</div>
                          <div style={{ color: '#6b7280', fontSize: '0.8125rem' }}>{formatTime(apt.dateTime)}</div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <select
                            value={apt.status}
                            onChange={(e) => handleStatusChange(apt.id, e.target.value as AppointmentStatus)}
                            style={{
                              padding: '0.375rem 0.625rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              border: `1px solid ${getStatusStyle(apt.status).border}`,
                              backgroundColor: getStatusStyle(apt.status).bg,
                              color: getStatusStyle(apt.status).color,
                              cursor: 'pointer',
                              minWidth: '120px'
                            }}
                          >
                            <option value="">Select Response</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Declined">Declined</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Showing {startIndex + 1} to {Math.min(endIndex, sortedAppointments.length)} of {sortedAppointments.length} appointments
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                      color: currentPage === 1 ? '#9ca3af' : '#374151',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        backgroundColor: currentPage === page ? '#3b82f6' : 'white',
                        color: currentPage === page ? 'white' : '#374151',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: currentPage === page ? 600 : 400
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
                      color: currentPage === totalPages ? '#9ca3af' : '#374151',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageAppointments;
