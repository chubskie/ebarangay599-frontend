import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaSearch, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';

type TransactionType = 'Barangay Clearance' | 'Certificate of Indigency' | 'Certificate to File Action' | 'Business Clearance' | 'Barangay ID' | 'Good Moral Certificate' | 'Senior Citizen ID';
type TransactionStatus = 'Completed' | 'Pending' | 'Cancelled';

interface Transaction {
    id: number;
    transactionId: string;
    residentName: string;
    documentType: TransactionType;
    purpose: string;
    fee: number;
    status: TransactionStatus;
    transactionDate: string;
    processedBy: string;
}

const BarangayTransactions: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('transactions');
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<'date' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [statusFilter, setStatusFilter] = useState<'All' | TransactionStatus>('All');
    const [documentTypeFilter, setDocumentTypeFilter] = useState<'All' | TransactionType>('All');

    // Role protection
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn || userRole !== 'chairwoman') {
            navigate('/login');
            return;
        }
    }, [navigate]);

    // Sample transaction data
    const [transactions] = useState<Transaction[]>([
        {
            id: 1,
            transactionId: 'TXN-2025-001',
            residentName: 'Luc Elric Trevecedo',
            documentType: 'Barangay Clearance',
            purpose: 'Employment Requirements',
            fee: 50,
            status: 'Completed',
            transactionDate: '2025-10-15',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 2,
            transactionId: 'TXN-2025-002',
            residentName: 'jewel nicole Maming',
            documentType: 'Certificate of Indigency',
            purpose: 'Financial Assistance',
            fee: 0,
            status: 'Completed',
            transactionDate: '2025-10-14',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 3,
            transactionId: 'TXN-2025-003',
            residentName: 'Maria Santos',
            documentType: 'Business Clearance',
            purpose: 'New Business Registration',
            fee: 200,
            status: 'Pending',
            transactionDate: '2025-10-13',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 4,
            transactionId: 'TXN-2025-004',
            residentName: 'Juan Dela Cruz',
            documentType: 'Certificate to File Action',
            purpose: 'Legal Proceedings',
            fee: 100,
            status: 'Completed',
            transactionDate: '2025-10-12',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 5,
            transactionId: 'TXN-2025-005',
            residentName: 'Ana Reyes',
            documentType: 'Barangay ID',
            purpose: 'Personal Identification',
            fee: 50,
            status: 'Completed',
            transactionDate: '2025-10-11',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 6,
            transactionId: 'TXN-2025-006',
            residentName: 'Pedro Garcia',
            documentType: 'Good Moral Certificate',
            purpose: 'School Requirements',
            fee: 50,
            status: 'Cancelled',
            transactionDate: '2025-10-10',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 7,
            transactionId: 'TXN-2025-007',
            residentName: 'Rosa Martinez',
            documentType: 'Senior Citizen ID',
            purpose: 'Senior Benefits',
            fee: 0,
            status: 'Completed',
            transactionDate: '2025-10-09',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 8,
            transactionId: 'TXN-2025-008',
            residentName: 'Carlos Ramos',
            documentType: 'Barangay Clearance',
            purpose: 'Travel Requirements',
            fee: 50,
            status: 'Completed',
            transactionDate: '2025-10-08',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 9,
            transactionId: 'TXN-2025-009',
            residentName: 'Linda Cruz',
            documentType: 'Certificate of Indigency',
            purpose: 'Medical Assistance',
            fee: 0,
            status: 'Pending',
            transactionDate: '2025-10-07',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 10,
            transactionId: 'TXN-2025-010',
            residentName: 'Roberto Santos',
            documentType: 'Business Clearance',
            purpose: 'Business Renewal',
            fee: 150,
            status: 'Completed',
            transactionDate: '2025-10-06',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 11,
            transactionId: 'TXN-2025-011',
            residentName: 'Elena Flores',
            documentType: 'Barangay Clearance',
            purpose: 'Bank Requirements',
            fee: 50,
            status: 'Completed',
            transactionDate: '2025-10-05',
            processedBy: 'Editha E. Alviso'
        },
        {
            id: 12,
            transactionId: 'TXN-2025-012',
            residentName: 'Miguel Torres',
            documentType: 'Good Moral Certificate',
            purpose: 'Employment',
            fee: 50,
            status: 'Completed',
            transactionDate: '2025-10-04',
            processedBy: 'Editha E. Alviso'
        }
    ]);

    // Filter transactions based on search term
    const filteredTransactions = transactions.filter(transaction =>
        transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by status
    const filteredByStatus = statusFilter === 'All'
        ? filteredTransactions
        : filteredTransactions.filter(t => t.status === statusFilter);

    // Filter by document type
    const filteredByDocumentType = documentTypeFilter === 'All'
        ? filteredByStatus
        : filteredByStatus.filter(t => t.documentType === documentTypeFilter);

    // Sort transactions
    const sortedTransactions = [...filteredByDocumentType].sort((a, b) => {
        if (!sortField) {
            // Default sort by date descending (newest first)
            const dateA = new Date(a.transactionDate).getTime();
            const dateB = new Date(b.transactionDate).getTime();
            return dateB - dateA;
        }

        if (sortField === 'date') {
            const dateA = new Date(a.transactionDate).getTime();
            const dateB = new Date(b.transactionDate).getTime();
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedTransactions.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentTransactions = sortedTransactions.slice(startIndex, endIndex);

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

    // Handle sort
    const handleSort = (field: 'date') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Get status badge style
    const getStatusStyle = (status: TransactionStatus) => {
        switch (status) {
            case 'Completed':
                return {
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'inline-block'
                };
            case 'Pending':
                return {
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'inline-block'
                };
            case 'Cancelled':
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

    // Calculate total revenue
    const totalRevenue = sortedTransactions
        .filter(t => t.status === 'Completed')
        .reduce((sum, t) => sum + t.fee, 0);

    const pendingRevenue = sortedTransactions
        .filter(t => t.status === 'Pending')
        .reduce((sum, t) => sum + t.fee, 0);

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
                        Barangay Transactions
                    </h1>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem',
                        marginBottom: 0
                    }}>
                        View and monitor all barangay document transactions (Read Only)
                    </p>
                </header>

                {/* Main Content */}
                <main style={{ padding: '2rem' }}>
                    {/* Revenue Summary Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        {/* Total Transactions */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            borderLeft: '4px solid #3b82f6'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#6b7280',
                                        margin: '0 0 0.5rem 0'
                                    }}>
                                        Total Transactions
                                    </p>
                                    <p style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#1f2937',
                                        margin: 0
                                    }}>
                                        {sortedTransactions.length}
                                    </p>
                                </div>
                                <FaFileAlt style={{ fontSize: '2rem', color: '#3b82f6', opacity: 0.2 }} />
                            </div>
                        </div>

                        {/* Total Revenue */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            borderLeft: '4px solid #22c55e'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#6b7280',
                                        margin: '0 0 0.5rem 0'
                                    }}>
                                        Total Revenue (Completed)
                                    </p>
                                    <p style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#1f2937',
                                        margin: 0
                                    }}>
                                        ₱{totalRevenue.toLocaleString()}
                                    </p>
                                </div>
                                <FaMoneyBillWave style={{ fontSize: '2rem', color: '#22c55e', opacity: 0.2 }} />
                            </div>
                        </div>

                        {/* Pending Revenue */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            borderLeft: '4px solid #f59e0b'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#6b7280',
                                        margin: '0 0 0.5rem 0'
                                    }}>
                                        Pending Revenue
                                    </p>
                                    <p style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#1f2937',
                                        margin: 0
                                    }}>
                                        ₱{pendingRevenue.toLocaleString()}
                                    </p>
                                </div>
                                <FaMoneyBillWave style={{ fontSize: '2rem', color: '#f59e0b', opacity: 0.2 }} />
                            </div>
                        </div>
                    </div>

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
                                    <option value="Completed">Completed</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Cancelled">Cancelled</option>
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
                                placeholder="Search transactions..."
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

                    {/* Transactions Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
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
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Transaction ID
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Resident Name
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Document Type
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
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
                                                color: '#1f2937',
                                                borderBottom: '1px solid #e5e7eb',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            Transaction Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Fee
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Status
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Processed By
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTransactions.length > 0 ? (
                                        currentTransactions.map((transaction, index) => (
                                            <tr 
                                                key={transaction.id}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}
                                            >
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    fontWeight: '500'
                                                }}>
                                                    {transaction.transactionId}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {transaction.residentName}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {transaction.documentType}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {transaction.purpose}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {transaction.transactionDate}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    fontWeight: '600'
                                                }}>
                                                    ₱{transaction.fee.toLocaleString()}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    <span style={getStatusStyle(transaction.status)}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937'
                                                }}>
                                                    {transaction.processedBy}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td 
                                                colSpan={8} 
                                                style={{
                                                    padding: '3rem',
                                                    textAlign: 'center',
                                                    color: '#6b7280',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                No transactions found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer with entry count and pagination */}
                        {sortedTransactions.length > 0 && (
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
                                    Showing {startIndex + 1} to {Math.min(endIndex, sortedTransactions.length)} of {sortedTransactions.length} entries
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

export default BarangayTransactions;
