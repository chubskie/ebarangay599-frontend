import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaSearch, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

interface Resident {
    id: number;
    fullName: string;
    contactNumber: string;
}

const ComposeMessage: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('compose-message');
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedResidents, setSelectedResidents] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    
    // Message form data
    const [messageData, setMessageData] = useState({
        contactNumber: '',
        message: ''
    });

    const [isSending, setIsSending] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Role protection
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn || userRole !== 'chairwoman') {
            navigate('/login');
            return;
        }
    }, [navigate]);

    // Sample resident data
    const [residents] = useState<Resident[]>([
        { id: 1, fullName: 'Luc Elric Trevecedo', contactNumber: '0927 993 2190' },
        { id: 2, fullName: 'jewel nicole Maming', contactNumber: '09972858407' },
        { id: 3, fullName: 'Maria Santos', contactNumber: '09181234567' },
        { id: 4, fullName: 'Juan Dela Cruz', contactNumber: '09191234567' },
        { id: 5, fullName: 'Ana Reyes', contactNumber: '09201234567' },
        { id: 6, fullName: 'Pedro Garcia', contactNumber: '09211234567' },
        { id: 7, fullName: 'Rosa Martinez', contactNumber: '09221234567' },
        { id: 8, fullName: 'Carlos Ramos', contactNumber: '09231234567' },
        { id: 9, fullName: 'Linda Cruz', contactNumber: '09241234567' },
        { id: 10, fullName: 'Roberto Santos', contactNumber: '09251234567' },
        { id: 11, fullName: 'Elena Flores', contactNumber: '09261234567' },
        { id: 12, fullName: 'Miguel Torres', contactNumber: '09271234567' },
        { id: 13, fullName: 'Sofia Gonzales', contactNumber: '09281234567' },
        { id: 14, fullName: 'Diego Fernandez', contactNumber: '09291234567' },
        { id: 15, fullName: 'Carmen Lopez', contactNumber: '09301234567' }
    ]);

    // Filter residents based on search term
    const filteredResidents = residents.filter(resident =>
        resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.contactNumber.includes(searchTerm)
    );

    // Pagination
    const totalPages = Math.ceil(filteredResidents.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentResidents = filteredResidents.slice(startIndex, endIndex);

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

    // Handle select all
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedResidents([]);
        } else {
            setSelectedResidents(currentResidents.map(r => r.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle individual selection
    const handleSelectResident = (residentId: number) => {
        if (selectedResidents.includes(residentId)) {
            setSelectedResidents(selectedResidents.filter(id => id !== residentId));
            setSelectAll(false);
        } else {
            const newSelected = [...selectedResidents, residentId];
            setSelectedResidents(newSelected);
            if (newSelected.length === currentResidents.length) {
                setSelectAll(true);
            }
        }
    };

    // Handle send message
    const handleSendMessage = () => {
        if (!messageData.message.trim()) {
            alert('Please enter a message.');
            return;
        }

        if (!messageData.contactNumber.trim() && selectedResidents.length === 0) {
            alert('Please enter a contact number or select recipients from the list.');
            return;
        }

        setIsSending(true);
        // Simulate sending SMS
        setTimeout(() => {
            setIsSending(false);
            setShowSuccessModal(true);
            // Reset form
            setMessageData({ contactNumber: '', message: '' });
            setSelectedResidents([]);
            setSelectAll(false);
        }, 1500);
    };

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
                        Compose a Message
                    </h1>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem',
                        marginBottom: 0
                    }}>
                        Send SMS messages to residents
                    </p>
                </header>

                {/* Main Content */}
                <main style={{ padding: '2rem' }}>
                    {/* Message Composition Form */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        padding: '1.5rem',
                        marginBottom: '1.5rem'
                    }}>
                        <h2 style={{ 
                            fontSize: '1.125rem', 
                            fontWeight: '600', 
                            color: '#1f2937',
                            marginTop: 0,
                            marginBottom: '1rem'
                        }}>
                            Compose SMS Message
                        </h2>

                        {/* Contact Number */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Contact Number
                            </label>
                            {/* Display selected numbers as chips */}
                            {selectedResidents.length > 0 ? (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                    padding: '0.625rem 1rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    minHeight: '42px',
                                    backgroundColor: 'white'
                                }}>
                                    {residents
                                        .filter(resident => selectedResidents.includes(resident.id))
                                        .map(resident => (
                                            <div
                                                key={resident.id}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.25rem 0.75rem',
                                                    backgroundColor: '#e0e7ff',
                                                    color: '#3730a3',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                <span>{resident.contactNumber}</span>
                                                <button
                                                    onClick={() => handleSelectResident(resident.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#4338ca',
                                                        cursor: 'pointer',
                                                        padding: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: '1rem',
                                                        fontWeight: 'bold',
                                                        lineHeight: 1
                                                    }}
                                                    title="Remove"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Select recipients from the list below"
                                    value={messageData.contactNumber}
                                    onChange={(e) => setMessageData({ ...messageData, contactNumber: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem 1rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            )}
                        </div>

                        {/* Message */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Message Details *
                            </label>
                            <textarea
                                placeholder="Enter your message here..."
                                value={messageData.message}
                                onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 1rem',
                                    fontSize: '0.875rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                            <div style={{ 
                                fontSize: '0.75rem', 
                                color: '#6b7280',
                                marginTop: '0.25rem'
                            }}>
                                {messageData.message.length} characters
                            </div>
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={handleSendMessage}
                            disabled={isSending}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: isSending ? '#9ca3af' : '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                cursor: isSending ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSending) e.currentTarget.style.backgroundColor = '#2563eb';
                            }}
                            onMouseLeave={(e) => {
                                if (!isSending) e.currentTarget.style.backgroundColor = '#3b82f6';
                            }}
                        >
                            <FaPaperPlane />
                            {isSending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    {/* Residents List */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid #e5e7eb'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.125rem', 
                                fontWeight: '600', 
                                color: '#1f2937',
                                marginTop: 0,
                                marginBottom: '1rem'
                            }}>
                                Select Recipients from Resident List
                            </h2>

                            {/* Controls */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Show</span>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => {
                                            setEntriesPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        style={{
                                            padding: '0.5rem',
                                            fontSize: '0.875rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>entries</span>
                                </div>

                                <div style={{ position: 'relative', flex: '0 1 300px' }}>
                                    <FaSearch style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af',
                                        fontSize: '1rem'
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Search residents..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '0.625rem 2.75rem 0.625rem 1rem',
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

                            {selectedResidents.length > 0 && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#eff6ff',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    color: '#1e40af'
                                }}>
                                    {selectedResidents.length} resident(s) selected
                                </div>
                            )}
                        </div>

                        {/* Table */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f9fafb' }}>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb',
                                            width: '50px'
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={selectAll && currentResidents.length > 0}
                                                onChange={handleSelectAll}
                                                style={{
                                                    width: '1rem',
                                                    height: '1rem',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Full Name
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Contact Number
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentResidents.length > 0 ? (
                                        currentResidents.map((resident, index) => (
                                            <tr 
                                                key={resident.id}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}
                                            >
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedResidents.includes(resident.id)}
                                                        onChange={() => handleSelectResident(resident.id)}
                                                        style={{
                                                            width: '1rem',
                                                            height: '1rem',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {resident.fullName}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {resident.contactNumber}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td 
                                                colSpan={3} 
                                                style={{
                                                    padding: '3rem',
                                                    textAlign: 'center',
                                                    color: '#6b7280',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                No residents found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer with entry count and pagination */}
                        {filteredResidents.length > 0 && (
                            <div style={{
                                padding: '1rem 1.5rem',
                                borderTop: '1px solid #e5e7eb',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                    Showing {startIndex + 1} to {Math.min(endIndex, filteredResidents.length)} of {filteredResidents.length} entries
                                </div>

                                {/* Pagination */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <button
                                        onClick={goToFirstPage}
                                        disabled={currentPage === 1}
                                        style={{
                                            padding: '0.5rem 0.875rem',
                                            backgroundColor: 'white',
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
                                            padding: '0.5rem 0.875rem',
                                            backgroundColor: 'white',
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
                                            padding: '0.5rem 0.875rem',
                                            backgroundColor: 'white',
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
                                            padding: '0.5rem 0.875rem',
                                            backgroundColor: 'white',
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
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
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
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <FaCheckCircle style={{
                            fontSize: '3rem',
                            color: '#22c55e',
                            marginBottom: '1rem'
                        }} />
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginTop: 0,
                            marginBottom: '0.5rem'
                        }}>
                            Message Sent Successfully!
                        </h3>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            marginBottom: '1.5rem'
                        }}>
                            Your SMS has been sent to the selected recipients.
                        </p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            style={{
                                padding: '0.75rem 1.5rem',
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
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComposeMessage;
