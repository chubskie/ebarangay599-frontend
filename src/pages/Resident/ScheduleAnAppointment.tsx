import React, { useState } from 'react';
import ResidentDashboardNav from '../../components/ResidentDashboardNav';
import {
  FaCalendarAlt,
  FaTimes,
  FaCheck,
  FaSpinner,
  FaBan,
  FaCheckCircle,
  FaInfoCircle,
  FaChevronRight,
} from 'react-icons/fa';

interface Meeting {
  id: string;
  subject: string;
  type: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  location: string;
  purpose: string;
  attendees?: string[];
}

const ScheduleAnAppointment: React.FC = () => {
  const [activeSection, setActiveSection] = useState('appointment');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const [formData, setFormData] = useState({
    meetingWith: '',
    date: '',
    subject: '',
    purpose: '',
  });

  const officials = [
    'Barangay Chairperson',
    'Barangay Secretary',
    'Barangay Treasurer',
    'Barangay Kagawad 1',
    'Barangay Kagawad 2',
    'Barangay Kagawad 3',
    'Barangay Kagawad 4',
    'Barangay Kagawad 5',
    'Barangay Kagawad 6',
    'Barangay Kagawad 7',
    'SK Chairperson',
  ];

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 'MTG-2025-001',
      subject: 'Barangay Certificate Discussion',
      type: 'Meeting with Barangay Secretary',
      date: 'Oct 15, 2025',
      time: '10:00 AM',
      status: 'confirmed',
      location: 'Barangay Hall',
      attendees: ['Barangay Secretary'],
      purpose:
        'Discuss requirements for barangay clearance certificate and validate residency details.',
    },
    {
      id: 'MTG-2025-002',
      subject: 'Budget Planning Meeting',
      type: 'Meeting with Barangay Treasurer',
      date: 'Oct 12, 2025',
      time: '2:00 PM',
      status: 'completed',
      location: 'Barangay Hall',
      attendees: ['Barangay Treasurer'],
      purpose:
        'Review proposed community project budget and finalize allocation for Q4 initiatives.',
    },
  ]);

  const handleScheduleMeeting = () => {
    if (!formData.meetingWith || !formData.date || !formData.subject || !formData.purpose) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newMeeting: Meeting = {
        id: `MTG-2025-${String(meetings.length + 1).padStart(3, '0')}`,
        subject: formData.subject,
        type: `Meeting with ${formData.meetingWith}`,
        date: new Date(formData.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        time: '9:00 AM',
        status: 'pending',
        location: 'Barangay Hall',
        attendees: [formData.meetingWith],
        purpose: formData.purpose,
      };

      setMeetings((m) => [...m, newMeeting]);
      setShowScheduleModal(false);
      setFormData({ meetingWith: '', date: '', subject: '', purpose: '' });
      setIsSubmitting(false);
      alert('Appointment scheduled successfully!');
    }, 900);
  };

  const getStatusColorHex = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'confirmed':
        return '#10b981';
      case 'completed':
        return '#3b82f6';
      case 'cancelled':
        return '#ef4444';
      case 'rescheduled':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FaSpinner style={{ width: '0.85rem', height: '0.85rem' }} className="animate-spin" />;
      case 'confirmed':
        return <FaCheckCircle style={{ width: '0.85rem', height: '0.85rem' }} />;
      case 'completed':
        return <FaCheck style={{ width: '0.85rem', height: '0.85rem' }} />;
      case 'cancelled':
        return <FaBan style={{ width: '0.85rem', height: '0.85rem' }} />;
      case 'rescheduled':
        return <FaInfoCircle style={{ width: '0.85rem', height: '0.85rem' }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <ResidentDashboardNav activeSection={activeSection} setActiveSection={setActiveSection} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        {/* Header bar */}
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
            <FaCalendarAlt style={{ width: '1.1rem', height: '1.1rem', color: '#6b7280' }} />
            <span style={{ fontWeight: 500, color: '#1f2937' }}>Schedule an Appointment</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: '2rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
              Schedule an Appointment
            </h1>
            <p style={{ color: '#6b7280' }}>
              Schedule consultations with Barangay 599 officials for certificates, requests, and community matters.
            </p>
          </div>

          <button
            onClick={() => setShowScheduleModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              marginBottom: '2rem',
              boxShadow: '0 2px 6px rgba(59,130,246,0.25)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            + Schedule New Appointment
          </button>

          {/* Modern & minimal table card */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {meetings.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <FaCalendarAlt style={{ width: '3rem', height: '3rem', color: '#d1d5db' }} />
                <p style={{ color: '#6b7280', marginTop: '1rem' }}>No appointments scheduled yet</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    {['Appointment ID', 'Appointment With', 'Subject', 'Date & Time', 'Status'].map((h) => (
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
                  {meetings.map((m) => {
                    const isOpen = !!expanded[m.id];
                    return (
                      <React.Fragment key={m.id}>
                        {/* Clickable primary row */}
                        <tr
                          role="button"
                          tabIndex={0}
                          aria-expanded={isOpen}
                          onClick={() => toggleExpanded(m.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleExpanded(m.id);
                            }
                          }}
                          style={{
                            borderTop: '1px solid #eef2f7',
                            cursor: 'pointer',
                            backgroundColor: isOpen ? '#fafafa' : 'transparent',
                            transition: 'background-color 150ms ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fbfdff')}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = isOpen ? '#fafafa' : 'transparent')
                          }
                        >
                          <td style={{ padding: '1rem', color: '#1f2937', fontFamily: 'monospace', fontWeight: 400 }}>
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
                              {m.id}
                            </div>
                          </td>

                          {/* Appointment With */}
                          <td style={{ padding: '1rem', fontWeight: 500, color: '#111827' }}>
                            {m.attendees && m.attendees.length > 0 ? m.attendees[0] : 'N/A'}
                          </td>

                          {/* Subject */}
                          <td style={{ padding: '1rem', fontWeight: 400, color: '#111827' }}>
                            <div>
                              <div>{m.subject}</div>
                              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{m.type}</div>
                            </div>
                          </td>

                          <td style={{ padding: '1rem', color: '#374151', fontWeight: 400, whiteSpace: 'nowrap' }}>
                            <div>{m.date}</div>
                            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{m.time}</div>
                          </td>

                          <td style={{ padding: '1rem' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.35rem 0.75rem',
                                borderRadius: '999px',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                backgroundColor: `${getStatusColorHex(m.status)}20`,
                                color: getStatusColorHex(m.status),
                              }}
                            >
                              {getStatusIcon(m.status)}
                              <span style={{ textTransform: 'capitalize' }}>{m.status}</span>
                            </span>
                          </td>
                        </tr>

                        {/* Animated details row */}
                        <tr style={{ backgroundColor: isOpen ? '#fafafa' : 'transparent' }}>
                          <td colSpan={5} style={{ padding: 0 }}>
                            <div
                              style={{
                                maxHeight: isOpen ? 320 : 0,
                                opacity: isOpen ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'max-height 220ms ease, opacity 180ms ease',
                              }}
                            >
                              <div
                                style={{
                                  padding: '0.75rem 1rem 1.25rem 1rem',
                                  borderTop: '1px dashed #e5e7eb',
                                }}
                              >
                                <div style={{ color: '#374151', lineHeight: 1.6 }}>
                                  <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>Appointment Details:</span>
                                  <div style={{ marginTop: '0.25rem' }}>{m.purpose}</div>
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

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
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
              boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>Schedule New Appointment</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
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

            {/* Appointment with */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>Appointment with *</label>
              <select
                value={formData.meetingWith}
                onChange={(e) => setFormData({ ...formData, meetingWith: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                  backgroundColor: 'white',
                }}
              >
                <option value="">Select an official</option>
                {officials.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>Select Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                }}
              />
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

            {/* Appointment Details */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>Appointment Details *</label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                placeholder="Provide details about the purpose and agenda of your appointment..."
                style={{
                  width: '100%',
                  minHeight: 120,
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                onClick={() => setShowScheduleModal(false)}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#374151',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleMeeting}
                disabled={
                  isSubmitting || !formData.meetingWith || !formData.date || !formData.subject || !formData.purpose
                }
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor:
                    isSubmitting || !formData.meetingWith || !formData.date || !formData.subject || !formData.purpose
                      ? '#9ca3af'
                      : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor:
                    isSubmitting || !formData.meetingWith || !formData.date || !formData.subject || !formData.purpose
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                {isSubmitting ? 'Scheduling…' : 'Schedule Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleAnAppointment;
