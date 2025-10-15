import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaUsers, FaSearch, FaRedo, FaEye, FaCheck, FaTimes, FaFileImage } from 'react-icons/fa';

// Sample resident data
interface Resident {
    id: number;
    uuid: string;
    username: string;
    fullName: string;
    contactNumber: string;
    emergencyContact?: string;
    birthdate: string;
    birthplace?: string;
    age: number;
    sex: string;
    weight?: string;
    height?: string;
    votersPrecinctNo?: string;
    businessName?: string;
    ssnNo?: string;
    tinNo?: string;
    homeAddress: string;
    gender: string;
    civilStatus: string;
    occupation: string;
    incomeRange: string;
    religion: string;
    voter: string;
    pwd: string;
    residentTags: string[];
    status: 'pending' | 'approved' | 'rejected';
    proofs: {
        validId?: string;
        proofOfResidency?: string;
        birthCertificate?: string;
    };
    submittedDate: string;
}

const ResidentManagement: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('resident-management');
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
    const [showProofsModal, setShowProofsModal] = useState(false);
    const [residents, setResidents] = useState<Resident[]>([]);

    // Filters
    const [ageFilter, setAgeFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    const [civilStatusFilter, setCivilStatusFilter] = useState('all');
    const [incomeFilter, setIncomeFilter] = useState('all');
    const [voterFilter, setVoterFilter] = useState('all');
    const [pwdFilter, setPwdFilter] = useState('all');

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
        const sampleData: Resident[] = [
            {
                id: 1,
                uuid: '9f47a2d3-8a4b-4d1f-9e9f-1b6a04f0b3c8',
                username: 'ltrevecedo123',
                fullName: 'Luc Elric Trevecedo',
                contactNumber: '0927 993 2190',
                emergencyContact: 'Not provided',
                birthdate: 'April 2, 2002',
                birthplace: 'Not provided',
                age: 23,
                sex: 'Male',
                weight: 'Not provided',
                height: 'Not provided',
                votersPrecinctNo: 'Not provided',
                businessName: 'Not provided',
                ssnNo: 'Not provided',
                tinNo: 'Not provided',
                homeAddress: 'A501 El Pueblo',
                gender: 'Male',
                civilStatus: 'Single',
                occupation: 'Student',
                incomeRange: 'None',
                religion: 'Roman Catholic',
                voter: 'yes',
                pwd: 'no',
                residentTags: [],
                status: 'pending',
                proofs: {
                    validId: '/images/sample-id-1.jpg',
                    proofOfResidency: '/images/sample-residency-1.jpg',
                    birthCertificate: '/images/sample-birth-cert-1.jpg'
                },
                submittedDate: '2025-10-10'
            },
            {
                id: 2,
                uuid: '8e36b1c2-7b3a-3c2e-8d8e-0a5b93e9a2b7',
                username: 'jmamimg456',
                fullName: 'jewel nicole Mamimg',
                contactNumber: '0915 234 5678',
                emergencyContact: '0916 345 6789',
                birthdate: 'June 15, 2001',
                birthplace: 'Olongapo City',
                age: 24,
                sex: 'Female',
                weight: '52kg',
                height: '160cm',
                votersPrecinctNo: '0599A',
                businessName: 'Not provided',
                ssnNo: 'Not provided',
                tinNo: '123-456-789',
                homeAddress: 'AA106 El Pueblo',
                gender: 'Female',
                civilStatus: 'Single',
                occupation: 'Government Employee',
                incomeRange: 'Lower Middle Class',
                religion: 'Roman Catholic',
                voter: 'yes',
                pwd: 'no',
                residentTags: ['Taxpayer'],
                status: 'approved',
                proofs: {
                    validId: '/images/sample-id-2.jpg',
                    proofOfResidency: '/images/sample-residency-2.jpg'
                },
                submittedDate: '2025-10-08'
            },
            {
                id: 3,
                uuid: '7d25a0b1-6a29-2b1d-7c7d-9948e2d8a1b6',
                username: 'lmatias789',
                fullName: 'Liam Matias',
                contactNumber: '0918 765 4321',
                birthdate: 'March 22, 2004',
                age: 21,
                sex: 'Male',
                homeAddress: 'AA106 El Pueblo',
                gender: 'Male',
                civilStatus: 'Single',
                occupation: 'Student',
                incomeRange: 'None',
                religion: 'Protestant',
                voter: 'yes',
                pwd: 'no',
                residentTags: [],
                status: 'pending',
                proofs: {
                    validId: '/images/sample-id-3.jpg',
                    birthCertificate: '/images/sample-birth-cert-3.jpg'
                },
                submittedDate: '2025-10-12'
            },
            {
                id: 4,
                uuid: '6c14998a-5918-1a0c-6b6c-8837d1c79095',
                username: 'msantos321',
                fullName: 'Maria Santos',
                contactNumber: '0919 876 5432',
                emergencyContact: '0920 987 6543',
                birthdate: 'January 10, 1990',
                birthplace: 'Manila',
                age: 35,
                sex: 'Female',
                weight: '58kg',
                height: '165cm',
                votersPrecinctNo: '0599B',
                tinNo: '234-567-890',
                homeAddress: 'B201 San Vicente',
                gender: 'Female',
                civilStatus: 'Married',
                occupation: 'Teacher',
                incomeRange: 'Middle Class',
                religion: 'Roman Catholic',
                voter: 'yes',
                pwd: 'no',
                residentTags: ['Professional', 'Taxpayer'],
                status: 'approved',
                proofs: {
                    validId: '/images/sample-id-4.jpg',
                    proofOfResidency: '/images/sample-residency-4.jpg',
                    birthCertificate: '/images/sample-birth-cert-4.jpg'
                },
                submittedDate: '2025-10-05'
            },
            {
                id: 5,
                uuid: '5b03887a-4807-0909-5a5b-7726c0b68084',
                username: 'jdelacruz654',
                fullName: 'Juan Dela Cruz',
                contactNumber: '0921 123 4567',
                emergencyContact: '0922 234 5678',
                birthdate: 'November 5, 1980',
                birthplace: 'Zambales',
                age: 45,
                sex: 'Male',
                weight: '75kg',
                height: '175cm',
                votersPrecinctNo: '0599C',
                businessName: 'JDC Trading',
                tinNo: '345-678-901',
                homeAddress: 'C305 Gordon Heights',
                gender: 'Male',
                civilStatus: 'Married',
                occupation: 'Business Owner',
                incomeRange: 'Upper Middle Class',
                religion: 'Roman Catholic',
                voter: 'yes',
                pwd: 'yes',
                residentTags: ['Business Owner', 'PWD', 'Senior Citizen'],
                status: 'pending',
                proofs: {
                    validId: '/images/sample-id-5.jpg',
                    proofOfResidency: '/images/sample-residency-5.jpg'
                },
                submittedDate: '2025-10-13'
            },
            {
                id: 6,
                uuid: '4a92776a-3706-9808-4949-6615b9a57973',
                username: 'areyes987',
                fullName: 'Ana Reyes',
                contactNumber: '0923 345 6789',
                birthdate: 'August 18, 1997',
                birthplace: 'Olongapo City',
                age: 28,
                sex: 'Female',
                weight: '55kg',
                height: '162cm',
                votersPrecinctNo: '0599D',
                tinNo: '456-789-012',
                homeAddress: 'D102 East Bajac-Bajac',
                gender: 'Female',
                civilStatus: 'Single',
                occupation: 'Nurse',
                incomeRange: 'Middle Class',
                religion: 'Iglesia ni Cristo',
                voter: 'yes',
                pwd: 'no',
                residentTags: ['Healthcare Worker'],
                status: 'approved',
                proofs: {
                    validId: '/images/sample-id-6.jpg',
                    proofOfResidency: '/images/sample-residency-6.jpg',
                    birthCertificate: '/images/sample-birth-cert-6.jpg'
                },
                submittedDate: '2025-10-07'
            },
            {
                id: 7,
                uuid: '3981665a-2605-8707-3838-5504a8946862',
                username: 'pgarcia234',
                fullName: 'Pedro Garcia',
                contactNumber: '0924 456 7890',
                birthdate: 'December 25, 1973',
                age: 52,
                sex: 'Male',
                votersPrecinctNo: '0599E',
                homeAddress: 'E401 New Kababae',
                gender: 'Male',
                civilStatus: 'Widowed',
                occupation: 'Retired',
                incomeRange: 'Lower Middle Class',
                religion: 'Roman Catholic',
                voter: 'yes',
                pwd: 'yes',
                residentTags: ['Senior Citizen', 'PWD'],
                status: 'rejected',
                proofs: {
                    validId: '/images/sample-id-7.jpg'
                },
                submittedDate: '2025-10-09'
            },
            {
                id: 8,
                uuid: '2870554a-1504-7606-2727-4493979357951',
                username: 'smendoza567',
                fullName: 'Sofia Mendoza',
                contactNumber: '0925 567 8901',
                birthdate: 'May 30, 2006',
                age: 19,
                sex: 'Female',
                homeAddress: 'F205 Barretto',
                gender: 'Female',
                civilStatus: 'Single',
                occupation: 'Student',
                incomeRange: 'None',
                religion: 'Born Again',
                voter: 'no',
                pwd: 'no',
                residentTags: [],
                status: 'pending',
                proofs: {
                    validId: '/images/sample-id-8.jpg',
                    proofOfResidency: '/images/sample-residency-8.jpg',
                    birthCertificate: '/images/sample-birth-cert-8.jpg'
                },
                submittedDate: '2025-10-14'
            },
            {
                id: 9,
                uuid: '1769443a-0403-6505-1616-338286826740',
                username: 'cbautista890',
                fullName: 'Carlos Bautista',
                contactNumber: '0926 678 9012',
                emergencyContact: '0927 789 0123',
                birthdate: 'February 14, 1987',
                birthplace: 'Subic',
                age: 38,
                sex: 'Male',
                weight: '80kg',
                height: '178cm',
                votersPrecinctNo: '0599F',
                tinNo: '567-890-123',
                homeAddress: 'G301 Asinan',
                gender: 'Male',
                civilStatus: 'Married',
                occupation: 'Engineer',
                incomeRange: 'Upper Middle Class',
                religion: 'Roman Catholic',
                voter: 'yes',
                pwd: 'no',
                residentTags: ['Professional', 'Taxpayer'],
                status: 'approved',
                proofs: {
                    validId: '/images/sample-id-9.jpg',
                    proofOfResidency: '/images/sample-residency-9.jpg',
                    birthCertificate: '/images/sample-birth-cert-9.jpg'
                },
                submittedDate: '2025-10-06'
            },
            {
                id: 10,
                uuid: '0658332a-9302-5404-0505-227175715629',
                username: 'efernandez123',
                fullName: 'Elena Fernandez',
                contactNumber: '0928 789 0123',
                emergencyContact: '0929 890 1234',
                birthdate: 'July 8, 1994',
                birthplace: 'Olongapo City',
                age: 31,
                sex: 'Female',
                weight: '60kg',
                height: '168cm',
                votersPrecinctNo: '0599G',
                tinNo: '678-901-234',
                homeAddress: 'H104 Kalaklan',
                gender: 'Female',
                civilStatus: 'Married',
                occupation: 'Accountant',
                incomeRange: 'Middle Class',
                religion: 'Roman Catholic',
                voter: 'yes',
                pwd: 'no',
                residentTags: ['Professional', 'Taxpayer'],
                status: 'pending',
                proofs: {
                    validId: '/images/sample-id-10.jpg',
                    proofOfResidency: '/images/sample-residency-10.jpg',
                    birthCertificate: '/images/sample-birth-cert-10.jpg'
                },
                submittedDate: '2025-10-11'
            }
        ];
        setResidents(sampleData);
    }, []);

    // Approval functions
    const handleApprove = (residentId: number) => {
        if (window.confirm('Are you sure you want to approve this resident profile?')) {
            setResidents(prev => prev.map(r => 
                r.id === residentId ? { ...r, status: 'approved' as const } : r
            ));
            alert('Resident profile approved successfully!');
        }
    };

    const handleReject = (residentId: number) => {
        if (window.confirm('Are you sure you want to reject this resident profile?')) {
            setResidents(prev => prev.map(r => 
                r.id === residentId ? { ...r, status: 'rejected' as const } : r
            ));
            alert('Resident profile rejected.');
        }
    };

    const handleViewProofs = (resident: Resident) => {
        setSelectedResident(resident);
        setShowProofsModal(true);
    };

    // Filter and search logic
    const filteredResidents = residents.filter(resident => {
        const matchesSearch = resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            resident.homeAddress.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesAge = ageFilter === 'all' || 
                          (ageFilter === 'minor' && resident.age < 18) ||
                          (ageFilter === 'adult' && resident.age >= 18 && resident.age < 60) ||
                          (ageFilter === 'senior' && resident.age >= 60);
        
        const matchesGender = genderFilter === 'all' || resident.gender.toLowerCase() === genderFilter.toLowerCase();
        const matchesCivilStatus = civilStatusFilter === 'all' || resident.civilStatus.toLowerCase() === civilStatusFilter.toLowerCase();
        const matchesIncome = incomeFilter === 'all' || resident.incomeRange === incomeFilter;
        const matchesVoter = voterFilter === 'all' || resident.voter === voterFilter;
        const matchesPwd = pwdFilter === 'all' || resident.pwd === pwdFilter;

        return matchesSearch && matchesAge && matchesGender && matchesCivilStatus && 
               matchesIncome && matchesVoter && matchesPwd;
    });

    // Pagination
    const totalPages = Math.ceil(filteredResidents.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentResidents = filteredResidents.slice(startIndex, endIndex);

    const handleResetFilters = () => {
        setAgeFilter('all');
        setGenderFilter('all');
        setCivilStatusFilter('all');
        setIncomeFilter('all');
        setVoterFilter('all');
        setPwdFilter('all');
        setSearchTerm('');
        setCurrentPage(1);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <ChairwomanDashboardNav 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
            />
            
            <div style={{ marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                        <FaUsers style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>Resident Management</span>
                    </div>
                </header>

                {/* Main Content */}
                <main style={{ padding: '2rem', flex: 1 }}>
                    {/* Filters Section */}
                    <div style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '0.75rem', 
                        padding: '1.5rem',
                        marginBottom: '1.5rem',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                            gap: '1rem',
                            marginBottom: '1rem'
                        }}>
                            {/* Age Filter */}
                            <div>
                                <label style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    fontSize: '0.875rem', 
                                    fontWeight: '500', 
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    🎂 Age
                                </label>
                                <select
                                    value={ageFilter}
                                    onChange={(e) => setAgeFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="all">All Ages</option>
                                    <option value="minor">Minor (&lt;18)</option>
                                    <option value="adult">Adult (18-59)</option>
                                    <option value="senior">Senior (60+)</option>
                                </select>
                            </div>

                            {/* Gender Filter */}
                            <div>
                                <label style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    fontSize: '0.875rem', 
                                    fontWeight: '500', 
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    ⚧ Gender
                                </label>
                                <select
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="all">All Genders</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="intersex">Intersex</option>
                                </select>
                            </div>

                            {/* Civil Status Filter */}
                            <div>
                                <label style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    fontSize: '0.875rem', 
                                    fontWeight: '500', 
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    💕 Civil Status
                                </label>
                                <select
                                    value={civilStatusFilter}
                                    onChange={(e) => setCivilStatusFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="all">All Civil Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="widowed">Widowed</option>
                                    <option value="separated">Separated</option>
                                </select>
                            </div>

                            {/* Income Range Filter */}
                            <div>
                                <label style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    fontSize: '0.875rem', 
                                    fontWeight: '500', 
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    💰 Income Range
                                </label>
                                <select
                                    value={incomeFilter}
                                    onChange={(e) => setIncomeFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="all">All Income Ranges</option>
                                    <option value="None">None</option>
                                    <option value="Lower Middle Class">Lower Middle Class</option>
                                    <option value="Middle Class">Middle Class</option>
                                    <option value="Upper Middle Class">Upper Middle Class</option>
                                </select>
                            </div>

                            {/* Voter Filter */}
                            <div>
                                <label style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    fontSize: '0.875rem', 
                                    fontWeight: '500', 
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    🗳️ Voter
                                </label>
                                <select
                                    value={voterFilter}
                                    onChange={(e) => setVoterFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="all">All Voters</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            {/* PWD Filter */}
                            <div>
                                <label style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    fontSize: '0.875rem', 
                                    fontWeight: '500', 
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    ♿ PWD
                                </label>
                                <select
                                    value={pwdFilter}
                                    onChange={(e) => setPwdFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="all">All PWD</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        {/* Reset Filters Button */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={handleResetFilters}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.625rem 1.25rem',
                                    backgroundColor: '#6b7280',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
                            >
                                <FaRedo style={{ fontSize: '0.75rem' }} />
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '0.75rem', 
                        padding: '1.5rem',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Table Controls */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', color: '#374151' }}>Show</span>
                                <select
                                    value={entriesPerPage}
                                    onChange={(e) => {
                                        setEntriesPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        padding: '0.5rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span style={{ fontSize: '0.875rem', color: '#374151' }}>entries</span>
                            </div>

                            <div style={{ position: 'relative', width: '300px' }}>
                                <FaSearch style={{ 
                                    position: 'absolute', 
                                    left: '0.75rem', 
                                    top: '50%', 
                                    transform: 'translateY(-50%)',
                                    color: '#9ca3af',
                                    fontSize: '0.875rem'
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
                                        padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ 
                                width: '100%', 
                                borderCollapse: 'collapse',
                                fontSize: '0.875rem'
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb',
                                            whiteSpace: 'nowrap'
                                        }}>Username</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb',
                                            whiteSpace: 'nowrap'
                                        }}>Full Name</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb',
                                            whiteSpace: 'nowrap'
                                        }}>Contact Number</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb'
                                        }}>Birthdate</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb'
                                        }}>Sex</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb',
                                            whiteSpace: 'nowrap'
                                        }}>Civil Status</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb',
                                            whiteSpace: 'nowrap'
                                        }}>Resident Tags</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'left', 
                                            fontWeight: '600',
                                            color: '#2563eb'
                                        }}>Status</th>
                                        <th style={{ 
                                            padding: '0.75rem', 
                                            textAlign: 'center', 
                                            fontWeight: '600',
                                            color: '#2563eb',
                                            whiteSpace: 'nowrap'
                                        }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentResidents.length > 0 ? (
                                        currentResidents.map((resident, index) => (
                                            <tr 
                                                key={resident.id}
                                                style={{ 
                                                    backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}
                                            >
                                                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{resident.username}</td>
                                                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{resident.fullName}</td>
                                                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{resident.contactNumber}</td>
                                                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{resident.birthdate}</td>
                                                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{resident.sex}</td>
                                                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{resident.civilStatus}</td>
                                                <td style={{ padding: '0.75rem', color: '#1f2937' }}>
                                                    {resident.residentTags.length > 0 ? resident.residentTags.join(', ') : 'None'}
                                                </td>
                                                <td style={{ padding: '0.75rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        backgroundColor: resident.status === 'approved' ? '#dcfce7' : 
                                                                       resident.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                                                        color: resident.status === 'approved' ? '#166534' : 
                                                               resident.status === 'rejected' ? '#991b1b' : '#854d0e'
                                                    }}>
                                                        {resident.status.charAt(0).toUpperCase() + resident.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0.75rem' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                        <button
                                                            onClick={() => handleViewProofs(resident)}
                                                            title="View Proofs"
                                                            style={{
                                                                padding: '0.5rem',
                                                                backgroundColor: '#3b82f6',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        {resident.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(resident.id)}
                                                                    title="Approve"
                                                                    style={{
                                                                        padding: '0.5rem',
                                                                        backgroundColor: '#22c55e',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '0.375rem',
                                                                        cursor: 'pointer',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <FaCheck />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(resident.id)}
                                                                    title="Reject"
                                                                    style={{
                                                                        padding: '0.5rem',
                                                                        backgroundColor: '#ef4444',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '0.375rem',
                                                                        cursor: 'pointer',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <FaTimes />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td 
                                                colSpan={12} 
                                                style={{ 
                                                    padding: '2rem', 
                                                    textAlign: 'center', 
                                                    color: '#6b7280' 
                                                }}
                                            >
                                                No residents found matching your criteria
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginTop: '1.5rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredResidents.length)} of {filteredResidents.length} entries
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                                        fontSize: '0.875rem',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    First
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                                        fontSize: '0.875rem',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    ← Previous
                                </button>
                                <button
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: '1px solid #2563eb',
                                        borderRadius: '0.375rem',
                                        backgroundColor: '#2563eb',
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {currentPage}
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
                                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                                        fontSize: '0.875rem',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Next →
                                </button>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
                                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                                        fontSize: '0.875rem',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Last
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Proofs Modal */}
            {showProofsModal && selectedResident && (
                <div 
                    style={{
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
                    }}
                    onClick={() => setShowProofsModal(false)}
                >
                    <div 
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            maxWidth: '800px',
                            width: '90%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            paddingBottom: '1rem',
                            borderBottom: '2px solid #e5e7eb'
                        }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>
                                    Resident Proofs & Details
                                </h2>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                    {selectedResident.fullName} - Submitted on {new Date(selectedResident.submittedDate).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowProofsModal(false)}
                                style={{
                                    padding: '0.5rem',
                                    backgroundColor: '#f3f4f6',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    cursor: 'pointer',
                                    fontSize: '1.25rem',
                                    color: '#6b7280',
                                    lineHeight: 1
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {/* Resident Details */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Personal Information
                            </h3>
                            <div style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                backgroundColor: '#f9fafb',
                                padding: '1.5rem',
                                borderRadius: '0.5rem'
                            }}>
                                {/* Resident UUID */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Resident UUID</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{selectedResident.uuid}</div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Resident UUID')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Resident UUID')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Username */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Username</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{selectedResident.username}</div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Username')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Username')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Full Name */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Full Name</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{selectedResident.fullName}</div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Full Name')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Full Name')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Number */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Contact Number</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{selectedResident.contactNumber}</div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Contact Number')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Contact Number')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Emergency Contact */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Emergency Contact</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: selectedResident.emergencyContact ? '#1f2937' : '#9ca3af', fontStyle: selectedResident.emergencyContact ? 'normal' : 'italic' }}>
                                            {selectedResident.emergencyContact || 'Not provided'}
                                        </div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Emergency Contact')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Emergency Contact')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Continue with remaining fields in similar pattern */}
                                {/* Birthdate */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Birthdate</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{selectedResident.birthdate}</span>
                                            {selectedResident.status === 'pending' && (
                                                <span style={{ 
                                                    fontSize: '0.75rem', 
                                                    padding: '0.125rem 0.5rem', 
                                                    backgroundColor: '#fef3c7', 
                                                    color: '#854d0e',
                                                    borderRadius: '9999px',
                                                    fontWeight: '500'
                                                }}>
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Birthdate')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Birthdate')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Add remaining fields similarly... for brevity showing key ones */}
                                {/* Civil Status */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Civil Status</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{selectedResident.civilStatus}</span>
                                            {selectedResident.status === 'pending' && (
                                                <span style={{ 
                                                    fontSize: '0.75rem', 
                                                    padding: '0.125rem 0.5rem', 
                                                    backgroundColor: '#fef3c7', 
                                                    color: '#854d0e',
                                                    borderRadius: '9999px',
                                                    fontWeight: '500'
                                                }}>
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Civil Status')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Civil Status')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Resident Tags */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Resident Tags</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: selectedResident.residentTags.length > 0 ? '#1f2937' : '#9ca3af', fontStyle: selectedResident.residentTags.length > 0 ? 'normal' : 'italic' }}>
                                            {selectedResident.residentTags.length > 0 ? selectedResident.residentTags.join(', ') : 'Not provided'}
                                        </div>
                                    </div>
                                    {selectedResident.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => alert('Declined Resident Tags')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                onClick={() => alert('Approved Resident Tags')}
                                                style={{
                                                    padding: '0.375rem 0.75rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Uploaded Proofs */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaFileImage style={{ color: '#3b82f6' }} />
                                Uploaded Proofs/Documents
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {selectedResident.proofs.validId && (
                                    <div style={{ 
                                        border: '2px solid #e5e7eb', 
                                        borderRadius: '0.5rem', 
                                        padding: '1rem',
                                        backgroundColor: '#f9fafb'
                                    }}>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                                            Valid ID
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: '120px',
                                            backgroundColor: '#e5e7eb',
                                            borderRadius: '0.375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6b7280',
                                            fontSize: '0.75rem'
                                        }}>
                                            [ID Document Preview]
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                            {selectedResident.proofs.validId}
                                        </div>
                                    </div>
                                )}
                                {selectedResident.proofs.proofOfResidency && (
                                    <div style={{ 
                                        border: '2px solid #e5e7eb', 
                                        borderRadius: '0.5rem', 
                                        padding: '1rem',
                                        backgroundColor: '#f9fafb'
                                    }}>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                                            Proof of Residency
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: '120px',
                                            backgroundColor: '#e5e7eb',
                                            borderRadius: '0.375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6b7280',
                                            fontSize: '0.75rem'
                                        }}>
                                            [Residency Document Preview]
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                            {selectedResident.proofs.proofOfResidency}
                                        </div>
                                    </div>
                                )}
                                {selectedResident.proofs.birthCertificate && (
                                    <div style={{ 
                                        border: '2px solid #e5e7eb', 
                                        borderRadius: '0.5rem', 
                                        padding: '1rem',
                                        backgroundColor: '#f9fafb'
                                    }}>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                                            Birth Certificate
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: '120px',
                                            backgroundColor: '#e5e7eb',
                                            borderRadius: '0.375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6b7280',
                                            fontSize: '0.75rem'
                                        }}>
                                            [Birth Certificate Preview]
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                            {selectedResident.proofs.birthCertificate}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!selectedResident.proofs.validId && !selectedResident.proofs.proofOfResidency && !selectedResident.proofs.birthCertificate && (
                                <div style={{ 
                                    padding: '2rem', 
                                    textAlign: 'center', 
                                    color: '#6b7280',
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '0.5rem'
                                }}>
                                    No documents uploaded yet
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div style={{ 
                            display: 'flex', 
                            gap: '1rem', 
                            justifyContent: 'flex-end',
                            paddingTop: '1rem',
                            borderTop: '2px solid #e5e7eb'
                        }}>
                            <button
                                onClick={() => setShowProofsModal(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#6b7280',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
                            >
                                <FaTimes />
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert('Changes saved successfully!');
                                    setShowProofsModal(false);
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#22c55e',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
                            >
                                <FaCheck />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResidentManagement;
