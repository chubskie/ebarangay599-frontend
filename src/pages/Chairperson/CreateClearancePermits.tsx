import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaSearch, FaFileAlt } from 'react-icons/fa';

// Document/Report types
type DocumentType = 
    | 'Barangay Clearance'
    | 'Certificate of Indigency'
    | 'Certificate to File Action'
    | 'Business Clearance'
    | 'Barangay ID'
    | 'Good Moral Certificate'
    | 'Senior Citizen ID';

type DocumentStatus = 'None' | 'In Progress' | 'For Pickup' | 'Rejected';

interface DocumentRequest {
    id: number;
    fullName: string;
    contactNumber: string;
    documentType: DocumentType;
    purpose: string;
    quantity: number;
    pickupDate: string;
    pickupTime: string;
    status: DocumentStatus;
    submittedDate: string;
}

const CreateClearancePermits: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('clearance-permits');
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [requests, setRequests] = useState<DocumentRequest[]>([]);
    const [sortField, setSortField] = useState<'date' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<'All' | 'None' | 'In Progress' | 'For Pickup' | 'Rejected'>('All');
    const [documentTypeFilter, setDocumentTypeFilter] = useState<'All' | DocumentType>('All');

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
        const sampleRequests: DocumentRequest[] = [
            {
                id: 1,
                fullName: 'Michael Mislang',
                contactNumber: '09123456789',
                documentType: 'Certificate of Indigency',
                purpose: 'trip lang po',
                quantity: 1,
                pickupDate: '1231231',
                pickupTime: '1322',
                status: 'For Pickup',
                submittedDate: '2025-10-15'
            },
            {
                id: 2,
                fullName: 'jewel nicole Maming',
                contactNumber: '09972858407',
                documentType: 'Certificate of Indigency',
                purpose: 'Financial Assistance',
                quantity: 1,
                pickupDate: 'September 29, 2025',
                pickupTime: '08:52 AM',
                status: 'For Pickup',
                submittedDate: '2025-09-28'
            },
            {
                id: 3,
                fullName: 'Maria Santos',
                contactNumber: '09181234567',
                documentType: 'Barangay Clearance',
                purpose: 'Employment',
                quantity: 1,
                pickupDate: 'October 10, 2025',
                pickupTime: '10:00 AM',
                status: 'For Pickup',
                submittedDate: '2025-10-08'
            },
            {
                id: 4,
                fullName: 'Juan Dela Cruz',
                contactNumber: '09191234567',
                documentType: 'Certificate to File Action',
                purpose: 'Bank Requirements',
                quantity: 2,
                pickupDate: '-',
                pickupTime: '-',
                status: 'In Progress',
                submittedDate: '2025-10-14'
            },
            {
                id: 5,
                fullName: 'Ana Reyes',
                contactNumber: '09201234567',
                documentType: 'Business Clearance',
                purpose: 'New Business',
                quantity: 1,
                pickupDate: 'October 12, 2025',
                pickupTime: '02:30 PM',
                status: 'For Pickup',
                submittedDate: '2025-10-11'
            },
            {
                id: 6,
                fullName: 'Pedro Garcia',
                contactNumber: '09211234567',
                documentType: 'Good Moral Certificate',
                purpose: 'School Requirements',
                quantity: 1,
                pickupDate: '-',
                pickupTime: '-',
                status: 'Rejected',
                submittedDate: '2025-10-13'
            },
            {
                id: 7,
                fullName: 'Rosa Santos',
                contactNumber: '09221234567',
                documentType: 'Barangay ID',
                purpose: 'Personal Identification',
                quantity: 1,
                pickupDate: 'October 18, 2025',
                pickupTime: '09:00 AM',
                status: 'For Pickup',
                submittedDate: '2025-10-12'
            },
            {
                id: 8,
                fullName: 'Ricardo Cruz',
                contactNumber: '09231234567',
                documentType: 'Senior Citizen ID',
                purpose: 'Senior Citizen Benefits',
                quantity: 1,
                pickupDate: '-',
                pickupTime: '-',
                status: 'In Progress',
                submittedDate: '2025-10-15'
            }
        ];
        setRequests(sampleRequests);
    }, []);

    // Filter requests based on search term
    const filteredRequests = requests.filter(request =>
        request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.contactNumber.includes(searchTerm) ||
        request.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by status
    const filteredByStatus = statusFilter === 'All'
        ? filteredRequests
        : filteredRequests.filter(req => req.status === statusFilter);

    // Filter by document type
    const filteredByDocumentType = documentTypeFilter === 'All'
        ? filteredByStatus
        : filteredByStatus.filter(req => req.documentType === documentTypeFilter);

    // Sort requests
    const sortedRequests = [...filteredByDocumentType].sort((a, b) => {
        if (!sortField) return 0;

        if (sortField === 'date') {
            const dateA = new Date(a.submittedDate).getTime();
            const dateB = new Date(b.submittedDate).getTime();
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return 0;
    });

    // Handle sort
    const handleSort = (field: 'date') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Pagination
    const totalPages = Math.ceil(sortedRequests.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentRequests = sortedRequests.slice(startIndex, endIndex);

    // Handle generate document
    const handleGenerate = (request: DocumentRequest) => {
        alert(`Generating ${request.documentType} for ${request.fullName}...`);
        // This would trigger the document generation logic
    };

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

    // Get status badge style
    const getStatusStyle = (status: DocumentStatus) => {
        switch (status) {
            case 'None':
                return {
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'inline-block'
                };
            case 'In Progress':
                return {
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'inline-block'
                };
            case 'For Pickup':
                return {
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'inline-block'
                };
            case 'Rejected':
                return {
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'inline-block'
                };
            default:
                return {};
        }
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
                        Create Clearance and Permits
                    </h1>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem',
                        marginBottom: 0
                    }}>
                        Manage document requests for clearances, permits, and certificates
                    </p>
                </header>

                {/* Main Content */}
                <main style={{ padding: '2rem' }}>
                    {/* Controls */}
                    <div style={{ 
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status:</span>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value as typeof statusFilter);
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        padding: '0.5rem 2rem 0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="All">All Status</option>
                                    <option value="None">None</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="For Pickup">For Pickup</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Document Type:</span>
                                <select
                                    value={documentTypeFilter}
                                    onChange={(e) => {
                                        setDocumentTypeFilter(e.target.value as typeof documentTypeFilter);
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        padding: '0.5rem 2rem 0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="All">All Documents</option>
                                    <option value="Barangay Clearance">Barangay Clearance</option>
                                    <option value="Certificate of Indigency">Certificate of Indigency</option>
                                    <option value="Certificate to File Action">Certificate to File Action</option>
                                    <option value="Business Clearance">Business Clearance</option>
                                    <option value="Barangay ID">Barangay ID</option>
                                    <option value="Good Moral Certificate">Good Moral Certificate</option>
                                    <option value="Senior Citizen ID">Senior Citizen ID</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ position: 'relative', flex: '0 1 400px' }}>
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
                                placeholder="Search documents..."
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

                    {/* Requests Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#dbeafe', borderBottom: '2px solid #93c5fd' }}>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Full Name
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Contact Number
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Document Type
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Purpose
                                        </th>
                                        <th 
                                            onClick={() => handleSort('date')}
                                            style={{
                                                padding: '1rem',
                                                textAlign: 'left',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: '#5b8fb9',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            Request Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Quantity
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Pickup Date
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Pickup Time
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Status
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#5b8fb9'
                                        }}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRequests.length > 0 ? (
                                        currentRequests.map((request, index) => (
                                            <tr 
                                                key={request.id}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}
                                            >
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {request.fullName}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {request.contactNumber}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {request.documentType}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {request.purpose}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {request.submittedDate}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    textAlign: 'center'
                                                }}>
                                                    {request.quantity}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {request.pickupDate}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {request.pickupTime}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    <select
                                                        value={request.status}
                                                        onChange={(e) => {
                                                            const newStatus = e.target.value as DocumentStatus;
                                                            setRequests(requests.map(r => 
                                                                r.id === request.id ? { ...r, status: newStatus } : r
                                                            ));
                                                        }}
                                                        style={{
                                                            ...getStatusStyle(request.status),
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            outline: 'none'
                                                        }}
                                                    >
                                                        <option value="None">None</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="For Pickup">For Pickup</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                        <button
                                                            onClick={() => handleGenerate(request)}
                                                            style={{
                                                                padding: '0.5rem 0.875rem',
                                                                backgroundColor: '#3b82f6',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.375rem',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                                        >
                                                            <FaFileAlt /> Generate
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td 
                                                colSpan={9} 
                                                style={{
                                                    padding: '3rem',
                                                    textAlign: 'center',
                                                    color: '#6b7280',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                No requests found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer with entry count and pagination */}
                        {sortedRequests.length > 0 && (
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
                                    Showing {startIndex + 1} to {Math.min(endIndex, sortedRequests.length)} of {sortedRequests.length} entries
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
        </div>
    );
};

export default CreateClearancePermits;
