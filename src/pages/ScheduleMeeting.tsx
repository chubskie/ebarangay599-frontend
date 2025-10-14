import React, { useState } from 'react';
import ResidentDashboardNav from '../components/ResidentDashboardNav';
import { 
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaEnvelope,
    FaEdit,
    FaTimes,
    FaCheck,
    FaSpinner,
    FaBan,
    FaCheckCircle,
    FaInfoCircle,
    FaUserTie
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

const ScheduleMeeting: React.FC = () => {
    const [activeSection, setActiveSection] = useState('meeting');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedMeetingType, setSelectedMeetingType] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form data
    const [formData, setFormData] = useState({
        meetingType: '',
        preferredDate: '',
        preferredTime: '',
        alternativeDate: '',
        alternativeTime: '',
        subject: '',
        purpose: '',
        attendees: '',
        urgency: 'normal',
        meetingMode: 'in-person',
        contactPreference: 'phone'
    });

    // Sample user data - available for future use
    // const userData = {
    //     fullName: 'Luc Elric Trevecedo',
    //     contactNumber: '0927 993 2190',
    //     email: 'luc.trevecedo@example.com',
    //     address: '0281 Narra Street Old Sta Mesa Manila Barangay 599'
    // };

    // Meetings history
    const [meetings, setMeetings] = useState<Meeting[]>([
        {
            id: 'MTG-2025-001',
            title: 'Barangay Certificate Discussion',
            type: 'Consultation',
            date: 'Oct 15, 2025',
            time: '10:00 AM',
            status: 'confirmed',
            location: 'Barangay Hall - Office of the Captain',
            attendees: ['Barangay Captain', 'Barangay Secretary'],
            purpose: 'Discuss requirements for barangay clearance certificate',
            notes: 'Bring valid ID and proof of residency'
        },
        {
            id: 'MTG-2025-002',
            title: 'Community Complaint Hearing',
            type: 'Hearing',
            date: 'Oct 12, 2025',
            time: '2:00 PM',
            status: 'completed',
            location: 'Barangay Hall - Conference Room',
            attendees: ['Barangay Captain', 'Kagawad Santos', 'Community Relations Officer'],
            purpose: 'Address noise complaint and find resolution'
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

    const meetingTypes = [
        {
            id: 'consultation',
            name: 'General Consultation',
            icon: FaUserTie,
            description: 'Meet with barangay officials for guidance, information, or general concerns',
            duration: '30-45 minutes',
            color: 'bg-blue-500'
        }
    ];

    const handleScheduleMeeting = async () => {
        if (!formData.meetingType || !formData.preferredDate || !formData.preferredTime || !formData.subject || !formData.purpose) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            const newMeeting: Meeting = {
                id: `MTG-2025-${String(meetings.length + 1).padStart(3, '0')}`,
                title: formData.subject,
                type: formData.meetingType,
                date: new Date(formData.preferredDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                time: new Date(`2000-01-01T${formData.preferredTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }),
                status: 'pending',
                location: formData.meetingMode === 'in-person' ? 'Barangay Hall' : 'Online Meeting',
                attendees: formData.attendees ? formData.attendees.split(',').map(a => a.trim()) : [],
                purpose: formData.purpose
            };

            setMeetings([...meetings, newMeeting]);
            setShowScheduleModal(false);
            setFormData({
                meetingType: '',
                preferredDate: '',
                preferredTime: '',
                alternativeDate: '',
                alternativeTime: '',
                subject: '',
                purpose: '',
                attendees: '',
                urgency: 'normal',
                meetingMode: 'in-person',
                contactPreference: 'phone'
            });
            setIsSubmitting(false);
            
            alert('Meeting request submitted successfully! You will receive confirmation within 24 hours.');
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
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'confirmed': return 'text-green-600 bg-green-100';
            case 'completed': return 'text-blue-600 bg-blue-100';
            case 'cancelled': return 'text-red-600 bg-red-100';
            case 'rescheduled': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <FaClock className="w-4 h-4" />;
            case 'confirmed': return <FaCheckCircle className="w-4 h-4" />;
            case 'completed': return <FaCheck className="w-4 h-4" />;
            case 'cancelled': return <FaBan className="w-4 h-4" />;
            case 'rescheduled': return <FaEdit className="w-4 h-4" />;
            default: return <FaClock className="w-4 h-4" />;
        }
    };

    // Utility function for urgency colors - available for future use
    // const getUrgencyColor = (urgency: string) => {
    //     switch (urgency) {
    //         case 'urgent': return 'text-red-600 bg-red-100';
    //         case 'high': return 'text-orange-600 bg-orange-100';
    //         case 'normal': return 'text-blue-600 bg-blue-100';
    //         case 'low': return 'text-gray-600 bg-gray-100';
    //         default: return 'text-gray-600 bg-gray-100';
    //     }
    // };

    // Get today's date for min date validation
    const today = new Date().toISOString().split('T')[0];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <ResidentDashboardNav 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
            />

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
                {/* Header */}
                <header style={{ 
                    backgroundColor: 'white', 
                    padding: '1rem 2rem', 
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaCalendarAlt style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>Schedule a Meeting</span>
                    </div>
                </header>

                {/* Content */}
                <main style={{ flex: 1, padding: '2rem' }}>
                    {/* Page Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ 
                            fontSize: '1.875rem', 
                            fontWeight: 'bold', 
                            color: '#1f2937', 
                            marginBottom: '0.5rem' 
                        }}>
                            Schedule a Meeting
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                            Schedule meetings with Barangay 599 officials for consultations, hearings, and other matters
                        </p>
                    </div>

                    {/* Office Hours Notice */}
                    <div style={{
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <FaInfoCircle style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb', flexShrink: 0 }} />
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.25rem' }}>
                                Office Hours
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#1e3a8a' }}>
                                Monday to Friday: 8:00 AM - 5:00 PM | Saturday: 8:00 AM - 12:00 PM | Sunday: Closed
                            </p>
                        </div>
                    </div>

                    {/* Meeting Types Grid */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            Schedule a Meeting
                        </h2>
                        
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            {meetingTypes.map((type) => {
                                const IconComponent = type.icon;
                                return (
                                    <div
                                        key={type.id}
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '0.75rem',
                                            padding: '1.5rem',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            border: '1px solid #e5e7eb',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                        onClick={() => {
                                            setSelectedMeetingType(type.name);
                                            setFormData({...formData, meetingType: type.name});
                                            setShowScheduleModal(true);
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                            <div style={{
                                                width: '3rem',
                                                height: '3rem',
                                                borderRadius: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '1rem',
                                                backgroundColor: type.color.replace('bg-', '').includes('blue') ? '#dbeafe' :
                                                                 type.color.replace('bg-', '').includes('red') ? '#fee2e2' :
                                                                 type.color.replace('bg-', '').includes('purple') ? '#f3e8ff' :
                                                                 type.color.replace('bg-', '').includes('green') ? '#dcfce7' :
                                                                 type.color.replace('bg-', '').includes('orange') ? '#fed7aa' : '#fef3c7'
                                            }}>
                                                <IconComponent style={{ 
                                                    width: '1.5rem', 
                                                    height: '1.5rem',
                                                    color: type.color.replace('bg-', '').includes('blue') ? '#2563eb' :
                                                           type.color.replace('bg-', '').includes('red') ? '#dc2626' :
                                                           type.color.replace('bg-', '').includes('purple') ? '#7c3aed' :
                                                           type.color.replace('bg-', '').includes('green') ? '#16a34a' :
                                                           type.color.replace('bg-', '').includes('orange') ? '#ea580c' : '#d97706'
                                                }} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                                    {type.name}
                                                </h3>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '0.25rem',
                                                    backgroundColor: '#f3f4f6',
                                                    color: '#6b7280'
                                                }}>
                                                    {type.duration}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                                            {type.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Meetings History */}
                    <div>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            My Meetings
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
                                    <p style={{ color: '#6b7280', fontSize: '1rem' }}>No meetings scheduled yet</p>
                                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                                        Schedule your first meeting using the options above
                                    </p>
                                </div>
                            ) : (
                                <div style={{ overflow: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f9fafb' }}>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Meeting ID
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
                                                <tr key={meeting.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937', fontFamily: 'monospace' }}>
                                                        {meeting.id}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div>
                                                            <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                                                                {meeting.title}
                                                            </div>
                                                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                                                {meeting.type}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div>
                                                            <div style={{ fontSize: '0.875rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                                <FaCalendarAlt style={{ width: '0.75rem', height: '0.75rem' }} />
                                                                {meeting.date}
                                                            </div>
                                                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                                <FaClock style={{ width: '0.75rem', height: '0.75rem' }} />
                                                                {meeting.time}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                            <FaMapMarkerAlt style={{ width: '0.75rem', height: '0.75rem' }} />
                                                            {meeting.location}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '0.375rem',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '500',
                                                            textTransform: 'capitalize'
                                                        }}
                                                        className={getStatusColor(meeting.status)}>
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
                    <div style={{ marginTop: '2rem' }}>
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
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                Schedule {selectedMeetingType}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowScheduleModal(false);
                                    setSelectedMeetingType('');
                                    setFormData({
                                        meetingType: '',
                                        preferredDate: '',
                                        preferredTime: '',
                                        alternativeDate: '',
                                        alternativeTime: '',
                                        purpose: '',
                                        attendees: '',
                                        urgency: 'normal',
                                        meetingMode: 'in-person',
                                        contactPreference: 'phone',
                                        subject: ''
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

                        {/* Form */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            {/* Preferred Date */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Preferred Date *
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    value={formData.preferredDate}
                                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
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

                            {/* Preferred Time */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Preferred Time *
                                </label>
                                <input
                                    type="time"
                                    min="08:00"
                                    max="17:00"
                                    value={formData.preferredTime}
                                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
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
                        </div>

                        {/* Alternative Date and Time */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Alternative Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    value={formData.alternativeDate}
                                    onChange={(e) => setFormData({...formData, alternativeDate: e.target.value})}
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
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Alternative Time (Optional)
                                </label>
                                <input
                                    type="time"
                                    min="08:00"
                                    max="17:00"
                                    value={formData.alternativeTime}
                                    onChange={(e) => setFormData({...formData, alternativeTime: e.target.value})}
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
                        </div>

                        {/* Meeting Mode and Urgency */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Meeting Mode
                                </label>
                                <select
                                    value={formData.meetingMode}
                                    onChange={(e) => setFormData({...formData, meetingMode: e.target.value})}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="in-person">In-Person Meeting</option>
                                    <option value="online">Online Meeting</option>
                                    <option value="phone">Phone Call</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Urgency Level
                                </label>
                                <select
                                    value={formData.urgency}
                                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="normal">Normal Priority</option>
                                    <option value="high">High Priority</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
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
                                placeholder="Enter the subject of your meeting..."
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
                                Purpose of Meeting *
                            </label>
                            <textarea
                                value={formData.purpose}
                                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                                placeholder="Please describe the purpose and agenda of your meeting..."
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        {/* Additional Attendees */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Additional Attendees (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.attendees}
                                onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                                placeholder="Names of other people who should attend (separate with commas)"
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

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowScheduleModal(false);
                                    setSelectedMeetingType('');
                                    setFormData({
                                        meetingType: '',
                                        preferredDate: '',
                                        preferredTime: '',
                                        alternativeDate: '',
                                        alternativeTime: '',
                                        purpose: '',
                                        attendees: '',
                                        urgency: 'normal',
                                        meetingMode: 'in-person',
                                        contactPreference: 'phone',
                                        subject: ''
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
                                disabled={isSubmitting || !formData.preferredDate || !formData.preferredTime || !formData.purpose}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: (!formData.preferredDate || !formData.preferredTime || !formData.purpose || isSubmitting) ? '#9ca3af' : '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: (!formData.preferredDate || !formData.preferredTime || !formData.purpose || isSubmitting) ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isSubmitting && <FaSpinner style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />}
                                {isSubmitting ? 'Scheduling Meeting...' : 'Schedule Meeting'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleMeeting;