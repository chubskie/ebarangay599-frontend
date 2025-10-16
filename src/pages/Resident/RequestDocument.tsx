import React, { useState } from 'react'; 
import ResidentDashboardNav from '../../components/ResidentDashboardNav';
import { 
    FaFileAlt,
    FaCertificate,
    FaBusinessTime,
    FaMedal,
    FaIdCard,
    FaTimes,
    FaSpinner
} from 'react-icons/fa';

interface DocumentType {
    id: string;
    name: string;
    icon: any;
    description: string;
    fee: number;
    processingTime: string;
    color: string;
    requiredFields: string[];
}

interface DocumentRequest {
    id: string;
    type: string;
    status: 'None' | 'For Pickup' | 'In Progress' | 'Rejected';
    requestDate: string;
    completionDate?: string;
    purpose: string;
    fee: number;
}

const RequestDocument: React.FC = () => {
    const [activeSection, setActiveSection] = useState('request');
    const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [purpose, setPurpose] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'now' | 'later' | null>(null);
    const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
    const [sortField, setSortField] = useState<'date' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<'All' | 'None' | 'In Progress' | 'For Pickup' | 'Rejected'>('All');
    const [documentTypeFilter, setDocumentTypeFilter] = useState<string>('All');

    // Sample user data from Dashboard (this would normally come from props or context)
    const userData = {
        uuid: '9f47a2d3-8a4b-4d1f-9e9f-1b6a04f0b3c8',
        username: 'ltrevecedo123',
        fullName: 'Luc Elric Trevecedo',
        contactNumber: '0927 993 2190',
        emergencyContact: 'Not provided',
        birthdate: 'April 2, 2002',
        birthplace: 'Not provided',
        age: '23 years old',
        sex: 'Male',
        weight: 'Not provided',
        height: 'Not provided',
        votersPrecinctNo: 'Not provided',
        businessName: 'Not provided',
        ssnNo: 'Not provided',
        tinNo: 'Not provided',
        civilStatus: 'Single',
        residentTags: 'None',
        address: '0281 Narra Street Old Sta Mesa Manila Barangay 599',
        residencyStatus: 'Owner',
        periodOfResidency: '23 years and 6 months'
    };

    // Document requests history
    const [documentRequests, setDocumentRequests] = useState<DocumentRequest[]>([
        {
            id: 'REQ-2025-001',
            type: 'Barangay Clearance',
            status: 'For Pickup',
            requestDate: 'Oct 10, 2025',
            completionDate: 'Oct 12, 2025',
            purpose: 'Employment Requirements',
            fee: 50
        },
        {
            id: 'REQ-2025-002',
            type: 'Certificate of Indigency',
            status: 'In Progress',
            requestDate: 'Oct 12, 2025',
            purpose: 'Medical Assistance',
            fee: 30
        },
        {
            id: 'REQ-2025-003',
            type: 'Certificate of Residency',
            status: 'Rejected',
            requestDate: 'Oct 01, 2025',
            purpose: 'Legal Documentation',
            fee: 75
        },
        {
            id: 'REQ-2025-004',
            type: 'Good Moral Certificate',
            status: 'None',
            requestDate: 'Oct 14, 2025',
            purpose: 'School Requirements',
            fee: 40
        }
    ]);

    const documentTypes: DocumentType[] = [
        {
            id: 'barangay-clearance',
            name: 'Barangay Clearance',
            icon: FaFileAlt,
            description: 'Certificate of good moral character and standing in the community',
            fee: 50,
            processingTime: '1 business day',
            color: 'bg-blue-500',
            requiredFields: ['fullName', 'contactNumber', 'birthdate', 'age', 'sex', 'civilStatus', 'purpose']
        },
        {
            id: 'certificate-indigency',
            name: 'Certificate of Indigency',
            icon: FaCertificate,
            description: 'Certification for financial assistance and social services',
            fee: 30,
            processingTime: '1 business day',
            color: 'bg-green-500',
            requiredFields: ['fullName', 'contactNumber', 'birthdate', 'age', 'sex', 'civilStatus', 'tinNo', 'purpose']
        },
        {
            id: 'certificate-file-action',
            name: 'Certificate to File Action',
            icon: FaFileAlt,
            description: 'Legal document for filing court cases or legal proceedings',
            fee: 100,
            processingTime: '1 business day',
            color: 'bg-red-500',
            requiredFields: ['fullName', 'contactNumber', 'birthdate', 'age', 'sex', 'civilStatus', 'weight', 'height', 'purpose']
        },
        {
            id: 'business-clearance',
            name: 'Business Clearance',
            icon: FaBusinessTime,
            description: 'Permit for operating business within barangay jurisdiction',
            fee: 200,
            processingTime: '1 business day',
            color: 'bg-purple-500',
            requiredFields: ['fullName', 'contactNumber', 'birthdate', 'age', 'sex', 'civilStatus', 'businessName', 'purpose']
        },
        {
            id: 'good-moral-certificate',
            name: 'Good Moral Certificate',  
            icon: FaMedal,
            description: 'Character reference for employment, education, or other purposes',
            fee: 40,
            processingTime: '1 business day',
            color: 'bg-yellow-500',
            requiredFields: ['fullName', 'contactNumber', 'birthdate', 'age', 'sex', 'civilStatus', 'purpose']
        },
        {
            id: 'senior-citizen-id',
            name: 'Senior Citizen ID',
            icon: FaIdCard,
            description: 'Identification card for senior citizens (60 years and above)',
            fee: 0,
            processingTime: '1 business day',
            color: 'bg-gray-500',
            requiredFields: ['fullName', 'contactNumber', 'birthdate', 'birthplace', 'age', 'sex', 'civilStatus', 'weight', 'height', 'emergencyContact', 'ssnNo', 'purpose']
        }
    ];

    const handleRequestDocument = (documentType: DocumentType) => {
        setSelectedDocument(documentType);
        setShowRequestModal(true);
    };

    const handleSubmitRequest = async () => {
        if (!purpose.trim()) {
            alert('Please specify the purpose of your request.');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            const newRequest: DocumentRequest = {
                id: `REQ-2025-${String(documentRequests.length + 1).padStart(3, '0')}`,
                type: selectedDocument?.name || '',
                status: 'In Progress',
                requestDate: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                purpose: purpose,
                fee: selectedDocument?.fee || 0
            };

            setDocumentRequests([...documentRequests, newRequest]);
            setShowRequestModal(false);
            setSelectedDocument(null);
            setPurpose('');
            setIsSubmitting(false);
            
            // Reset payment states
            setPaymentMethod(null);
            setProofOfPayment(null);
            setShowPaymentModal(false);
            
            if (paymentMethod === 'now') {
                alert('Document request submitted with payment proof! We will verify your payment and process your request.');
            } else {
                alert('Document request submitted! Please pay the processing fee at the Barangay Hall.');
            }
        }, 2000);
    };

    // Filter requests by status
    const filteredByStatus = statusFilter === 'All' 
        ? documentRequests 
        : documentRequests.filter(req => req.status === statusFilter);

    // Filter by document type
    const filteredByDocumentType = documentTypeFilter === 'All'
        ? filteredByStatus
        : filteredByStatus.filter(req => req.type === documentTypeFilter);

    // Sort requests
    const sortedRequests = [...filteredByDocumentType].sort((a, b) => {
        if (!sortField) return 0;

        if (sortField === 'date') {
            const dateA = new Date(a.requestDate).getTime();
            const dateB = new Date(b.requestDate).getTime();
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
                        <FaFileAlt style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>Request New Document</span>
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
                            Document Request Services
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                            Request official documents and certificates from Barangay 599
                        </p>
                    </div>

                    {/* Document Types Grid */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem' 
                        }}>
                            Available Documents
                        </h2>
                        
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                            gap: '1.5rem' 
                        }}>
                            {documentTypes.map((doc) => {
                                const IconComponent = doc.icon;
                                return (
                                    <div
                                        key={doc.id}
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
                                        onClick={() => handleRequestDocument(doc)}
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
                                                backgroundColor: doc.color.replace('bg-', '').includes('blue') ? '#dbeafe' :
                                                                 doc.color.replace('bg-', '').includes('green') ? '#dcfce7' :
                                                                 doc.color.replace('bg-', '').includes('red') ? '#fee2e2' :
                                                                 doc.color.replace('bg-', '').includes('purple') ? '#f3e8ff' :
                                                                 doc.color.replace('bg-', '').includes('yellow') ? '#fef3c7' : '#f3f4f6'
                                            }}>
                                                <IconComponent style={{ 
                                                    width: '1.5rem', 
                                                    height: '1.5rem',
                                                    color: doc.color.replace('bg-', '').includes('blue') ? '#3b82f6' :
                                                           doc.color.replace('bg-', '').includes('green') ? '#10b981' :
                                                           doc.color.replace('bg-', '').includes('red') ? '#ef4444' :
                                                           doc.color.replace('bg-', '').includes('purple') ? '#8b5cf6' :
                                                           doc.color.replace('bg-', '').includes('yellow') ? '#f59e0b' : '#6b7280'
                                                }} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                                    {doc.name}
                                                </h3>
                                                <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '500' }}>
                                                    ₱{doc.fee} • {doc.processingTime}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                                            {doc.description}
                                        </p>

                                        <button
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#2563eb';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#3b82f6';
                                            }}
                                        >
                                            Request Document
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Request History */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h2 style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: '600', 
                                color: '#1f2937',
                                margin: 0
                            }}>
                                My Document Requests
                            </h2>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status:</span>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
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
                                        onChange={(e) => setDocumentTypeFilter(e.target.value)}
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
                                        <option value="Certificate of Residency">Certificate of Residency</option>
                                        <option value="Good Moral Certificate">Good Moral Certificate</option>
                                        <option value="Business Permit">Business Permit</option>
                                        <option value="Community Tax Certificate">Community Tax Certificate</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden'
                        }}>
                            {sortedRequests.length === 0 ? (
                                <div style={{ padding: '3rem', textAlign: 'center' }}>
                                    <FaFileAlt style={{ width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem' }} />
                                    <p style={{ color: '#6b7280', fontSize: '1rem' }}>No document requests yet</p>
                                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                                        Start by requesting a document from the available options above
                                    </p>
                                </div>
                            ) : (
                                <div style={{ overflow: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f9fafb' }}>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Request ID
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Document Type
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Purpose
                                                </th>
                                                <th 
                                                    onClick={() => handleSort('date')}
                                                    style={{ 
                                                        padding: '1rem', 
                                                        textAlign: 'left', 
                                                        fontSize: '0.875rem', 
                                                        fontWeight: '600', 
                                                        color: '#374151',
                                                        cursor: 'pointer',
                                                        userSelect: 'none'
                                                    }}
                                                >
                                                    Request Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Status
                                                </th>
                                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                                    Fee
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedRequests.map((request) => (
                                                <tr key={request.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937', fontFamily: 'monospace' }}>
                                                        {request.id}
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                                                        {request.type}
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                                        {request.purpose}
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>
                                                        {request.requestDate}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            padding: '0.375rem 0.75rem',
                                                            borderRadius: '0.375rem',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '600',
                                                            backgroundColor: 
                                                                request.status === 'None' ? '#f3f4f6' :
                                                                request.status === 'In Progress' ? '#dbeafe' :
                                                                request.status === 'For Pickup' ? '#d1fae5' :
                                                                request.status === 'Rejected' ? '#fee2e2' :
                                                                '#f3f4f6',
                                                            color:
                                                                request.status === 'None' ? '#6b7280' :
                                                                request.status === 'In Progress' ? '#1e40af' :
                                                                request.status === 'For Pickup' ? '#065f46' :
                                                                request.status === 'Rejected' ? '#991b1b' :
                                                                '#6b7280'
                                                        }}>
                                                            {request.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937', fontWeight: '500' }}>
                                                        ₱{request.fee}
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

            {/* Request Modal */}
            {showRequestModal && selectedDocument && (
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
                                Request {selectedDocument.name}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowRequestModal(false);
                                    setSelectedDocument(null);
                                    setPurpose('');
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

                        {/* Document Info */}
                        <div style={{ 
                            backgroundColor: '#f9fafb', 
                            borderRadius: '0.5rem', 
                            padding: '1rem', 
                            marginBottom: '1.5rem' 
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Processing Fee:</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                                    ₱{selectedDocument.fee}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Processing Time:</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                                    {selectedDocument.processingTime}
                                </span>
                            </div>
                        </div>

                        {/* User Information Preview */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Required Information for this Document
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                                {selectedDocument.requiredFields.includes('uuid') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Resident UUID:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.uuid}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('username') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Username:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.username}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('fullName') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Full Name:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.fullName}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('contactNumber') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Contact Number:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.contactNumber}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('emergencyContact') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Emergency Contact:</span>
                                        <p style={{ color: userData.emergencyContact !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.emergencyContact !== 'Not provided' ? 'normal' : 'italic' }}>{userData.emergencyContact}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('birthdate') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Birthdate:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.birthdate}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('birthplace') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Birthplace:</span>
                                        <p style={{ color: userData.birthplace !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.birthplace !== 'Not provided' ? 'normal' : 'italic' }}>{userData.birthplace}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('age') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Age:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.age}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('sex') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Sex:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.sex}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('weight') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Weight:</span>
                                        <p style={{ color: userData.weight !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.weight !== 'Not provided' ? 'normal' : 'italic' }}>{userData.weight}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('height') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Height:</span>
                                        <p style={{ color: userData.height !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.height !== 'Not provided' ? 'normal' : 'italic' }}>{userData.height}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('votersPrecinctNo') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Voters Precinct No:</span>
                                        <p style={{ color: userData.votersPrecinctNo !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.votersPrecinctNo !== 'Not provided' ? 'normal' : 'italic' }}>{userData.votersPrecinctNo}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('businessName') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Business Name:</span>
                                        <p style={{ color: userData.businessName !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.businessName !== 'Not provided' ? 'normal' : 'italic' }}>{userData.businessName}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('ssnNo') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>SSN No:</span>
                                        <p style={{ color: userData.ssnNo !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.ssnNo !== 'Not provided' ? 'normal' : 'italic' }}>{userData.ssnNo}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('tinNo') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>TIN No:</span>
                                        <p style={{ color: userData.tinNo !== 'Not provided' ? '#1f2937' : '#9ca3af', fontWeight: '500', margin: '0.25rem 0', fontStyle: userData.tinNo !== 'Not provided' ? 'normal' : 'italic' }}>{userData.tinNo}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('civilStatus') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Civil Status:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.civilStatus}</p>
                                    </div>
                                )}
                                {selectedDocument.requiredFields.includes('residentTags') && (
                                    <div>
                                        <span style={{ color: '#6b7280' }}>Resident Tags:</span>
                                        <p style={{ color: '#1f2937', fontWeight: '500', margin: '0.25rem 0' }}>{userData.residentTags}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Purpose Input */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ 
                                display: 'block', 
                                fontSize: '0.875rem', 
                                fontWeight: '500', 
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Purpose of Request *
                            </label>
                            <textarea
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="Please specify the purpose for requesting this document..."
                                style={{
                                    width: '100%',
                                    minHeight: '100px',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                }}
                            />
                        </div>

                        {/* Action Buttons - Payment Options */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowRequestModal(false);
                                    setSelectedDocument(null);
                                    setPurpose('');
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
                                onClick={() => {
                                    if (!purpose.trim()) {
                                        alert('Please specify the purpose for requesting this document.');
                                        return;
                                    }
                                    setPaymentMethod('later');
                                    handleSubmitRequest();
                                }}
                                disabled={isSubmitting || !purpose.trim()}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: !purpose.trim() || isSubmitting ? '#9ca3af' : '#6b7280',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: !purpose.trim() || isSubmitting ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Pay Later (at Barangay Hall)
                            </button>
                            <button
                                onClick={() => {
                                    if (!purpose.trim()) {
                                        alert('Please specify the purpose for requesting this document.');
                                        return;
                                    }
                                    setShowPaymentModal(true);
                                }}
                                disabled={isSubmitting || !purpose.trim()}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: !purpose.trim() || isSubmitting ? '#9ca3af' : '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: !purpose.trim() || isSubmitting ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Pay Now (Online)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
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
                        {/* Payment Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                Payment Information
                            </h2>
                            <button
                                onClick={() => {
                                    setShowPaymentModal(false);
                                    setProofOfPayment(null);
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
                                    justifyContent: 'center'
                                }}
                            >
                                <FaTimes style={{ width: '1rem', height: '1rem', color: '#6b7280' }} />
                            </button>
                        </div>

                        {/* Document and Fee Info */}
                        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
                                {selectedDocument?.name}
                            </p>
                            <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#3b82f6', margin: 0 }}>
                                Processing Fee: ₱{selectedDocument?.fee}
                            </p>
                        </div>

                        {/* Payment Instructions */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Send Payment To:
                            </h3>
                            <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                                <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
                                    Barangay Treasurer: Kimberly Advincula
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', margin: '0 0 0.25rem 0' }}>
                                            GCash Number:
                                        </p>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                            09XX XXX XXXX
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', margin: '0 0 0.25rem 0' }}>
                                            Maya Number:
                                        </p>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                            09XX XXX XXXX
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upload Proof of Payment */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                Upload Proof of Payment *
                            </label>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => setProofOfPayment(e.target.files?.[0] || null)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}
                            />
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                                Accepted formats: JPG, PNG, PDF (Max 5MB)
                            </p>
                        </div>

                        {/* Payment Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowPaymentModal(false);
                                    setProofOfPayment(null);
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
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!proofOfPayment) {
                                        alert('Please upload proof of payment.');
                                        return;
                                    }
                                    setPaymentMethod('now');
                                    setShowPaymentModal(false);
                                    handleSubmitRequest();
                                }}
                                disabled={isSubmitting || !proofOfPayment}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: !proofOfPayment || isSubmitting ? '#9ca3af' : '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: !proofOfPayment || isSubmitting ? 'not-allowed' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isSubmitting && <FaSpinner style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />}
                                {isSubmitting ? 'Submitting...' : 'Submit with Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestDocument;