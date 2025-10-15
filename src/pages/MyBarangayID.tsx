import React, { useState, useRef } from 'react';
import ResidentDashboardNav from '../components/ResidentDashboardNav';
import { 
    FaIdCard,
    FaPrint,
    FaQrcode,
    FaUser,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaCalendarAlt,
    FaEdit,
    FaTimes,
    FaSpinner,
    FaExclamationCircle,
    FaInfoCircle,
    FaShieldAlt,
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaEye,
    FaShare
} from 'react-icons/fa';

const MyBarangayID: React.FC = () => {
    const [activeSection, setActiveSection] = useState('barangay-id');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showRequestIDModal, setShowRequestIDModal] = useState(false);
    const [isRequestingID, setIsRequestingID] = useState(false);
    const idCardRef = useRef<HTMLDivElement>(null);

    // Add CSS animation for spinner and print styles
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @media print {
                .print-only {
                    display: block !important;
                }
                .no-print {
                    display: none !important;
                }
                .printable-id-card {
                    background: white !important;
                    color: black !important;
                    border: 2px solid #000 !important;
                    border-radius: 10px !important;
                    padding: 20px !important;
                    margin: 20px !important;
                    width: 350px !important;
                    height: 220px !important;
                    position: relative !important;
                    page-break-inside: avoid !important;
                }
                .printable-id-card * {
                    color: black !important;
                }
                .printable-id-card .decorative-element {
                    display: none !important;
                }
                @page {
                    size: A4;
                    margin: 1in;
                }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    
    // Sample user data
    const userData = {
        idNumber: '9f47a2d3-8a4b-4d1f-9e9f-1b6a04f0b3c8', //uuid format
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

    const handlePrintID = () => {
        // Create print styles for the ID card
        const printStyles = `
            @media print {
                * {
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                
                body * {
                    visibility: hidden;
                }
                
                .printable-id-card, 
                .printable-id-card *,
                .printable-id-card .print-visible,
                .printable-id-card .print-visible * {
                    visibility: visible !important;
                }
                
                .printable-id-card {
                    position: absolute !important;
                    left: 50% !important;
                    top: 2in !important;
                    transform: translateX(-50%) !important;
                    width: 4in !important;
                    height: 2.5in !important;
                    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%) !important;
                    color: white !important;
                    border: 2px solid #000 !important;
                    border-radius: 0.5rem !important;
                    padding: 1rem !important;
                    font-family: Arial, sans-serif !important;
                    box-shadow: none !important;
                }
                
                .decorative-element {
                    display: none !important;
                }
                
                .print-header {
                    text-align: center !important;
                    margin-bottom: 0.5rem !important;
                }
                
                .print-content {
                    display: flex !important;
                    gap: 0.5rem !important;
                    align-items: flex-start !important;
                }
                
                .print-photo {
                    width: 60px !important;
                    height: 75px !important;
                    background: rgba(255, 255, 255, 0.3) !important;
                    border: 1px solid rgba(255, 255, 255, 0.5) !important;
                    border-radius: 0.25rem !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                
                .print-info {
                    flex: 1 !important;
                }
                
                .print-qr {
                    width: 50px !important;
                    height: 50px !important;
                    background: white !important;
                    border-radius: 0.25rem !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                
                .print-footer {
                    margin-top: 0.5rem !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    background: rgba(255, 255, 255, 0.2) !important;
                    padding: 0.25rem 0.5rem !important;
                    border-radius: 0.25rem !important;
                    font-size: 0.7rem !important;
                }
                
                @page {
                    size: A4;
                    margin: 1in;
                }
            }
        `;
        
        // Add print styles
        const styleElement = document.createElement('style');
        styleElement.textContent = printStyles;
        document.head.appendChild(styleElement);
        
        // Add print class to the ID card
        const idElement = idCardRef.current;
        if (idElement) {
            idElement.classList.add('printable-id-card');
        }
        
        // Print after a short delay to ensure styles are applied
        setTimeout(() => {
            window.print();
            
            // Clean up after printing
            setTimeout(() => {
                document.head.removeChild(styleElement);
                if (idElement) {
                    idElement.classList.remove('printable-id-card');
                }
            }, 1000);
        }, 100);
    };

    const handleViewOnly = () => {
        alert('This is your digital ID for viewing and verification. Use the Print button to get a printable version.');
    };

    const handleRequestPhysicalID = async () => {
        setIsRequestingID(true);
        
        // Simulate API call
        setTimeout(() => {
            setShowRequestIDModal(false);
            setIsRequestingID(false);
            alert('Physical ID request submitted successfully! Please visit the Barangay office within 3-5 business days to claim your ID.');
        }, 2000);
    };

    const handleShareQR = () => {
        // In a real implementation, this would share the QR code
        if (navigator.share) {
            navigator.share({
                title: 'My Barangay ID QR Code',
                text: `Barangay 599 ID: ${userData.idNumber}`,
                url: window.location.href
            });
        } else {
            alert('QR code ready to share! You can show this to verify your identity.');
        }
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
                    {/* Status Banner */}
                    <div style={{
                        background: userData.status === 'Active' 
                            ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' 
                            : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                        border: `1px solid ${userData.status === 'Active' ? '#bbf7d0' : '#fecaca'}`,
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: userData.status === 'Active' ? '#16a34a' : '#dc2626',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {userData.status === 'Active' ? (
                                <FaCheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                            ) : (
                                <FaExclamationCircle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ 
                                fontSize: '1.125rem', 
                                fontWeight: '600', 
                                color: userData.status === 'Active' ? '#15803d' : '#dc2626', 
                                marginBottom: '0.25rem' 
                            }}>
                                ID Status: {userData.status}
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: userData.status === 'Active' ? '#166534' : '#991b1b', margin: 0 }}>
                                {userData.status === 'Active' 
                                    ? `Your digital ID is active and valid until ${userData.validUntil}. You can use this for verification.`
                                    : 'Please contact the Barangay office to resolve ID status issues.'
                                }
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        {/* Modern Digital ID Card */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            padding: '0',
                            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden'
                        }}>
                            {/* Card Header */}
                            <div style={{
                                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
                                padding: '1.5rem',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                <h2 style={{ 
                                    fontSize: '1.25rem', 
                                    fontWeight: '700', 
                                    margin: '0 0 0.5rem 0'
                                }}>
                                    Digital ID Card
                                </h2>
                                <p style={{ fontSize: '0.875rem', opacity: 0.9, margin: 0 }}>
                                    Official Barangay 599 Identification
                                </p>
                            </div>

                            {/* Card Content */}
                            <div style={{ padding: '1.5rem' }}>
                                {/* ID Card Design */}
                                <div 
                                    ref={idCardRef}
                                    style={{
                                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                                        borderRadius: '1rem',
                                        padding: '1.5rem',
                                        color: 'white',
                                        marginBottom: '1.5rem',
                                        minHeight: '320px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: '2px solid #e2e8f0'
                                    }}
                                >
                                    {/* Decorative elements */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-50px',
                                        right: '-50px',
                                        width: '150px',
                                        height: '150px',
                                        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 197, 253, 0.1))',
                                        borderRadius: '50%'
                                    }} />
                                    
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-30px',
                                        left: '-30px',
                                        width: '100px',
                                        height: '100px',
                                        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(52, 211, 153, 0.1))',
                                        borderRadius: '50%'
                                    }} />

                                    {/* Header */}
                                    <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                                        <h3 style={{ fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem', opacity: 0.8 }}>
                                            Republic of the Philippines
                                        </h3>
                                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                            BARANGAY 599
                                        </h4>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>
                                            Manila City • Digital ID
                                        </p>
                                    </div>

                                    {/* Main Content */}
                                    <div style={{ 
                                        display: 'flex', 
                                        gap: '1rem', 
                                        alignItems: 'flex-start', 
                                        marginBottom: '1rem',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        {/* Photo placeholder */}
                                        <div style={{
                                            width: '70px',
                                            height: '85px',
                                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid rgba(255, 255, 255, 0.2)',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <FaUser style={{ width: '1.75rem', height: '1.75rem', opacity: 0.7 }} />
                                        </div>
                                        
                                        {/* Info */}
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                                {userData.fullName}
                                            </h4>
                                            <p style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '0.125rem', fontFamily: 'monospace' }}>
                                                {userData.idNumber}
                                            </p>
                                            <p style={{ fontSize: '0.625rem', opacity: 0.8, margin: 0, lineHeight: 1.3 }}>
                                                {userData.address}
                                            </p>
                                        </div>

                                        {/* QR Code - Positioned in top right */}
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            backgroundColor: 'white',
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            position: 'relative'
                                        }}
                                        onClick={() => setShowQRModal(true)}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            {/* QR Code */}
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=BRG599-ID-${userData.idNumber}`}
                                                alt="QR Code"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '0.25rem'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.625rem',
                                        position: 'relative',
                                        zIndex: 1,
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <div>
                                            <p style={{ margin: 0, opacity: 0.8 }}>Valid Until</p>
                                            <p style={{ margin: 0, fontWeight: '600' }}>{userData.validUntil}</p>
                                        </div>
                                        <div>
                                            <span style={{
                                                backgroundColor: userData.status === 'Active' ? '#10b981' : '#ef4444',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '600',
                                                fontSize: '0.625rem'
                                            }}>
                                                {userData.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Print-only additional info */}
                                    <div style={{ 
                                        display: 'none',
                                        position: 'absolute',
                                        bottom: '0.5rem',
                                        left: '1.5rem',
                                        fontSize: '0.5rem',
                                        opacity: 0.7
                                    }} className="print-only">
                                        Issued: {userData.dateIssued} | For verification, scan QR code
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                                    <button
                                        onClick={handlePrintID}
                                        style={{
                                            padding: '0.875rem 1rem',
                                            background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.75rem',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(22, 163, 74, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(22, 163, 74, 0.3)';
                                        }}
                                    >
                                        <FaPrint style={{ width: '1rem', height: '1rem' }} />
                                        Print ID
                                    </button>
                                    <button
                                        onClick={() => setShowRequestIDModal(true)}
                                        style={{
                                            padding: '0.875rem 1rem',
                                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.75rem',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)';
                                        }}
                                    >
                                        <FaClipboardList style={{ width: '1rem', height: '1rem' }} />
                                        Request Physical ID
                                    </button>
                                    <button
                                        onClick={handleViewOnly}
                                        style={{
                                            padding: '0.875rem 1rem',
                                            backgroundColor: '#f1f5f9',
                                            color: '#475569',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '0.75rem',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#e2e8f0';
                                            e.currentTarget.style.borderColor = '#cbd5e1';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f1f5f9';
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                        }}
                                    >
                                        <FaEye style={{ width: '1rem', height: '1rem' }} />
                                        View Details
                                    </button>
                                </div>
                                
                                {/* Info Note */}
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <p style={{ 
                                        fontSize: '0.75rem', 
                                        color: '#64748b', 
                                        margin: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <FaInfoCircle style={{ width: '0.75rem', height: '0.75rem' }} />
                                        You can print this digital ID with QR code for temporary use. For official physical ID, use the "Request Physical ID" button.
                                    </p>
                                </div>
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
                                            Barangay ID Number
                                        </label>
                                        <div style={{ 
                                            marginTop: '0.25rem',
                                            padding: '0.75rem',
                                            backgroundColor: '#f1f5f9',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <FaIdCard style={{ width: '0.875rem', height: '0.875rem', color: '#2563eb' }} />
                                            <p style={{ 
                                                fontSize: '0.875rem', 
                                                color: '#1e293b', 
                                                fontFamily: 'monospace',
                                                fontWeight: '600',
                                                margin: 0
                                            }}>
                                                {userData.idNumber}
                                            </p>
                                        </div>
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

                    {/* Modern Important Notes */}
                    <div style={{
                        background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                        border: '1px solid #fed7aa',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '1rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            backgroundColor: '#f59e0b',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <FaInfoCircle style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#92400e', marginBottom: '1rem' }}>
                                Important Reminders
                            </h3>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <FaShieldAlt style={{ width: '1rem', height: '1rem', color: '#d97706', marginTop: '0.125rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '0.875rem', color: '#78350f', margin: 0, lineHeight: '1.5' }}>
                                        Keep your digital ID safe and secure. Screenshot or download for offline access.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <FaExclamationCircle style={{ width: '1rem', height: '1rem', color: '#d97706', marginTop: '0.125rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '0.875rem', color: '#78350f', margin: 0, lineHeight: '1.5' }}>
                                        Report lost or compromised digital IDs immediately to prevent misuse.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <FaCalendarAlt style={{ width: '1rem', height: '1rem', color: '#d97706', marginTop: '0.125rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '0.875rem', color: '#78350f', margin: 0, lineHeight: '1.5' }}>
                                        Your ID must be renewed annually before the expiration date.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <FaQrcode style={{ width: '1rem', height: '1rem', color: '#d97706', marginTop: '0.125rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '0.875rem', color: '#78350f', margin: 0, lineHeight: '1.5' }}>
                                        Use the QR code for quick verification when requesting barangay services.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <FaEdit style={{ width: '1rem', height: '1rem', color: '#d97706', marginTop: '0.125rem', flexShrink: 0 }} />
                                    <p style={{ fontSize: '0.875rem', color: '#78350f', margin: 0, lineHeight: '1.5' }}>
                                        Update your information promptly when contact details change.
                                    </p>
                                </div>
                            </div>
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

            {/* Enhanced QR Code Modal */}
            {showQRModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '450px',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{
                            width: '4rem',
                            height: '4rem',
                            backgroundColor: '#3b82f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <FaQrcode style={{ width: '2rem', height: '2rem', color: 'white' }} />
                        </div>
                        
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
                            Digital ID QR Code
                        </h2>
                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem' }}>
                            Scan this QR code for instant ID verification
                        </p>
                        
                        {/* QR Code Placeholder */}
                        <div style={{
                            width: '200px',
                            height: '200px',
                            background: 'white',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            border: '2px solid #e2e8f0',
                            position: 'relative',
                            padding: '10px'
                        }}>
                            {/* QR Code */}
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BRG599-ID-${userData.idNumber}&format=png&margin=10`}
                                alt="QR Code"
                                style={{
                                    width: '180px',
                                    height: '180px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            
                            {/* QR Code Info */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-0.5rem',
                                right: '-0.5rem',
                                backgroundColor: '#16a34a',
                                color: 'white',
                                borderRadius: '0.5rem',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.625rem',
                                fontWeight: '600'
                            }}>
                                ACTIVE
                            </div>
                        </div>
                        
                        <div style={{
                            backgroundColor: '#f8fafc',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            border: '1px solid #e2e8f0'
                        }}>
                            <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                                ID Information:
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0', fontFamily: 'monospace' }}>
                                {userData.idNumber}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0' }}>
                                {userData.fullName}
                            </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                            <button
                                onClick={handleShareQR}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <FaShare style={{ width: '0.875rem', height: '0.875rem' }} />
                                Share
                            </button>
                            <button
                                onClick={() => setShowQRModal(false)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    backgroundColor: '#f1f5f9',
                                    color: '#475569',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '600'
                                }}
                            >
                                Close
                            </button>
                        </div>
                        
                        <p style={{ fontSize: '0.625rem', color: '#94a3b8', margin: 0 }}>
                            This QR code contains your encrypted ID information for secure verification
                        </p>
                    </div>
                </div>
            )}

            {/* Request Physical ID Modal */}
            {showRequestIDModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid #e2e8f0'
                    }}>
                        {/* Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    backgroundColor: '#16a34a',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FaClipboardList style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                                        Request Physical ID
                                    </h2>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                                        Get your official physical Barangay ID card
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowRequestIDModal(false)}
                                style={{
                                    backgroundColor: '#f1f5f9',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '2rem',
                                    height: '2rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#64748b'
                                }}
                            >
                                <FaTimes style={{ width: '1rem', height: '1rem' }} />
                            </button>
                        </div>

                        {/* Info Section */}
                        <div style={{
                            backgroundColor: '#f0f9ff',
                            border: '1px solid #bae6fd',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0369a1', marginBottom: '0.5rem' }}>
                                Physical ID Request Process:
                            </h3>
                            <ul style={{ fontSize: '0.75rem', color: '#0c4a6e', lineHeight: '1.6', paddingLeft: '1rem', margin: 0 }}>
                                <li>Submit request online (instant)</li>
                                <li>Processing time: 3-5 business days</li>
                                <li>Pick up at Barangay 599 office</li>
                                <li>Bring valid government ID for verification</li>
                                <li>No additional fees required</li>
                            </ul>
                        </div>

                        {/* User Info Confirmation */}
                        <div style={{
                            backgroundColor: '#f8fafc',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                                ID will be issued for:
                            </h3>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Name:</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#1e293b' }}>{userData.fullName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>ID Number:</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#1e293b', fontFamily: 'monospace' }}>{userData.idNumber}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Address:</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#1e293b', textAlign: 'right', maxWidth: '60%' }}>{userData.address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Pickup Information */}
                        <div style={{
                            backgroundColor: '#fffbeb',
                            border: '1px solid #fed7aa',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'start',
                            gap: '0.75rem'
                        }}>
                            <FaClock style={{ width: '1rem', height: '1rem', color: '#d97706', flexShrink: 0, marginTop: '0.125rem' }} />
                            <div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', marginBottom: '0.25rem' }}>
                                    Pickup Schedule:
                                </h3>
                                <p style={{ fontSize: '0.75rem', color: '#78350f', margin: 0 }}>
                                    Monday to Friday: 8:00 AM - 5:00 PM<br />
                                    Saturday: 8:00 AM - 12:00 PM<br />
                                    Closed on Sundays and holidays
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowRequestIDModal(false)}
                                disabled={isRequestingID}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f1f5f9',
                                    color: '#475569',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    cursor: isRequestingID ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    opacity: isRequestingID ? 0.5 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRequestPhysicalID}
                                disabled={isRequestingID}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: isRequestingID ? '#9ca3af' : 'linear-gradient(135deg, #16a34a, #15803d)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: isRequestingID ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: isRequestingID ? 'none' : '0 4px 6px -1px rgba(22, 163, 74, 0.3)'
                                }}
                            >
                                {isRequestingID && <FaSpinner style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />}
                                {isRequestingID ? 'Submitting Request...' : 'Submit Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBarangayID;