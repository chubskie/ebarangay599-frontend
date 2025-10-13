import React, { useState } from 'react';
import ResidentDashboardNav from '../components/ResidentDashboardNav';
import { 
    FaIdCard,
    FaDownload,
    FaPrint,
    FaQrcode,
    FaUser,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaCalendarAlt,
    FaEdit,
    FaTimes,
    FaCheck,
    FaSpinner,
    FaExclamationCircle,
    FaInfoCircle,
    FaCreditCard,
    FaShieldAlt
} from 'react-icons/fa';

const MyBarangayID: React.FC = () => {
    const [activeSection, setActiveSection] = useState('barangay-id');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    
    // Sample user data
    const userData = {
        idNumber: 'BRG599-2025-001234',
        fullName: 'Luc Elric Trevecedo',
        address: '0281 Narra Street Old Sta Mesa Manila',
        barangay: 'Barangay 599',
        city: 'Manila',
        contactNumber: '0927 993 2190',
        email: 'luc.trevecedo@example.com',
        dateOfBirth: '1995-06-15',
        civilStatus: 'Single',
        occupation: 'Software Developer',
        emergencyContact: 'Maria Trevecedo',
        emergencyPhone: '0919 123 4567',
        dateIssued: '2025-01-15',
        validUntil: '2026-01-15',
        photo: '/api/placeholder/150/200', // Placeholder for user photo
        status: 'Active'
    };

    const [formData, setFormData] = useState({
        contactNumber: userData.contactNumber,
        email: userData.email,
        occupation: userData.occupation,
        emergencyContact: userData.emergencyContact,
        emergencyPhone: userData.emergencyPhone
    });

    const handleUpdateInfo = async () => {
        setIsUpdating(true);
        
        // Simulate API call
        setTimeout(() => {
            setShowUpdateModal(false);
            setIsUpdating(false);
            alert('Information updated successfully! Changes will be reflected in your next ID renewal.');
        }, 2000);
    };

    const handleDownloadID = () => {
        // Simulate download
        alert('Digital ID card download started! Check your downloads folder.');
    };

    const handlePrintID = () => {
        // Simulate print
        window.print();
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'text-green-600 bg-green-100';
            case 'expired': return 'text-red-600 bg-red-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'suspended': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
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
                        <FaIdCard style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>My Barangay ID</span>
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
                            My Barangay ID
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                            View and manage your official Barangay 599 identification card
                        </p>
                    </div>

                    {/* ID Status Alert */}
                    <div style={{
                        backgroundColor: userData.status === 'Active' ? '#f0fdf4' : '#fef2f2',
                        border: `1px solid ${userData.status === 'Active' ? '#bbf7d0' : '#fecaca'}`,
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        {userData.status === 'Active' ? (
                            <FaCheck style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a', flexShrink: 0 }} />
                        ) : (
                            <FaExclamationCircle style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626', flexShrink: 0 }} />
                        )}
                        <div>
                            <h3 style={{ 
                                fontSize: '0.875rem', 
                                fontWeight: '600', 
                                color: userData.status === 'Active' ? '#16a34a' : '#dc2626', 
                                marginBottom: '0.25rem' 
                            }}>
                                ID Status: {userData.status}
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: userData.status === 'Active' ? '#15803d' : '#7f1d1d' }}>
                                {userData.status === 'Active' 
                                    ? `Your Barangay ID is active and valid until ${userData.validUntil}`
                                    : 'Please contact the Barangay office to resolve ID status issues'
                                }
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        {/* Digital ID Card */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e7eb'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: '600', 
                                color: '#1f2937', 
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <FaCreditCard style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                                Digital ID Card
                            </h2>

                            {/* ID Card Design */}
                            <div style={{
                                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                borderRadius: '0.75rem',
                                padding: '1.5rem',
                                color: 'white',
                                marginBottom: '1.5rem',
                                minHeight: '300px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Header */}
                                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        Republic of the Philippines
                                    </h3>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>
                                        BARANGAY 599
                                    </h4>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                                        Manila City
                                    </p>
                                </div>

                                {/* Photo and Basic Info */}
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '100px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid rgba(255, 255, 255, 0.3)'
                                    }}>
                                        <FaUser style={{ width: '2rem', height: '2rem', opacity: 0.7 }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                            {userData.fullName}
                                        </h4>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '0.25rem' }}>
                                            ID: {userData.idNumber}
                                        </p>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                                            {userData.address}
                                        </p>
                                    </div>
                                </div>

                                {/* Status and Validity */}
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    padding: '0.5rem',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.75rem'
                                }}>
                                    <span>Valid Until: {userData.validUntil}</span>
                                    <span style={{
                                        backgroundColor: userData.status === 'Active' ? '#16a34a' : '#dc2626',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        fontWeight: '600'
                                    }}>
                                        {userData.status.toUpperCase()}
                                    </span>
                                </div>

                                {/* QR Code Corner */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    right: '1rem',
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: 'white',
                                    borderRadius: '0.375rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setShowQRModal(true)}>
                                    <FaQrcode style={{ width: '2rem', height: '2rem', color: '#1f2937' }} />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={handleDownloadID}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 1rem',
                                        backgroundColor: '#2563eb',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <FaDownload style={{ width: '1rem', height: '1rem' }} />
                                    Download
                                </button>
                                <button
                                    onClick={handlePrintID}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 1rem',
                                        backgroundColor: '#059669',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <FaPrint style={{ width: '1rem', height: '1rem' }} />
                                    Print
                                </button>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                marginBottom: '1.5rem'
                            }}>
                                <h2 style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: '600', 
                                    color: '#1f2937',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <FaUser style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                                    Personal Information
                                </h2>
                                <button
                                    onClick={() => setShowUpdateModal(true)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#f3f4f6',
                                        color: '#374151',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <FaEdit style={{ width: '0.875rem', height: '0.875rem' }} />
                                    Update Info
                                </button>
                            </div>

                            {/* Information Grid */}
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Full Name
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                            {userData.fullName}
                                        </p>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            ID Number
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                                            {userData.idNumber}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Address
                                    </label>
                                    <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaMapMarkerAlt style={{ width: '0.75rem', height: '0.75rem', color: '#6b7280' }} />
                                        {userData.address}, {userData.barangay}, {userData.city}
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Contact Number
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FaPhone style={{ width: '0.75rem', height: '0.75rem', color: '#6b7280' }} />
                                            {userData.contactNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Email
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FaEnvelope style={{ width: '0.75rem', height: '0.75rem', color: '#6b7280' }} />
                                            {userData.email}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Date of Birth
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FaCalendarAlt style={{ width: '0.75rem', height: '0.75rem', color: '#6b7280' }} />
                                            {new Date(userData.dateOfBirth).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Civil Status
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                            {userData.civilStatus}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Occupation
                                    </label>
                                    <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                        {userData.occupation}
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Emergency Contact
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                            {userData.emergencyContact}
                                        </p>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Emergency Phone
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FaPhone style={{ width: '0.75rem', height: '0.75rem', color: '#6b7280' }} />
                                            {userData.emergencyPhone}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Date Issued
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                            {userData.dateIssued}
                                        </p>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Valid Until
                                        </label>
                                        <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                            {userData.validUntil}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Status
                                    </label>
                                    <div style={{ marginTop: '0.25rem' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '0.375rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '500'
                                        }}
                                        className={getStatusColor(userData.status)}>
                                            <FaShieldAlt style={{ width: '0.75rem', height: '0.75rem' }} />
                                            {userData.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div style={{
                        backgroundColor: '#fffbeb',
                        border: '1px solid #fed7aa',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '0.75rem'
                    }}>
                        <FaInfoCircle style={{ width: '1.25rem', height: '1.25rem', color: '#d97706', flexShrink: 0, marginTop: '0.125rem' }} />
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                                Important Notes
                            </h3>
                            <ul style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: '1.5', paddingLeft: '1rem' }}>
                                <li>Keep your Barangay ID safe and secure at all times</li>
                                <li>Report lost or stolen IDs immediately to the Barangay office</li>
                                <li>Your ID must be renewed annually before the expiration date</li>
                                <li>Present your ID when requesting barangay services or certificates</li>
                                <li>Update your information when there are changes in your contact details</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>

            {/* Update Information Modal */}
            {showUpdateModal && (
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
                        maxWidth: '600px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                Update Information
                            </h2>
                            <button
                                onClick={() => setShowUpdateModal(false)}
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
                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    value={formData.contactNumber}
                                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
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
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    value={formData.occupation}
                                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
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

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                        Emergency Contact Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.emergencyContact}
                                        onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
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
                                        Emergency Contact Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.emergencyPhone}
                                        onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
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
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                disabled={isUpdating}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: isUpdating ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    opacity: isUpdating ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateInfo}
                                disabled={isUpdating}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: isUpdating ? '#9ca3af' : '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: isUpdating ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isUpdating && <FaSpinner style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />}
                                {isUpdating ? 'Updating...' : 'Update Information'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* QR Code Modal */}
            {showQRModal && (
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
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                            QR Code
                        </h2>
                        <div style={{
                            width: '200px',
                            height: '200px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            border: '2px solid #e5e7eb'
                        }}>
                            <FaQrcode style={{ width: '6rem', height: '6rem', color: '#6b7280' }} />
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                            Scan this QR code to quickly verify your Barangay ID
                        </p>
                        <button
                            onClick={() => setShowQRModal(false)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBarangayID;