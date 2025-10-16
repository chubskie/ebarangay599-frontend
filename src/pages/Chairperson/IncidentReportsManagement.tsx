import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaEye, FaImage, FaTimes, FaSearch } from 'react-icons/fa';

// Incident types
type IncidentType = 'Community Concern' | 'Blotter' | 'VAWC';
type IncidentStatus = 'None' | 'In Progress' | 'Resolved';

interface IncidentReport {
    id: number;
    complaintId: string;
    incidentType: IncidentType;
    subject: string;
    location: string;
    reportDate: string;
    status: IncidentStatus;
    // Additional details for modal
    reportedBy: string;
    contactNumber?: string;
    emailAddress?: string;
    incidentDetails: string;
    assignedOfficial?: string;
    evidence: boolean;
    evidenceUrl?: string;
}

const IncidentReportsManagement: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('incident-reports');
    const [reports, setReports] = useState<IncidentReport[]>([]);
    const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
    const [newStatus, setNewStatus] = useState<IncidentStatus>('None');
    const [assignedOfficial, setAssignedOfficial] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<'date' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [incidentTypeFilter, setIncidentTypeFilter] = useState<'All' | IncidentType>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | IncidentStatus>('All');

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
        const sampleReports: IncidentReport[] = [
            {
                id: 1,
                complaintId: 'C-2025-001',
                incidentType: 'Community Concern',
                subject: 'Excessive noise from residential party',
                location: 'Anonas Street',
                reportDate: '2025-09-27',
                status: 'None',
                reportedBy: 'jewel nicole Maming',
                contactNumber: '09972858407',
                emailAddress: 'mamingjewel30@gmail.com',
                incidentDetails: 'Excessive noise from a residential party continuing past midnight. Multiple neighbors have complained about the disturbance.',
                evidence: false
            },
            {
                id: 2,
                complaintId: 'C-2025-002',
                incidentType: 'Blotter',
                subject: 'Minor theft incident',
                location: 'Molave Street',
                reportDate: '2025-10-10',
                status: 'In Progress',
                reportedBy: 'Maria Santos',
                contactNumber: '09181234567',
                emailAddress: 'maria.santos@email.com',
                incidentDetails: 'Bicycle reported missing outside Narra St. sari-sari store. Investigation ongoing.',
                assignedOfficial: 'Kagawad J. Santos',
                evidence: true,
                evidenceUrl: '/evidence/blotter-1.jpg'
            },
            {
                id: 3,
                complaintId: 'C-2025-003',
                incidentType: 'VAWC',
                subject: 'Domestic violence incident reported',
                location: 'Block 5, Zone 59',
                reportDate: '2025-10-08',
                status: 'Resolved',
                reportedBy: 'Juan Dela Cruz',
                contactNumber: '09191234567',
                emailAddress: 'juan.delacruz@email.com',
                incidentDetails: 'Report of domestic violence incident. Victim provided protection and assistance. Case has been resolved.',
                assignedOfficial: 'Barangay Tanod R. Cruz',
                evidence: false
            },
            {
                id: 4,
                complaintId: 'C-2025-004',
                incidentType: 'Community Concern',
                subject: 'Boundary dispute between neighbors',
                location: 'Narra Street',
                reportDate: '2025-10-12',
                status: 'None',
                reportedBy: 'Ana Reyes',
                contactNumber: '09201234567',
                emailAddress: 'ana.reyes@email.com',
                incidentDetails: 'Boundary dispute between neighbors regarding property line. Both parties requesting mediation.',
                evidence: true,
                evidenceUrl: '/evidence/dispute-1.jpg'
            },
            {
                id: 5,
                complaintId: 'C-2025-005',
                incidentType: 'Blotter',
                subject: 'Property damage complaint',
                location: 'Sampaguita Avenue',
                reportDate: '2025-10-14',
                status: 'In Progress',
                reportedBy: 'Rosa Martinez',
                contactNumber: '09211234567',
                emailAddress: 'rosa.m@email.com',
                incidentDetails: 'Report of property damage to fence. Incident recorded and investigation ongoing.',
                assignedOfficial: 'Kagawad M. Garcia',
                evidence: false
            }
        ];
        setReports(sampleReports);
    }, []);

    // Handle view details
    const handleViewDetails = (report: IncidentReport) => {
        setSelectedReport(report);
        setShowDetailsModal(true);
    };

    // Handle update status
    const handleUpdateStatus = (report: IncidentReport) => {
        setSelectedReport(report);
        setNewStatus(report.status);
        setAssignedOfficial(report.assignedOfficial || '');
        setShowUpdateStatusModal(true);
    };

    // Save status update
    const handleSaveStatus = () => {
        if (selectedReport) {
            setReports(reports.map(r =>
                r.id === selectedReport.id
                    ? { ...r, status: newStatus, assignedOfficial }
                    : r
            ));
            setShowUpdateStatusModal(false);
            alert('Status updated successfully!');
        }
    };

    // Filter by incident type
    const filteredByType = incidentTypeFilter === 'All'
        ? reports
        : reports.filter(r => r.incidentType === incidentTypeFilter);

    // Filter by status
    const filteredByStatus = statusFilter === 'All'
        ? filteredByType
        : filteredByType.filter(r => r.status === statusFilter);

    // Filter by search term
    const searchFilteredReports = filteredByStatus.filter(report =>
        report.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.incidentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort reports
    const sortedReports = [...searchFilteredReports].sort((a, b) => {
        if (!sortField) return 0;

        if (sortField === 'date') {
            const dateA = new Date(a.reportDate).getTime();
            const dateB = new Date(b.reportDate).getTime();
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }

        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedReports.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentReports = sortedReports.slice(startIndex, endIndex);

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
    const getStatusStyle = (status: IncidentStatus) => {
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
            case 'Resolved':
                return {
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
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
                        Incident Reports Management
                    </h1>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem',
                        marginBottom: 0
                    }}>
                        View and manage incident reports from residents
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
                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Incident Type:</span>
                                <select
                                    value={incidentTypeFilter}
                                    onChange={(e) => {
                                        setIncidentTypeFilter(e.target.value as typeof incidentTypeFilter);
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
                                    <option value="All">All Types</option>
                                    <option value="Community Concern">Community Concern</option>
                                    <option value="Blotter">Blotter</option>
                                    <option value="VAWC">VAWC</option>
                                </select>
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
                                    <option value="Resolved">Resolved</option>
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
                                placeholder="Search reports..."
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

                    {/* Reports Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f3f4f6' }}>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Complaint ID
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Incident Type
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Subject
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            borderBottom: '1px solid #e5e7eb'
                                        }}>
                                            Location
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
                                            Report Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                                            View Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentReports.length > 0 ? (
                                        currentReports.map((report, index) => (
                                            <tr 
                                                key={report.id}
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
                                                {report.complaintId}
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                color: '#1f2937'
                                            }}>
                                                {report.incidentType}
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                color: '#1f2937'
                                            }}>
                                                {report.subject}
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                color: '#1f2937'
                                            }}>
                                                {report.location}
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem',
                                                color: '#1f2937'
                                            }}>
                                                {report.reportDate}
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem'
                                            }}>
                                                <select
                                                    value={report.status}
                                                    onChange={(e) => {
                                                        const newStatus = e.target.value as IncidentStatus;
                                                        setReports(reports.map(r => 
                                                            r.id === report.id 
                                                                ? { ...r, status: newStatus } 
                                                                : r
                                                        ));
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 0.75rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '0.375rem',
                                                        outline: 'none',
                                                        cursor: 'pointer',
                                                        ...getStatusStyle(report.status)
                                                    }}
                                                >
                                                    <option value="None">None</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Resolved">Resolved</option>
                                                </select>
                                            </td>
                                            <td style={{
                                                padding: '1rem',
                                                fontSize: '0.875rem'
                                            }}>
                                                <button
                                                    onClick={() => handleViewDetails(report)}
                                                    style={{
                                                        padding: '0.5rem 0.875rem',
                                                        backgroundColor: '#60a5fa',
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
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#60a5fa'}
                                                >
                                                    <FaEye /> View
                                                </button>
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
                                                No incident reports found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer with entry count and pagination */}
                        {sortedReports.length > 0 && (
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
                                    Showing {startIndex + 1} to {Math.min(endIndex, sortedReports.length)} of {sortedReports.length} entries
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

            {/* View Details Modal */}
            {showDetailsModal && selectedReport && (
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
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: '#1f2937',
                                margin: 0
                            }}>
                                Incident Report Details
                            </h2>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#6b7280',
                                    fontSize: '1.5rem'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                                    Incident Type *
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', margin: 0 }}>
                                    {selectedReport.incidentType}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                                    Subject *
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', margin: 0 }}>
                                    {selectedReport.subject}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                                    Incident Details *
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', margin: 0, lineHeight: '1.5' }}>
                                    {selectedReport.incidentDetails}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                                    Location *
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', margin: 0 }}>
                                    {selectedReport.location}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                                    Status
                                </label>
                                <span style={getStatusStyle(selectedReport.status)}>
                                    {selectedReport.status}
                                </span>
                            </div>
                            {selectedReport.assignedOfficial && (
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                                        Assigned Official
                                    </label>
                                    <p style={{ fontSize: '0.875rem', color: '#1f2937', margin: 0 }}>
                                        {selectedReport.assignedOfficial}
                                    </p>
                                </div>
                            )}
                            {selectedReport.evidence && (
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                                        Evidence
                                    </label>
                                    <p style={{ fontSize: '0.875rem', color: '#3b82f6', margin: 0 }}>
                                        <FaImage style={{ marginRight: '0.5rem' }} />
                                        Evidence file attached
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setShowDetailsModal(false)}
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

            {/* Update Status Modal */}
            {showUpdateStatusModal && selectedReport && (
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
                        maxWidth: '500px',
                        width: '100%'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: '#1f2937',
                                margin: 0
                            }}>
                                Update Incident Status
                            </h2>
                            <button
                                onClick={() => setShowUpdateStatusModal(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#6b7280',
                                    fontSize: '1.5rem'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Complaint ID: {selectedReport.complaintId}
                                </label>
                            </div>
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Status
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value as IncidentStatus)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="None">None</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Assign Barangay Official
                                </label>
                                <input
                                    type="text"
                                    value={assignedOfficial}
                                    onChange={(e) => setAssignedOfficial(e.target.value)}
                                    placeholder="e.g., Kagawad J. Santos"
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
                                onClick={handleSaveStatus}
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
                                onClick={() => setShowUpdateStatusModal(false)}
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

export default IncidentReportsManagement;
