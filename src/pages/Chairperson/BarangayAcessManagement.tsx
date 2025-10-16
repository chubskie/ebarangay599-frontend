import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Official positions in the barangay
type OfficialPosition = 
    | 'Chairperson' 
    | 'Secretary' 
    | 'Treasurer' 
    | 'Kagawad 1' 
    | 'Kagawad 2' 
    | 'Kagawad 3' 
    | 'Kagawad 4' 
    | 'Kagawad 5' 
    | 'Kagawad 6' 
    | 'Kagawad 7' 
    | 'SK Chairperson';

interface BarangayOfficial {
    id: number;
    fullName: string;
    position: OfficialPosition;
    contactNumber: string;
    emailAddress: string;
    status: 'ACTIVE' | 'INACTIVE';
}

const BarangayAccessManagement: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('access-management');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [officials, setOfficials] = useState<BarangayOfficial[]>([]);
    const [selectedOfficial, setSelectedOfficial] = useState<BarangayOfficial | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Role protection
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn || userRole !== 'chairwoman') {
            navigate('/login');
            return;
        }
    }, [navigate]);

    // Initialize sample data
    useEffect(() => {
        const sampleOfficials: BarangayOfficial[] = [
            {
                id: 1,
                fullName: 'Editha E. Alviso',
                position: 'Chairperson',
                contactNumber: '09171234567',
                emailAddress: 'editha.alviso@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 2,
                fullName: 'jewel nicole Dimaculangan Maming',
                position: 'Secretary',
                contactNumber: '09972858407',
                emailAddress: 'mamingjewel30@gmail.com',
                status: 'ACTIVE'
            },
            {
                id: 3,
                fullName: 'Maria Dela Cruz',
                position: 'Treasurer',
                contactNumber: '09181234567',
                emailAddress: 'maria.delacruz@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 4,
                fullName: 'Juan Santos',
                position: 'Kagawad 1',
                contactNumber: '09191234567',
                emailAddress: 'juan.santos@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 5,
                fullName: 'Pedro Reyes',
                position: 'Kagawad 2',
                contactNumber: '09201234567',
                emailAddress: 'pedro.reyes@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 6,
                fullName: 'Ana Garcia',
                position: 'Kagawad 3',
                contactNumber: '09211234567',
                emailAddress: 'ana.garcia@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 7,
                fullName: 'Carlos Mendoza',
                position: 'Kagawad 4',
                contactNumber: '09221234567',
                emailAddress: 'carlos.mendoza@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 8,
                fullName: 'Rosa Villanueva',
                position: 'Kagawad 5',
                contactNumber: '09231234567',
                emailAddress: 'rosa.villanueva@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 9,
                fullName: 'Roberto Cruz',
                position: 'Kagawad 6',
                contactNumber: '09241234567',
                emailAddress: 'roberto.cruz@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 10,
                fullName: 'Linda Ramos',
                position: 'Kagawad 7',
                contactNumber: '09251234567',
                emailAddress: 'linda.ramos@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 11,
                fullName: 'Miguel Torres',
                position: 'SK Chairperson',
                contactNumber: '09261234567',
                emailAddress: 'miguel.torres@barangay599.gov.ph',
                status: 'ACTIVE'
            }
        ];
        setOfficials(sampleOfficials);
    }, []);

    // Filter officials based on search term
    const filteredOfficials = officials.filter(official =>
        official.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.contactNumber.includes(searchTerm) ||
        official.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredOfficials.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOfficials = filteredOfficials.slice(startIndex, endIndex);

    // Handle view official
    const handleView = (official: BarangayOfficial) => {
        setSelectedOfficial(official);
        setShowViewModal(true);
    };

    // Handle edit official
    const handleEdit = (official: BarangayOfficial) => {
        setSelectedOfficial(official);
        setShowEditModal(true);
    };

    // Handle remove official (revoke access)
    const handleRemove = (official: BarangayOfficial) => {
        if (window.confirm(`Are you sure you want to revoke access for ${official.fullName}?`)) {
            setOfficials(officials.map(o => 
                o.id === official.id ? { ...o, status: 'INACTIVE' } : o
            ));
            alert(`Access revoked for ${official.fullName}`);
        }
    };

    // Handle restore access
    const handleRestoreAccess = (official: BarangayOfficial) => {
        if (window.confirm(`Are you sure you want to restore access for ${official.fullName}?`)) {
            setOfficials(officials.map(o => 
                o.id === official.id ? { ...o, status: 'ACTIVE' } : o
            ));
            alert(`Access restored for ${official.fullName}`);
        }
    };

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <ChairwomanDashboardNav 
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            
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
                        Barangay Access Management
                    </h1>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem',
                        marginBottom: 0
                    }}>
                        Manage barangay officials and their access permissions
                    </p>
                </header>

                {/* Main Content */}
                <main style={{ padding: '2rem' }}>
                    {/* Search Bar */}
                    <div style={{ 
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{ position: 'relative', maxWidth: '400px' }}>
                            <FaSearch style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af',
                                fontSize: '1rem'
                            }} />
                            <input
                                type="text"
                                placeholder="Search officials..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                                    fontSize: '0.875rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>
                    </div>

                    {/* Officials Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#dbeafe' }}>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Full Name
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Position
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Contact Number
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Email Address
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Status
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOfficials.length > 0 ? (
                                        currentOfficials.map((official, index) => (
                                            <tr 
                                                key={official.id}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb'}
                                            >
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    {official.fullName}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: '#6366f1',
                                                        color: 'white',
                                                        borderRadius: '0.375rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {official.position}
                                                    </span>
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    {official.contactNumber}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    {official.emailAddress}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: official.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                                                        color: official.status === 'ACTIVE' ? '#166534' : '#991b1b',
                                                        borderRadius: '0.375rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        {official.status}
                                                    </span>
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => handleView(official)}
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                backgroundColor: '#3b82f6',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.25rem',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                                        >
                                                            <FaEye /> View
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(official)}
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                backgroundColor: '#f59e0b',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.25rem',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                                                        >
                                                            <FaEdit /> Edit
                                                        </button>
                                                        {official.status === 'ACTIVE' ? (
                                                            <button
                                                                onClick={() => handleRemove(official)}
                                                                style={{
                                                                    padding: '0.5rem 1rem',
                                                                    backgroundColor: '#ef4444',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '0.375rem',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '500',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.25rem',
                                                                    transition: 'background-color 0.2s'
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                                                            >
                                                                <FaTrash /> Remove
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleRestoreAccess(official)}
                                                                style={{
                                                                    padding: '0.5rem 1rem',
                                                                    backgroundColor: '#10b981',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '0.375rem',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '500',
                                                                    cursor: 'pointer',
                                                                    transition: 'background-color 0.2s'
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                                                            >
                                                                Restore
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td 
                                                colSpan={6} 
                                                style={{
                                                    padding: '3rem',
                                                    textAlign: 'center',
                                                    color: '#6b7280',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                No officials found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {filteredOfficials.length > 0 && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1.5rem',
                                borderTop: '1px solid #e5e7eb'
                            }}>
                                <button
                                    onClick={goToFirstPage}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    First
                                </button>
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    ← Previous
                                </button>
                                <span style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600'
                                }}>
                                    {currentPage}
                                </span>
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
                                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Next →
                                </button>
                                <button
                                    onClick={goToLastPage}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
                                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Last
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* View Modal */}
            {showViewModal && selectedOfficial && (
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
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginBottom: '1.5rem'
                        }}>
                            Official Details
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Full Name
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.fullName}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Position
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.position}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Contact Number
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.contactNumber}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Email Address
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.emailAddress}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Status
                                </label>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        backgroundColor: selectedOfficial.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                                        color: selectedOfficial.status === 'ACTIVE' ? '#166534' : '#991b1b',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {selectedOfficial.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowViewModal(false)}
                            style={{
                                marginTop: '1.5rem',
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#6b7280',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedOfficial && (
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
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginBottom: '1.5rem'
                        }}>
                            Edit Official
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={selectedOfficial.fullName}
                                    onChange={(e) => setSelectedOfficial({
                                        ...selectedOfficial,
                                        fullName: e.target.value
                                    })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    value={selectedOfficial.contactNumber}
                                    onChange={(e) => setSelectedOfficial({
                                        ...selectedOfficial,
                                        contactNumber: e.target.value
                                    })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={selectedOfficial.emailAddress}
                                    onChange={(e) => setSelectedOfficial({
                                        ...selectedOfficial,
                                        emailAddress: e.target.value
                                    })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => {
                                    setOfficials(officials.map(o => 
                                        o.id === selectedOfficial.id ? selectedOfficial : o
                                    ));
                                    setShowEditModal(false);
                                    alert('Official information updated successfully!');
                                }}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setShowEditModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    backgroundColor: '#6b7280',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BarangayAccessManagement;