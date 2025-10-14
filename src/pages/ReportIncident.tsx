import React, { useState } from 'react';
import ResidentDashboardNav from '../components/ResidentDashboardNav';
import {
  FaExclamationCircle,
  FaTimes,
  FaCheck,
  FaSpinner,
  FaFileAlt,
  FaClock,
  FaChevronRight,
  FaUserShield,
} from 'react-icons/fa';

interface IncidentReport {
  id: string;
  type: string;
  subject: string;
  details?: string;               // Incident narrative
  assigned?: string[];            // Assigned barangay officials (Kagawad, Tanod, etc.)
  status: 'submitted' | 'investigating' | 'resolved' | 'closed' | 'in progress';
  reportDate: string;
  location: string;
}

const ReportIncident: React.FC = () => {
  const [activeSection, setActiveSection] = useState('incident');
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (id: string) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // Form data (unchanged – assignment is done by officials later)
  const [formData, setFormData] = useState({
    incidentType: '',
    subject: '',
    details: '',
    location: '',
  });

  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([
    {
      id: 'INC-2025-001',
      type: 'Community Concern',
      subject: 'Noise Complaint at Block 5',
      details: 'Loud music past midnight for three consecutive nights.',
      assigned: ['Barangay Kagawad – J. Santos'],
      status: 'investigating',
      reportDate: 'Oct 10, 2025',
      location: 'Block 5, Zone 59',
    },
    {
      id: 'INC-2025-002',
      type: 'Blotter',
      subject: 'Minor Theft Incident',
      details: 'Bicycle reported missing outside Narra St. sari-sari store.',
      assigned: ['Barangay Tanod – R. Cruz'],
      status: 'resolved',
      reportDate: 'Oct 08, 2025',
      location: 'Narra Street',
    },
    {
      id: 'INC-2025-003',
      type: 'VAWC',
      subject: 'Domestic Dispute Report',
      details: 'Repeated shouting and disturbance reported by neighbors.',
      assigned: ['VAWC Desk Officer – M. Dela Peña', 'Barangay Kagawad – P. Reyes'],
      status: 'in progress',
      reportDate: 'Oct 05, 2025',
      location: 'Molave St.',
    },
  ]);

  const incidentTypes = ['Community Concern', 'Blotter', 'VAWC'];

  const handleSubmitReport = async () => {
    if (!formData.incidentType || !formData.subject || !formData.details || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newReport: IncidentReport = {
        id: `INC-2025-${String(incidentReports.length + 1).padStart(3, '0')}`,
        type: formData.incidentType,
        subject: formData.subject,
        details: formData.details,
        assigned: [], // starts unassigned
        status: 'submitted',
        reportDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        location: formData.location,
      };
      setIncidentReports(prev => [...prev, newReport]);
      setShowReportModal(false);
      setFormData({ incidentType: '', subject: '', details: '', location: '' });
      setIsSubmitting(false);
      alert('Incident report submitted successfully!');
    }, 1200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':     return '#2563eb';
      case 'investigating': return '#f59e0b';
      case 'in progress':   return '#3b82f6';
      case 'resolved':      return '#10b981';
      case 'closed':        return '#6b7280';
      default:              return '#9ca3af';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':     return <FaFileAlt style={{ width: '0.9rem', height: '0.9rem' }} />;
      case 'investigating': return <FaSpinner style={{ width: '0.9rem', height: '0.9rem' }} className="animate-spin" />;
      case 'in progress':   return <FaClock style={{ width: '0.9rem', height: '0.9rem' }} />;
      case 'resolved':      return <FaCheck style={{ width: '0.9rem', height: '0.9rem' }} />;
      case 'closed':        return <FaCheck style={{ width: '0.9rem', height: '0.9rem' }} />;
      default:              return <FaFileAlt style={{ width: '0.9rem', height: '0.9rem' }} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <ResidentDashboardNav activeSection={activeSection} setActiveSection={setActiveSection} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: 'white',
            padding: '1rem 2rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaExclamationCircle style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
            <span style={{ fontWeight: 500, color: '#1f2937' }}>Incident Reports</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>
            Incident Reports
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            View and submit incident reports such as community concerns, blotters, or VAWC cases.
          </p>

          <button
            onClick={() => setShowReportModal(true)}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              marginBottom: '2rem',
            }}
          >
            + Submit New Report
          </button>

          {/* Card/Table */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {incidentReports.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <FaExclamationCircle style={{ width: '3rem', height: '3rem', color: '#d1d5db' }} />
                <p style={{ color: '#6b7280', marginTop: '1rem' }}>No incident reports found</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    {['Report ID', 'Incident Type', 'Subject', 'Location', 'Status', 'Report Date'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '1rem',
                          textAlign: 'left',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          color: '#374151',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {incidentReports.map((r) => {
                    const isOpen = !!expanded[r.id];
                    return (
                      <React.Fragment key={r.id}>
                        {/* Clickable row */}
                        <tr
                          role="button"
                          tabIndex={0}
                          aria-expanded={isOpen}
                          onClick={() => toggleExpanded(r.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleExpanded(r.id);
                            }
                          }}
                          style={{
                            borderTop: '1px solid #e5e7eb',
                            cursor: 'pointer',
                            backgroundColor: isOpen ? '#fafafa' : 'transparent',
                            transition: 'background-color 150ms ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fbfdff')}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = isOpen ? '#fafafa' : 'transparent')
                          }
                        >
                          <td style={{ padding: '1rem', color: '#1f2937', fontFamily: 'monospace' }}>{r.id}</td>

                          <td style={{ padding: '1rem', color: '#1f2937' }}>{r.type}</td>

                          {/* Subject + chevron */}
                          <td style={{ padding: '1rem', color: '#111827' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <FaChevronRight
                                style={{
                                  width: '0.85rem',
                                  height: '0.85rem',
                                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                  transition: 'transform 160ms ease',
                                  color: '#6b7280',
                                  flexShrink: 0,
                                }}
                              />
                              <div>{r.subject}</div>
                            </div>
                          </td>

                          <td style={{ padding: '1rem', color: '#6b7280' }}>{r.location}</td>

                          <td style={{ padding: '1rem' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '999px',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                backgroundColor: `${getStatusColor(r.status)}20`,
                                color: getStatusColor(r.status),
                              }}
                            >
                              {getStatusIcon(r.status)}
                              {r.status}
                            </span>
                          </td>

                          <td style={{ padding: '1rem', color: '#1f2937' }}>{r.reportDate}</td>
                        </tr>

                        {/* Expanded details */}
                        <tr style={{ backgroundColor: isOpen ? '#fafafa' : 'transparent' }}>
                          <td colSpan={6} style={{ padding: 0 }}>
                            <div
                              style={{
                                maxHeight: isOpen ? 320 : 0,
                                opacity: isOpen ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'max-height 220ms ease, opacity 180ms ease',
                              }}
                            >
                              <div style={{ padding: '0.75rem 1rem 1.25rem 1rem', borderTop: '1px dashed #e5e7eb' }}>
                                {/* Details */}
                                <div style={{ color: '#374151', lineHeight: 1.6 }}>
                                  <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>Incident Details:</span>
                                  <div style={{ marginTop: '0.25rem' }}>{r.details || '—'}</div>
                                </div>

                                {/* Assigned officials */}
                                <div style={{ marginTop: '0.75rem', color: '#374151' }}>
                                  <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                                    Assigned Barangay Official(s):
                                  </span>
                                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                                    {r.assigned && r.assigned.length > 0 ? (
                                      r.assigned.map((name) => (
                                        <span
                                          key={name}
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '999px',
                                            backgroundColor: '#e5e7eb',
                                            color: '#374151',
                                            fontSize: '0.8rem',
                                          }}
                                        >
                                          <FaUserShield style={{ width: '0.8rem' }} />
                                          {name}
                                        </span>
                                      ))
                                    ) : (
                                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Unassigned yet</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>Submit New Report</h2>
              <button
                onClick={() => setShowReportModal(false)}
                style={{
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  color: '#6b7280',
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Incident Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>Incident Type *</label>
              <select
                value={formData.incidentType}
                onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                <option value="">Select type</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>Subject *</label>
              <input
                type="text"
                placeholder="Enter subject..."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                }}
              />
            </div>

            {/* Incident Details (narrative) */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>Incident Details *</label>
              <textarea
                placeholder="Provide a clear narrative of what happened (who, what, when, where, and any actions taken)..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Location */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>Location *</label>
              <input
                type="text"
                placeholder="Enter location..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => setShowReportModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                disabled={!formData.incidentType || !formData.subject || !formData.details || !formData.location || isSubmitting}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor:
                    !formData.incidentType || !formData.subject || !formData.details || !formData.location
                      ? '#9ca3af'
                      : '#dc2626',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor:
                    !formData.incidentType || !formData.subject || !formData.details || !formData.location
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportIncident;
