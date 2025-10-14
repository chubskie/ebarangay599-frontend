import React, { useState } from 'react';
import ResidentDashboardNav from '../components/ResidentDashboardNav';
import { 
    FaCalendarAlt,
    FaTimes,
    FaCheck,
    FaSpinner,
    FaBan,
    FaCheckCircle,
    FaInfoCircle,
    FaEnvelope
} from 'react-icons/fa';

interface Meeting {
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
    location: string;
    attendees: string[];
    purpose: string;
    notes?: string;
}

interface MeetingInvitation {
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    purpose: string;
    status: 'pending' | 'accepted' | 'declined';
    invitedBy: string;
}

const ScheduleAnAppointment: React.FC = () => {
    const [activeSection, setActiveSection] = useState('appointment');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form data
    const [formData, setFormData] = useState({
        meetingWith: '',
        date: '',
        subject: '',
        purpose: ''
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
        'SK Chairperson'
    ];

    // Meetings history
    const [meetings, setMeetings] = useState<Meeting[]>([
        {
            id: 'MTG-2025-001',
            title: 'Barangay Certificate Discussion',
            type: 'Meeting with Barangay Secretary',
            date: 'Oct 15, 2025',
            time: '10:00 AM',
            status: 'confirmed',
            location: 'Barangay Hall',
            attendees: ['Barangay Secretary'],
            purpose: 'Discuss requirements for barangay clearance certificate'
        },
        {
            id: 'MTG-2025-002',
            title: 'Budget Planning Meeting',
            type: 'Meeting with Barangay Treasurer',
            date: 'Oct 12, 2025',
            time: '2:00 PM',
            status: 'completed',
            location: 'Barangay Hall',
            attendees: ['Barangay Treasurer'],
            purpose: 'Discuss community project budget allocation'
        }
    ]);

    // Meeting invitations
    const [meetingInvitations, setMeetingInvitations] = useState<MeetingInvitation[]>([
        {
            id: 'INV-2025-001',
            title: 'Community Development Planning',
            type: 'Planning Meeting',
            date: 'Oct 16, 2025',
            time: '9:00 AM',
            location: 'Barangay Hall - Conference Room',
            organizer: 'Barangay Captain',
            purpose: 'Discuss upcoming community development projects and budget allocation',
            status: 'pending',
            invitedBy: 'Barangay Captain Maria Santos'
        },
        {
            id: 'INV-2025-002',
            title: 'Youth Program Initiative',
            type: 'Committee Meeting',
            date: 'Oct 18, 2025',
            time: '3:00 PM',
            location: 'Barangay Hall - Multi-purpose Room',
            organizer: 'Youth Affairs Committee',
            purpose: 'Plan activities and programs for the youth in the community',
            status: 'pending',
            invitedBy: 'Kagawad Jennifer Cruz'
        }
    ]);

    const handleScheduleMeeting = async () => {
        if (!formData.meetingWith || !formData.date || !formData.subject || !formData.purpose) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            const newMeeting: Meeting = {
                id: `MTG-2025-${String(meetings.length + 1).padStart(3, '0')}`,
                title: formData.subject,
                type: `Meeting with ${formData.meetingWith}`,
                date: new Date(formData.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                time: '9:00 AM', // Default time
                status: 'pending',
                location: 'Barangay Hall',
                attendees: [formData.meetingWith],
                purpose: formData.purpose
            };

            setMeetings([...meetings, newMeeting]);
            setShowScheduleModal(false);
            setFormData({
                meetingWith: '',
                date: '',
                subject: '',
                purpose: ''
            });
            setIsSubmitting(false);
            
            alert('Appointment request submitted successfully! You will receive confirmation within 24 hours.');
        }, 2000);
    };

    // Handle invitation response
    const handleInvitationResponse = (invitationId: string, response: 'accepted' | 'declined') => {
        setMeetingInvitations(prev => 
            prev.map(invitation => 
                invitation.id === invitationId 
                    ? { ...invitation, status: response }
                    : invitation
            )
        );
        
        const invitation = meetingInvitations.find(inv => inv.id === invitationId);
        if (invitation && response === 'accepted') {
            // If accepted, add to meetings list
            const newMeeting: Meeting = {
                id: `MTG-${invitationId.replace('INV-', '')}`,
                title: invitation.title,
                type: invitation.type,
                date: invitation.date,
                time: invitation.time,
                status: 'confirmed',
                location: invitation.location,
                attendees: [invitation.organizer],
                purpose: invitation.purpose
            };
            setMeetings(prev => [...prev, newMeeting]);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#f59e0b';
            case 'confirmed': return '#10b981';
            case 'completed': return '#3b82f6';
            case 'cancelled': return '#ef4444';
            case 'rescheduled': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <FaSpinner style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
            case 'confirmed': return <FaCheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
            case 'completed': return <FaCheck style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
            case 'cancelled': return <FaBan style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
            case 'rescheduled': return <FaInfoCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
            default: return null;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <ResidentDashboardNav activeSection={activeSection} setActiveSection={setActiveSection} />
            
            <div style={{ flex: 1, marginLeft: '16rem' }}>
                <main style={{ padding: '2rem' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                            Schedule an Appointment
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                            Schedule appointments with Barangay 599 officials for consultations and other matters
                        </p>
                    </div>

                    {/* Schedule Appointment Section */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            Schedule an Appointment
                        </h2>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <button
                                onClick={() => setShowScheduleModal(true)}
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.75rem',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2563eb';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#3b82f6';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                Schedule an Appointment
                            </button>
                        </div>
                    </div>

                    {/* My Appointments */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            My Appointments
                        </h2>
                        
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden'
                        }}>
                            {meetings.length === 0 ? (
                                <div style={{ padding: '3rem', textAlign: 'center' }}>
                                    <FaCalendarAlt style={{ width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem' }} />
                                    <p style={{ color: '#6b7280', fontSize: '1rem' }}>No appointments scheduled yet</p>
                                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                                        Schedule your first appointment using the button above
                                    </p>
                                </div>
                            ) : (
                                <div style={{ overflow: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f9fafb' }}>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Appointment ID
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Title
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Date & Time
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Location
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {meetings.map((meeting) => (
                                                <tr key={meeting.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                                                        {meeting.id}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div>
                                                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                                                                {meeting.title}
                                                            </p>
                                                            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                                                                {meeting.type}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                                                        <div>
                                                            <p style={{ margin: '0 0 0.25rem 0' }}>{meeting.date}</p>
                                                            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>{meeting.time}</p>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                                                        {meeting.location}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '0.375rem',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '500',
                                                            textTransform: 'capitalize',
                                                            backgroundColor: `${getStatusColor(meeting.status)}20`,
                                                            color: getStatusColor(meeting.status)
                                                        }}>
                                                            {getStatusIcon(meeting.status)}
                                                            {meeting.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Meeting Invitations */}
                    <div>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            Meeting Invitations
                        </h2>
                        
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden'
                        }}>
                            {meetingInvitations.filter(inv => inv.status === 'pending').length === 0 ? (
                                <div style={{ padding: '3rem', textAlign: 'center' }}>
                                    <FaEnvelope style={{ width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem' }} />
                                    <p style={{ color: '#6b7280', fontSize: '1rem' }}>No pending invitations</p>
                                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                                        You'll see meeting invitations from barangay officials here
                                    </p>
                                </div>
                            ) : (
                                <div style={{ overflow: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f9fafb' }}>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Invitation ID
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Title
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Date & Time
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Invited By
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Response
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {meetingInvitations.filter(inv => inv.status === 'pending').map((invitation) => (
                                                <tr key={invitation.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                                                        {invitation.id}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div>
                                                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                                                                {invitation.title}
                                                            </p>
                                                            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                                                                {invitation.type}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                                                        <div>
                                                            <p style={{ margin: '0 0 0.25rem 0' }}>{invitation.date}</p>
                                                            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>{invitation.time}</p>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                                                        {invitation.invitedBy}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <select
                                                            value={invitation.status}
                                                            onChange={(e) => handleInvitationResponse(invitation.id, e.target.value as 'accepted' | 'declined')}
                                                            style={{
                                                                padding: '0.5rem',
                                                                border: '2px solid #e5e7eb',
                                                                borderRadius: '0.375rem',
                                                                fontSize: '0.75rem',
                                                                backgroundColor: 'white',
                                                                cursor: 'pointer',
                                                                outline: 'none'
                                                            }}
                                                        >
                                                            <option value="pending">Select Response</option>
                                                            <option value="accepted">Accept</option>
                                                            <option value="declined">Decline</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                Schedule an Appointment
                            </h2>
                            <button
                                onClick={() => {
                                    setShowScheduleModal(false);
                                    setFormData({
                                        meetingWith: '',
                                        date: '',
                                        subject: '',
                                        purpose: ''
                                    });
                                }}
                                style={{
                                    backgroundColor: '#f3f4f6',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem',
                                    color: '#6b7280'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Appointment With Dropdown */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Appointment with *
                            </label>
                            <select
                                value={formData.meetingWith}
                                onChange={(e) => setFormData({...formData, meetingWith: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="">Select an official</option>
                                {officials.map((official) => (
                                    <option key={official} value={official}>
                                        {official}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Select Date *
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        {/* Subject */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Subject *
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                placeholder="Enter the subject of your appointment..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Purpose */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Purpose of Appointment *
                            </label>
                            <textarea
                                value={formData.purpose}
                                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                                placeholder="Please describe the purpose and agenda of your appointment..."
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowScheduleModal(false);
                                    setFormData({
                                        meetingWith: '',
                                        date: '',
                                        subject: '',
                                        purpose: ''
                                    });
                                }}
                                disabled={isSubmitting}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    opacity: isSubmitting ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleScheduleMeeting}
                                disabled={isSubmitting || !formData.meetingWith || !formData.date || !formData.subject || !formData.purpose}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: (!formData.meetingWith || !formData.date || !formData.subject || !formData.purpose || isSubmitting) ? '#9ca3af' : '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: (!formData.meetingWith || !formData.date || !formData.subject || !formData.purpose || isSubmitting) ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isSubmitting && <FaSpinner style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />}
                                {isSubmitting ? 'Scheduling Appointment...' : 'Schedule Appointment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleAnAppointment;