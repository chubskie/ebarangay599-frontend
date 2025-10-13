import React, { useState } from 'react';
import ResidentDashboardNav from '../components/ResidentDashboardNav';
import { 
    FaExclamationCircle,
    FaTimes,
    FaCheck,
    FaSpinner,
    FaEye,
    FaFileAlt,
    FaShieldAlt,
    FaFire,
    FaCarCrash,
    FaUserTimes,
    FaExclamationTriangle
} from 'react-icons/fa';

interface IncidentReport {
    id: string;
    type: string;
    status: 'submitted' | 'investigating' | 'resolved' | 'closed';
    reportDate: string;
    incidentDate: string;
    location: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    description: string;
}

const ReportIncident: React.FC = () => {
    const [activeSection, setActiveSection] = useState('incident');
    const [selectedIncidentType, setSelectedIncidentType] = useState('');
    const [showReportModal, setShowReportModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form data
    const [formData, setFormData] = useState({
        incidentType: '',
        incidentDate: '',
        incidentTime: '',
        location: '',
        description: '',
        witnessName: '',
        witnessContact: '',
        priority: 'medium',
        isAnonymous: false
    });

    // Sample user data - available for future use
    // const userData = {
    //     fullName: 'Luc Elric Trevecedo',
    //     contactNumber: '0927 993 2190',
    //     address: '0281 Narra Street Old Sta Mesa Manila Barangay 599'
    // };

    // Incident reports history
    const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([
        {
            id: 'INC-2025-001',
            type: 'Noise Disturbance',
            status: 'investigating',
            reportDate: 'Oct 10, 2025',
            incidentDate: 'Oct 09, 2025',
            location: 'Block 5, Zone 59',
            priority: 'medium',
            description: 'Loud music playing late at night disturbing residents'
        },
        {
            id: 'INC-2025-002',
            type: 'Street Light Issue',
            status: 'resolved',
            reportDate: 'Oct 08, 2025',
            incidentDate: 'Oct 07, 2025',
            location: 'Corner of Narra and Molave St.',
            priority: 'low',
            description: 'Street light not working, causing safety concerns'
        }
    ]);

    const incidentTypes = [
        {
            id: 'crime',
            name: 'Crime/Security',
            icon: FaShieldAlt,
            description: 'Theft, robbery, vandalism, suspicious activities',
            priority: 'high',
            color: 'bg-red-500'
        },
        {
            id: 'fire',
            name: 'Fire Incident',
            icon: FaFire,
            description: 'Fire outbreaks, fire hazards, electrical issues',
            priority: 'urgent',
            color: 'bg-orange-500'
        },
        {
            id: 'accident',
            name: 'Accident',
            icon: FaCarCrash,
            description: 'Vehicle accidents, personal injuries, property damage',
            priority: 'high',
            color: 'bg-yellow-500'
        },
        {
            id: 'public-safety',
            name: 'Public Safety',
            icon: FaExclamationTriangle,
            description: 'Road hazards, broken infrastructure, dangerous conditions',
            priority: 'medium',
            color: 'bg-blue-500'
        },
        {
            id: 'noise',
            name: 'Noise Disturbance',
            icon: FaExclamationCircle,
            description: 'Loud music, construction noise, public disturbance',
            priority: 'low',
            color: 'bg-purple-500'
        },
        {
            id: 'community',
            name: 'Community Issue',
            icon: FaUserTimes,
            description: 'Neighbor disputes, public nuisance, community concerns',
            priority: 'low',
            color: 'bg-gray-500'
        }
    ];

    const handleSubmitReport = async () => {
        if (!formData.incidentType || !formData.incidentDate || !formData.location || !formData.description) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            const newReport: IncidentReport = {
                id: `INC-2025-${String(incidentReports.length + 1).padStart(3, '0')}`,
                type: formData.incidentType,
                status: 'submitted',
                reportDate: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                incidentDate: new Date(formData.incidentDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                location: formData.location,
                priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
                description: formData.description
            };

            setIncidentReports([...incidentReports, newReport]);
            setShowReportModal(false);
            setFormData({
                incidentType: '',
                incidentDate: '',
                incidentTime: '',
                location: '',
                description: '',
                witnessName: '',
                witnessContact: '',
                priority: 'medium',
                isAnonymous: false
            });
            setIsSubmitting(false);
            
            alert('Incident report submitted successfully! We will investigate and respond accordingly.');
        }, 2000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted': return 'text-blue-600 bg-blue-100';
            case 'investigating': return 'text-yellow-600 bg-yellow-100';
            case 'resolved': return 'text-green-600 bg-green-100';
            case 'closed': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'text-red-600 bg-red-100';
            case 'high': return 'text-orange-600 bg-orange-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'submitted': return <FaFileAlt className="w-4 h-4" />;
            case 'investigating': return <FaSpinner className="w-4 h-4 animate-spin" />;
            case 'resolved': return <FaCheck className="w-4 h-4" />;
            case 'closed': return <FaCheck className="w-4 h-4" />;
            default: return <FaFileAlt className="w-4 h-4" />;
        }
    };

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
                        <FaExclamationCircle style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>Report an Incident</span>
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
                            Incident Reporting System
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                            Report incidents, safety concerns, or community issues to Barangay 599 officials
                        </p>
                    </div>

                    {/* Emergency Notice */}
                    <div style={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <FaExclamationTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626', flexShrink: 0 }} />
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.25rem' }}>
                                Emergency Notice
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#7f1d1d' }}>
                                For life-threatening emergencies, call 911 immediately. For fire emergencies, call the Bureau of Fire Protection at 116.
                            </p>
                        </div>
                    </div>

                    {/* Incident Types Grid */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            Report an Incident
                        </h2>
                        
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            {incidentTypes.map((type) => {
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
                                            setSelectedIncidentType(type.name);
                                            setFormData({...formData, incidentType: type.name, priority: type.priority});
                                            setShowReportModal(true);
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
                                                backgroundColor: type.color.replace('bg-', '').includes('red') ? '#fee2e2' :
                                                                 type.color.replace('bg-', '').includes('orange') ? '#fed7aa' :
                                                                 type.color.replace('bg-', '').includes('yellow') ? '#fef3c7' :
                                                                 type.color.replace('bg-', '').includes('blue') ? '#dbeafe' :
                                                                 type.color.replace('bg-', '').includes('purple') ? '#f3e8ff' : '#f3f4f6'
                                            }}>
                                                <IconComponent style={{ 
                                                    width: '1.5rem', 
                                                    height: '1.5rem',
                                                    color: type.color.replace('bg-', '').includes('red') ? '#dc2626' :
                                                           type.color.replace('bg-', '').includes('orange') ? '#ea580c' :
                                                           type.color.replace('bg-', '').includes('yellow') ? '#d97706' :
                                                           type.color.replace('bg-', '').includes('blue') ? '#2563eb' :
                                                           type.color.replace('bg-', '').includes('purple') ? '#7c3aed' : '#6b7280'
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
                                                    textTransform: 'uppercase',
                                                    ...getPriorityColor(type.priority).split(' ').reduce((acc, cls) => {
                                                        if (cls.includes('text-')) acc.color = cls.replace('text-', '#');
                                                        if (cls.includes('bg-')) acc.backgroundColor = cls.replace('bg-', '#');
                                                        return acc;
                                                    }, {} as any)
                                                }}>
                                                    {type.priority} Priority
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

                    {/* Incident Reports History */}
                    <div>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            My Incident Reports
                        </h2>
                        
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden'
                        }}>
                            {incidentReports.length === 0 ? (
                                <div style={{ padding: '3rem', textAlign: 'center' }}>
                                    <FaExclamationCircle style={{ width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem' }} />
                                    <p style={{ color: '#6b7280', fontSize: '1rem' }}>No incident reports yet</p>
                                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                                        Report incidents or safety concerns using the options above
                                    </p>
                                </div>
                            ) : (
                                <div style={{ overflow: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f9fafb' }}>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Report ID
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Incident Type
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Location
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Priority
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Status
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Report Date
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {incidentReports.map((report) => (
                                                <tr key={report.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937', fontFamily: 'monospace' }}>
                                                        {report.id}
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                                                        {report.type}
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                                        {report.location}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '0.375rem',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '500',
                                                            textTransform: 'capitalize'
                                                        }}
                                                        className={getPriorityColor(report.priority)}>
                                                            {report.priority}
                                                        </span>
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
                                                        className={getStatusColor(report.status)}>
                                                            {getStatusIcon(report.status)}
                                                            {report.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                                                        {report.reportDate}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <button
                                                            style={{
                                                                padding: '0.5rem',
                                                                backgroundColor: '#f3f4f6',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                cursor: 'pointer',
                                                                color: '#6b7280'
                                                            }}
                                                            title="View Details"
                                                        >
                                                            <FaEye style={{ width: '0.875rem', height: '0.875rem' }} />
                                                        </button>
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

            {/* Report Modal */}
            {showReportModal && (
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
                        maxWidth: '700px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                Report {selectedIncidentType}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowReportModal(false);
                                    setSelectedIncidentType('');
                                    setFormData({
                                        incidentType: '',
                                        incidentDate: '',
                                        incidentTime: '',
                                        location: '',
                                        description: '',
                                        witnessName: '',
                                        witnessContact: '',
                                        priority: 'medium',
                                        isAnonymous: false
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
                            {/* Incident Date */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Incident Date *
                                </label>
                                <input
                                    type="date"
                                    value={formData.incidentDate}
                                    onChange={(e) => setFormData({...formData, incidentDate: e.target.value})}
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

                            {/* Incident Time */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Incident Time
                                </label>
                                <input
                                    type="time"
                                    value={formData.incidentTime}
                                    onChange={(e) => setFormData({...formData, incidentTime: e.target.value})}
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

                        {/* Location */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Location *
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                placeholder="Specific location where the incident occurred..."
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

                        {/* Description */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Incident Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Please provide detailed description of the incident..."
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

                        {/* Witness Information */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Witness Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.witnessName}
                                    onChange={(e) => setFormData({...formData, witnessName: e.target.value})}
                                    placeholder="Name of witness if any..."
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
                                    Witness Contact (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.witnessContact}
                                    onChange={(e) => setFormData({...formData, witnessContact: e.target.value})}
                                    placeholder="Contact number of witness..."
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

                        {/* Anonymous Reporting */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.isAnonymous}
                                    onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                                    style={{ width: '1rem', height: '1rem' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                                    Submit this report anonymously
                                </span>
                            </label>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', marginLeft: '1.5rem' }}>
                                Your contact information will not be shared with anyone if checked
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowReportModal(false);
                                    setSelectedIncidentType('');
                                    setFormData({
                                        incidentType: '',
                                        incidentDate: '',
                                        incidentTime: '',
                                        location: '',
                                        description: '',
                                        witnessName: '',
                                        witnessContact: '',
                                        priority: 'medium',
                                        isAnonymous: false
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
                                onClick={handleSubmitReport}
                                disabled={isSubmitting || !formData.incidentDate || !formData.location || !formData.description}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: (!formData.incidentDate || !formData.location || !formData.description || isSubmitting) ? '#9ca3af' : '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: (!formData.incidentDate || !formData.location || !formData.description || isSubmitting) ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isSubmitting && <FaSpinner style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />}
                                {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportIncident;