import React, { useState } from 'react';
import ResidentDashboardNav from '../components/ResidentDashboardNav';
import { 
    FaUser,
    FaUsers
} from 'react-icons/fa';

const Dashboard: React.FC = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showHouseholdMembers, setShowHouseholdMembers] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const [newMemberInput, setNewMemberInput] = useState('');
    const [showCreateHousehold, setShowCreateHousehold] = useState(false);
    const [showHouseholdInvitations, setShowHouseholdInvitations] = useState(false);
    const [showJoinHousehold, setShowJoinHousehold] = useState(false);
    const [showLeaveHousehold, setShowLeaveHousehold] = useState(false);
    const [showTransferHeadship, setShowTransferHeadship] = useState(false);
    const [householdStatus, setHouseholdStatus] = useState('none'); // 'none', 'head', 'member'
    const [joinHouseholdId, setJoinHouseholdId] = useState('');
    const [selectedNewHead, setSelectedNewHead] = useState('');

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingHousehold, setIsEditingHousehold] = useState(false);
    const [showDocumentDropbox, setShowDocumentDropbox] = useState(false);
    
    // Profile data with edit state and status tracking
    const [profileData, setProfileData] = useState({
        username: 'ltrevecedo123',
        fullName: 'Luc Elric Trevecedo',
        contactNumber: '0927 993 2190',
        emergencyContact: '',
        birthdate: 'April 2, 2002',
        birthplace: '',
        age: '23 years old',
        sex: 'Male',
        weight: '',
        height: '',
        votersPrecinctNo: '', // Remove prefilled data
        businessName: '',
        ssnNo: '', // Remove prefilled data
        tinNo: '', // Remove prefilled data
        civilStatus: 'Single',
        residentTags: ['none'] // Changed to array for multiple tags
    });
    
    // Field status tracking (approved/pending)
    const [fieldStatuses, setFieldStatuses] = useState({
        fullName: 'Approved',
        contactNumber: 'Approved',
        birthdate: 'Pending',
        age: 'Approved',
        votersPrecinctNo: 'Pending', // Keep as pending since field is empty
        ssnNo: 'Pending', // Change to pending since field is empty
        tinNo: 'Pending', // Keep as pending since field is empty
        civilStatus: 'Pending',
        residentTags: 'Approved'
    });

    // Household profile data with edit state
    const [householdData, setHouseholdData] = useState({
        residencyStatus: householdStatus === 'none' ? '' : 'Owner',
        mainAddress: '0281 Narra Street Old Sta Mesa Manila Barangay 599',
        periodOfResidency: '23 years and 6 months',
        householdRole: householdStatus === 'none' ? '' : 'Head'
    });

    // Household field status tracking
    const [householdStatuses, setHouseholdStatuses] = useState({
        residencyStatus: householdStatus === 'none' ? 'Pending' : 'Approved',
        mainAddress: 'Approved', // Always approved since it has prefilled data
        householdRole: 'Approved',
        periodOfResidency: 'Approved' // Always approved since it has prefilled data
    });

    // Sample household members data (only if user is head)
    const householdMembers = householdStatus === 'head' ? [
        { id: 'RES-599-2025-001', name: 'Ethic Trev Jr.', role: 'Head', status: 'Active' },
        { id: 'RES-599-2025-002', name: 'Maria Trev', role: 'Spouse', status: 'Active' },
        { id: 'RES-599-2025-003', name: 'John Trev', role: 'Child', status: 'Active' },
        { id: 'RES-599-2025-004', name: 'Sarah Trev', role: 'Child', status: 'Active' }
    ] : [];

    // Sample household invitations (for residents with no household)
    const householdInvitations = householdStatus === 'none' ? [
        { 
            id: 'INV-2025-001', 
            householdHead: 'Maria Santos',
            householdId: 'HH-599-2025-002',
            address: 'Block 10, Lot 5, Zone 55',
            proposedRole: 'Child',
            inviteDate: 'Oct 12, 2025',
            status: 'Pending',
            message: 'We would like to invite you to join our household as our child.'
        },
        { 
            id: 'INV-2025-002', 
            householdHead: 'Roberto Garcia',
            householdId: 'HH-599-2025-003', 
            address: 'Block 8, Lot 12, Zone 60',
            proposedRole: 'Relative',
            inviteDate: 'Oct 10, 2025',
            status: 'Pending',
            message: 'Please join our household. You are welcome as a relative.'
        }
    ] : [];

    // Sample household member requests (for household heads)
    const householdMemberRequests = householdStatus === 'head' ? [
        {
            id: 'REQ-2025-001',
            requesterId: 'RES-599-2025-005',
            requesterName: 'Miguel Santos',
            requesterUsername: 'msantos456',
            requestDate: 'Oct 13, 2025',
            message: 'I would like to join your household as a member.',
            status: 'Pending'
        },
        {
            id: 'REQ-2025-002', 
            requesterId: 'RES-599-2025-006',
            requesterName: 'Ana Cruz',
            requesterUsername: 'acruz789',
            requestDate: 'Oct 12, 2025',
            message: 'Can I please join your household? I live in the same area.',
            status: 'Pending'
        }
    ] : [];

    // Helper function to validate resident tag combinations
    const validateResidentTags = (tags: string[]) => {
        const hasMinor = tags.includes('minor');
        const hasSenior = tags.includes('senior');
        const hasNone = tags.includes('none');
        
        if (hasNone && tags.length > 1) {
            return { valid: false, message: 'Cannot select "None" with other tags' };
        }
        if (hasMinor && hasSenior) {
            return { valid: false, message: 'Cannot be both Minor and Senior' };
        }
        return { valid: true, message: '' };
    };

    // Handle resident tag changes with validation
    const handleResidentTagChange = (selectedTags: string[]) => {
        const validation = validateResidentTags(selectedTags);
        if (validation.valid) {
            setProfileData({...profileData, residentTags: selectedTags});
            setFieldStatuses({...fieldStatuses, residentTags: 'Pending'});
        } else {
            alert(validation.message);
        }
    };



    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Resident Dashboard Navigation */}
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
                        <FaUser style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>Resident</span>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main style={{ flex: 1, padding: '2rem' }}>
                    {/* Profile Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ 
                            fontSize: '1.875rem', 
                            fontWeight: 'bold', 
                            color: '#1f2937', 
                            marginBottom: '0.5rem' 
                        }}>
                            Account Profile
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                            Manage your resident and household information
                        </p>
                    </div>

                    {/* Profile Content Grid */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        {/* Resident Profile */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaUser style={{ 
                                        width: '1.5rem', 
                                        height: '1.5rem', 
                                        color: '#3b82f6',
                                        marginRight: '0.75rem'
                                    }} />
                                    <h2 style={{ 
                                        fontSize: '1.5rem', 
                                        fontWeight: '600', 
                                        color: '#1f2937'
                                    }}>
                                        Resident Profile
                                    </h2>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => {
                                            setIsEditingProfile(!isEditingProfile);
                                            setIsEditingHousehold(false); // Close household editing when opening profile editing
                                        }}
                                        style={{
                                            fontSize: '0.75rem',
                                            color: isEditingProfile ? '#dc2626' : '#3b82f6',
                                            backgroundColor: isEditingProfile ? '#fef2f2' : '#eff6ff',
                                            border: `1px solid ${isEditingProfile ? '#dc2626' : '#3b82f6'}`,
                                            borderRadius: '0.25rem',
                                            padding: '0.5rem 0.75rem',
                                            cursor: 'pointer',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {isEditingProfile ? 'Cancel' : 'Edit & Upload'}
                                    </button>
                                </div>
                            </div>

                            {/* Profile Image */}
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center',
                                marginBottom: '2rem'
                            }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    backgroundColor: '#e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                    border: '4px solid #f3f4f6'
                                }}>
                                    <FaUser style={{ width: '3rem', height: '3rem', color: '#9ca3af' }} />
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
                                    📸 Please take a photo in the barangay hall
                                </p>
                            </div>

                            {/* Profile Fields */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* 1. Resident Image - Already shown above */}
                                
                                {/* 2. Username */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Username:</span>
                                    <span style={{ color: '#1f2937', fontWeight: '600' }}>{profileData.username}</span>
                                </div>

                                {/* 3. Full Name with suffix */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Full Name:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingProfile ? (
                                            <input
                                                type="text"
                                                value={profileData.fullName}
                                                onChange={(e) => {
                                                    setProfileData({...profileData, fullName: e.target.value});
                                                    setFieldStatuses({...fieldStatuses, fullName: 'Pending'});
                                                }}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '200px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: '#1f2937', fontWeight: '600' }}>{profileData.fullName}</span>
                                        )}
                                        {fieldStatuses.fullName !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.fullName}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 4. Contact Number */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Contact Number:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingProfile ? (
                                            <input
                                                type="text"
                                                value={profileData.contactNumber}
                                                onChange={(e) => {
                                                    setProfileData({...profileData, contactNumber: e.target.value});
                                                    setFieldStatuses({...fieldStatuses, contactNumber: 'Pending'});
                                                }}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '200px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: '#1f2937', fontWeight: '600' }}>{profileData.contactNumber}</span>
                                        )}
                                        {fieldStatuses.contactNumber !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.contactNumber}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 5. Emergency Contact */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Emergency Contact:</span>
                                    {isEditingProfile ? (
                                        <input
                                            type="text"
                                            value={profileData.emergencyContact}
                                            onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                                            placeholder="Enter emergency contact"
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.875rem',
                                                width: '200px'
                                            }}
                                        />
                                    ) : (
                                        <span style={{ color: profileData.emergencyContact ? '#1f2937' : '#6b7280', fontStyle: profileData.emergencyContact ? 'normal' : 'italic', fontWeight: profileData.emergencyContact ? '600' : 'normal' }}>
                                            {profileData.emergencyContact || 'Not provided'}
                                        </span>
                                    )}
                                </div>

                                {/* 6. Birthdate */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Birthdate:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingProfile ? (
                                            <input
                                                type="text"
                                                value={profileData.birthdate}
                                                onChange={(e) => {
                                                    setProfileData({...profileData, birthdate: e.target.value});
                                                    setFieldStatuses({...fieldStatuses, birthdate: 'Pending'});
                                                }}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '200px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: '#1f2937', fontWeight: '600' }}>{profileData.birthdate}</span>
                                        )}
                                        {fieldStatuses.birthdate !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.birthdate}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 7. Birthplace */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Birthplace:</span>
                                    {isEditingProfile ? (
                                        <input
                                            type="text"
                                            value={profileData.birthplace}
                                            onChange={(e) => setProfileData({...profileData, birthplace: e.target.value})}
                                            placeholder="Enter birthplace"
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.875rem',
                                                width: '200px'
                                            }}
                                        />
                                    ) : (
                                        <span style={{ color: profileData.birthplace ? '#1f2937' : '#6b7280', fontStyle: profileData.birthplace ? 'normal' : 'italic', fontWeight: profileData.birthplace ? '600' : 'normal' }}>
                                            {profileData.birthplace || 'Not provided'}
                                        </span>
                                    )}
                                </div>

                                {/* 8. Age */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Age:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ color: '#1f2937', fontWeight: '600' }}>{profileData.age}</span>
                                    </div>
                                </div>

                                {/* 9. Sex */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Sex:</span>
                                    <span style={{ color: '#1f2937', fontWeight: '600' }}>Male</span>
                                </div>

                                {/* 10. Weight */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Weight:</span>
                                    <span style={{ color: '#6b7280', fontStyle: 'italic' }}>Not provided</span>
                                </div>

                                {/* 11. Height */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Height:</span>
                                    <span style={{ color: '#6b7280', fontStyle: 'italic' }}>Not provided</span>
                                </div>

                                {/* 12. Voters precinct number */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Voters Precinct No:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingProfile ? (
                                            <input
                                                type="text"
                                                value={profileData.votersPrecinctNo}
                                                onChange={(e) => {
                                                    setProfileData({...profileData, votersPrecinctNo: e.target.value});
                                                    setFieldStatuses({...fieldStatuses, votersPrecinctNo: 'Pending'});
                                                }}
                                                placeholder="Enter precinct number"
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '200px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: profileData.votersPrecinctNo ? '#1f2937' : '#6b7280', fontStyle: profileData.votersPrecinctNo ? 'normal' : 'italic', fontWeight: profileData.votersPrecinctNo ? '600' : 'normal' }}>
                                                {profileData.votersPrecinctNo || 'Not provided'}
                                            </span>
                                        )}
                                        {profileData.votersPrecinctNo && fieldStatuses.votersPrecinctNo !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.votersPrecinctNo}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 13. Business Name */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Business Name:</span>
                                    <span style={{ color: '#6b7280', fontStyle: 'italic' }}>Not provided</span>
                                </div>

                                {/* 14. SSN NO */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>SSN No:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingProfile ? (
                                            <input
                                                type="text"
                                                value={profileData.ssnNo}
                                                onChange={(e) => {
                                                    setProfileData({...profileData, ssnNo: e.target.value});
                                                    setFieldStatuses({...fieldStatuses, ssnNo: 'Pending'});
                                                }}
                                                placeholder="Enter SSN number"
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '200px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: profileData.ssnNo ? '#1f2937' : '#6b7280', fontStyle: profileData.ssnNo ? 'normal' : 'italic', fontWeight: profileData.ssnNo ? '600' : 'normal' }}>
                                                {profileData.ssnNo || 'Not provided'}
                                            </span>
                                        )}
                                        {profileData.ssnNo && fieldStatuses.ssnNo !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.ssnNo}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 15. TIN NO */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>TIN No:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingProfile ? (
                                            <input
                                                type="text"
                                                value={profileData.tinNo}
                                                onChange={(e) => {
                                                    setProfileData({...profileData, tinNo: e.target.value});
                                                    setFieldStatuses({...fieldStatuses, tinNo: 'Pending'});
                                                }}
                                                placeholder="Enter TIN number"
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '200px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: profileData.tinNo ? '#1f2937' : '#6b7280', fontStyle: profileData.tinNo ? 'normal' : 'italic', fontWeight: profileData.tinNo ? '600' : 'normal' }}>
                                                {profileData.tinNo || 'Not provided'}
                                            </span>
                                        )}
                                        {profileData.tinNo && fieldStatuses.tinNo !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.tinNo}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 16. Civil Status */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Civil Status:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ color: '#1f2937', fontWeight: '600' }}>Single</span>
                                        {fieldStatuses.civilStatus !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.civilStatus}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 17. Resident Tags */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Resident Tags:</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                        {isEditingProfile ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '250px' }}>
                                                    {['none', 'senior', 'pwd', 'minor', 'solo_parent', 'first_job_seeker', 'unemployed'].map((tag) => (
                                                        <label key={tag} style={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: '0.25rem',
                                                            fontSize: '0.75rem',
                                                            color: '#374151',
                                                            cursor: 'pointer'
                                                        }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={profileData.residentTags.includes(tag)}
                                                                onChange={(e) => {
                                                                    const newTags = e.target.checked 
                                                                        ? [...profileData.residentTags.filter(t => t !== 'none'), tag]
                                                                        : profileData.residentTags.filter(t => t !== tag);
                                                                    
                                                                    if (tag === 'none') {
                                                                        handleResidentTagChange(['none']);
                                                                    } else {
                                                                        handleResidentTagChange(newTags.filter(t => t !== 'none').length === 0 ? ['none'] : newTags.filter(t => t !== 'none'));
                                                                    }
                                                                }}
                                                                style={{ marginRight: '0.25rem' }}
                                                            />
                                                            {tag === 'pwd' ? 'PWD' : 
                                                             tag === 'solo_parent' ? 'Solo Parent' :
                                                             tag === 'first_job_seeker' ? 'First Job Seeker' :
                                                             tag.charAt(0).toUpperCase() + tag.slice(1)}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: '250px', justifyContent: 'flex-end' }}>
                                                {profileData.residentTags.map((tag, index) => (
                                                    <span key={index} style={{ 
                                                        fontSize: '0.75rem',
                                                        color: '#1f2937',
                                                        backgroundColor: '#f3f4f6',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '0.25rem',
                                                        fontWeight: '500'
                                                    }}>
                                                        {tag === 'pwd' ? 'PWD' : 
                                                         tag === 'solo_parent' ? 'Solo Parent' :
                                                         tag === 'first_job_seeker' ? 'First Job Seeker' :
                                                         tag.charAt(0).toUpperCase() + tag.slice(1)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {fieldStatuses.residentTags !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {fieldStatuses.residentTags}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Save Button and Upload Documents for Profile Editing */}
                                {isEditingProfile && (
                                    <div style={{ 
                                        marginTop: '1.5rem',
                                        padding: '1rem',
                                        backgroundColor: '#f8fafc',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <div>
                                                <p style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500', marginBottom: '0.25rem' }}>
                                                    Profile Changes
                                                </p>
                                                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                                                    Modified fields will be marked as "Pending" and require approval.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setIsEditingProfile(false);
                                                    alert('Profile changes saved! Modified fields are now pending approval.');
                                                }}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: '#16a34a',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setShowDocumentDropbox(true)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                fontSize: '0.875rem',
                                                color: '#16a34a',
                                                backgroundColor: '#f0fdf4',
                                                border: '1px solid #16a34a',
                                                borderRadius: '0.375rem',
                                                cursor: 'pointer',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            📎 Upload Supporting Documents
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Household Profile */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaUsers style={{ 
                                        width: '1.5rem', 
                                        height: '1.5rem', 
                                        color: '#16a34a',
                                        marginRight: '0.75rem'
                                    }} />
                                    <h2 style={{ 
                                        fontSize: '1.5rem', 
                                        fontWeight: '600', 
                                        color: '#1f2937'
                                    }}>
                                        Household Profile
                                    </h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsEditingHousehold(!isEditingHousehold);
                                        setIsEditingProfile(false); // Close profile editing when opening household editing
                                    }}
                                    style={{
                                        fontSize: '0.75rem',
                                        color: isEditingHousehold ? '#dc2626' : '#16a34a',
                                        backgroundColor: isEditingHousehold ? '#fef2f2' : '#f0fdf4',
                                        border: `1px solid ${isEditingHousehold ? '#dc2626' : '#16a34a'}`,
                                        borderRadius: '0.25rem',
                                        padding: '0.5rem 0.75rem',
                                        cursor: 'pointer',
                                        fontWeight: '500'
                                    }}
                                >
                                    {isEditingHousehold ? 'Cancel' : 'Edit & Upload'}
                                </button>
                            </div>

                            {/* Household Fields */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Residency Status - Always editable */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Residency Status:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingHousehold ? (
                                            <select
                                                value={householdData.residencyStatus}
                                                onChange={(e) => {
                                                    setHouseholdData({...householdData, residencyStatus: e.target.value});
                                                    setHouseholdStatuses({...householdStatuses, residencyStatus: 'Pending'});
                                                }}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '150px'
                                                }}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Owner">Owner</option>
                                                <option value="Renter">Renter</option>
                                                <option value="Boarder">Boarder</option>
                                                <option value="Caretaker">Caretaker</option>
                                            </select>
                                        ) : (
                                            <span style={{ 
                                                color: householdData.residencyStatus ? '#1f2937' : '#6b7280', 
                                                fontWeight: householdData.residencyStatus ? '600' : 'normal',
                                                fontStyle: householdData.residencyStatus ? 'normal' : 'italic'
                                            }}>
                                                {householdData.residencyStatus || 'Not specified'}
                                            </span>
                                        )}
                                        {householdData.residencyStatus && householdStatuses.residencyStatus !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {householdStatuses.residencyStatus}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Main Address - Always editable */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Main Address:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingHousehold ? (
                                            <input
                                                type="text"
                                                value={householdData.mainAddress}
                                                onChange={(e) => {
                                                    setHouseholdData({...householdData, mainAddress: e.target.value});
                                                    setHouseholdStatuses({...householdStatuses, mainAddress: 'Pending'});
                                                }}
                                                placeholder="Enter your main address"
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.875rem',
                                                    width: '200px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ 
                                                color: householdData.mainAddress ? '#1f2937' : '#6b7280', 
                                                fontWeight: householdData.mainAddress ? '600' : 'normal',
                                                fontStyle: householdData.mainAddress ? 'normal' : 'italic'
                                            }}>
                                                {householdData.mainAddress || 'Not specified'}
                                            </span>
                                        )}
                                        {householdData.mainAddress && householdStatuses.mainAddress !== 'Approved' && (
                                            <span style={{ 
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {householdStatuses.mainAddress}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Period of Residency - Always visible, editable when in household */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Period of Residency:</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isEditingHousehold && householdStatus !== 'none' ? (
                                            <input
                                                type="text"
                                                value={householdData.periodOfResidency}
                                                onChange={(e) => {
                                                    setHouseholdData({...householdData, periodOfResidency: e.target.value});
                                                    setHouseholdStatuses({...householdStatuses, periodOfResidency: 'Pending'});
                                                }}
                                                style={{
                                                    padding: '4px 8px',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    width: '150px'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: '#1f2937', fontWeight: '600' }}>
                                                {householdData.periodOfResidency}
                                            </span>
                                        )}
                                        {householdStatus !== 'none' && householdStatuses.periodOfResidency !== 'Approved' && (
                                            <span style={{
                                                padding: '4px 8px',
                                                backgroundColor: householdStatuses.periodOfResidency === 'Pending' ? '#FFF3CD' : '#F8D7DA',
                                                color: householdStatuses.periodOfResidency === 'Pending' ? '#856404' : '#721C24',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: 'bold'
                                            }}>
                                                {householdStatuses.periodOfResidency}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {householdStatus === 'none' ? (
                                    /* No Household - Show options to create or view invitations */
                                    <>
                                        {/* Household ID */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#374151', fontWeight: '500' }}>Household ID:</span>
                                            <span style={{ color: '#6b7280', fontWeight: 'normal', fontStyle: 'italic' }}>None</span>
                                        </div>

                                        {/* Household Role */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#374151', fontWeight: '500' }}>Household Role:</span>
                                            <span style={{ color: '#6b7280', fontWeight: 'normal', fontStyle: 'italic' }}>None</span>
                                        </div>

                                        {/* Household Member Count */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#374151', fontWeight: '500' }}>Household Member Count:</span>
                                            <span style={{ color: '#6b7280', fontWeight: 'normal', fontStyle: 'italic' }}>None</span>
                                        </div>

                                        <div style={{ 
                                            backgroundColor: '#fef3c7',
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            marginTop: '1rem'
                                        }}>
                                            <h3 style={{ 
                                                fontSize: '0.875rem', 
                                                fontWeight: '600', 
                                                color: '#92400e',
                                                marginBottom: '0.5rem'
                                            }}>
                                                🏠 No Household Assigned
                                            </h3>
                                            <p style={{ fontSize: '0.75rem', color: '#92400e', marginBottom: '1rem' }}>
                                                You are not currently part of any household. Choose one of the following options:
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <button 
                                                    onClick={() => setShowCreateHousehold(true)}
                                                    style={{
                                                        fontSize: '0.875rem',
                                                        color: '#16a34a',
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        textDecoration: 'underline'
                                                    }}
                                                >
                                                    🏡 Create New Household (Become Head)
                                                </button>
                                                <button 
                                                    onClick={() => setShowJoinHousehold(true)}
                                                    style={{
                                                        fontSize: '0.875rem',
                                                        color: '#f59e0b',
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        textDecoration: 'underline'
                                                    }}
                                                >
                                                    🔗 Join Existing Household (Enter Household ID)
                                                </button>
                                                <button 
                                                    onClick={() => setShowHouseholdInvitations(true)}
                                                    style={{
                                                        fontSize: '0.875rem',
                                                        color: '#3b82f6',
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        textDecoration: 'underline'
                                                    }}
                                                >
                                                    📧 View Household Invitations ({householdInvitations.length})
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    /* Has Household - Show household info and management */
                                    <>
                                        {/* Household ID */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#374151', fontWeight: '500' }}>Household ID:</span>
                                            <span style={{ color: '#1f2937', fontWeight: '600', fontFamily: 'monospace' }}>HH-599-2025-001</span>
                                        </div>

                                        {/* Household Role */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#374151', fontWeight: '500' }}>Household Role:</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <select
                                                    value={householdStatus}
                                                    onChange={(e) => setHouseholdStatus(e.target.value)}
                                                    style={{
                                                        padding: '0.25rem 0.5rem',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '0.25rem',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        width: '100px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <option value="head">Head</option>
                                                    <option value="member">Member</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Household Member Count */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#374151', fontWeight: '500' }}>Household Member Count:</span>
                                            <span style={{ color: '#1f2937', fontWeight: '600' }}>{householdMembers.length} members</span>
                                        </div>

                                        {/* Household Actions */}
                                        <div style={{ 
                                            backgroundColor: '#f9fafb',
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            marginTop: '1rem'
                                        }}>
                                            <h3 style={{ 
                                                fontSize: '0.875rem', 
                                                fontWeight: '600', 
                                                color: '#374151',
                                                marginBottom: '0.75rem'
                                            }}>
                                                Household Management
                                            </h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <button 
                                                    onClick={() => setShowHouseholdMembers(true)}
                                                    style={{
                                                        fontSize: '0.875rem',
                                                        color: '#3b82f6',
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        textDecoration: 'underline'
                                                    }}
                                                >
                                                    👥 View Household Members
                                                </button>
                                                
                                                {householdStatus === 'head' ? (
                                                    <>
                                                        <button 
                                                            onClick={() => setShowAddMember(true)}
                                                            style={{
                                                                fontSize: '0.875rem',
                                                                color: '#16a34a',
                                                                backgroundColor: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                textDecoration: 'underline'
                                                            }}
                                                        >
                                                            ➕ Add New Member
                                                        </button>
                                                        <button 
                                                            onClick={() => setShowHouseholdInvitations(true)}
                                                            style={{
                                                                fontSize: '0.875rem',
                                                                color: '#f59e0b',
                                                                backgroundColor: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                textDecoration: 'underline'
                                                            }}
                                                        >
                                                            📋 Member Requests ({householdMemberRequests.length})
                                                        </button>
                                                        <button 
                                                            onClick={() => setShowTransferHeadship(true)}
                                                            style={{
                                                                fontSize: '0.875rem',
                                                                color: '#dc2626',
                                                                backgroundColor: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                textDecoration: 'underline'
                                                            }}
                                                        >
                                                            🔄 Transfer Headship & Leave
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button 
                                                        onClick={() => setShowLeaveHousehold(true)}
                                                        style={{
                                                            fontSize: '0.875rem',
                                                            color: '#dc2626',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            textAlign: 'left',
                                                            textDecoration: 'underline'
                                                        }}
                                                    >
                                                        🚪 Leave Household
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Status Tickets Section */}
                    <div style={{ marginTop: '3rem' }}>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            Request Status Overview
                        </h2>
                        
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1fr 1fr 1fr', 
                            gap: '1.5rem' 
                        }}>
                            {/* Requested Documents Column */}
                            <div>
                                <h3 style={{ 
                                    fontSize: '1.125rem', 
                                    fontWeight: '600', 
                                    color: '#374151',
                                    marginBottom: '1rem',
                                    textAlign: 'center'
                                }}>
                                    Requested Documents
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {/* Barangay Clearance */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#f59e0b',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>⚠</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Barangay Clearance
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Under review</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Ref: BC-175940600808</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>10/2/2025</div>
                                    </div>

                                    {/* Business Permit */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#16a34a',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Business Permit
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#16a34a', marginBottom: '4px' }}>Approved</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Ref: BP-175940600809</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>09/15/2025</div>
                                    </div>

                                    {/* Certificate of Residency */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#dc2626',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>✗</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Certificate of Residency
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#dc2626', marginBottom: '4px' }}>Rejected</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Ref: CR-175940600810</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>10/1/2025</div>
                                    </div>
                                </div>
                            </div>

                            {/* Appointments Column */}
                            <div>
                                <h3 style={{ 
                                    fontSize: '1.125rem', 
                                    fontWeight: '600', 
                                    color: '#374151',
                                    marginBottom: '1rem',
                                    textAlign: 'center'
                                }}>
                                    Appointments
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {/* Meeting with Barangay Captain */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#3b82f6',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '9px' }}>📅</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Barangay Captain Meeting
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#3b82f6', marginBottom: '4px' }}>Scheduled</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Tomorrow 2:00 PM</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Business consultation</div>
                                    </div>

                                    {/* Health Center Appointment */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#16a34a',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Health Center Checkup
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#16a34a', marginBottom: '4px' }}>Completed</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Oct 10, 2025 9:00 AM</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Annual health screening</div>
                                    </div>
                                </div>
                            </div>

                            {/* Incident Reports Column */}
                            <div>
                                <h3 style={{ 
                                    fontSize: '1.125rem', 
                                    fontWeight: '600', 
                                    color: '#374151',
                                    marginBottom: '1rem',
                                    textAlign: 'center'
                                }}>
                                    Incident Reports
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {/* Noise Complaint */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#f59e0b',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>⚠</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Noise Complaint
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#f59e0b', marginBottom: '4px' }}>Under investigation</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Report #IR-2025-001</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>10/8/2025</div>
                                    </div>

                                    {/* Stray Animals */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#16a34a',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Stray Animals Report
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#16a34a', marginBottom: '4px' }}>Resolved</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Report #IR-2025-002</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>09/28/2025</div>
                                    </div>

                                    {/* Streetlight Issue */}
                                    <div style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor: '#3b82f6',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '9px' }}>🔧</span>
                                            </div>
                                            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                                                Broken Streetlight
                                            </h4>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#3b82f6', marginBottom: '4px' }}>In progress</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Report #IR-2025-003</div>
                                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>10/5/2025</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Household Members Modal */}
            {showHouseholdMembers && (
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                👥 Household Members
                            </h2>
                            <button
                                onClick={() => setShowHouseholdMembers(false)}
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
                                ×
                            </button>
                        </div>

                        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                            Household ID: <strong>HH-599-2025-001</strong>
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {householdMembers.map((member) => (
                                <div key={member.id} style={{
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                                {member.name}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                Resident ID: {member.id}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                Role: {member.role}
                                            </div>
                                        </div>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: member.status === 'Approved' ? '#16a34a' : '#f59e0b',
                                            backgroundColor: member.status === 'Approved' ? '#dcfce7' : '#fef3c7',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            fontWeight: '500'
                                        }}>
                                            {member.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {showAddMember && (
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
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                ➕ Add New Member
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAddMember(false);
                                    setNewMemberInput('');
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
                                ×
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ 
                                display: 'block', 
                                fontSize: '0.875rem', 
                                fontWeight: '500', 
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Search by Resident ID or Name
                            </label>
                            <input
                                type="text"
                                value={newMemberInput}
                                onChange={(e) => setNewMemberInput(e.target.value)}
                                placeholder="Enter Resident ID (e.g., RES-599-2025-005) or Full Name"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none',
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

                        <div style={{ backgroundColor: '#f8fafc', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                                💡 How to add a member:
                            </h3>
                            <ul style={{ fontSize: '0.75rem', color: '#6b7280', paddingLeft: '1rem', margin: 0 }}>
                                <li>Enter the exact Resident ID (e.g., RES-599-2025-005)</li>
                                <li>Or enter the full name as registered</li>
                                <li>Member must be a registered resident of Barangay 599</li>
                                <li>Request will be sent for approval to the household head</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowAddMember(false);
                                    setNewMemberInput('');
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (newMemberInput.trim()) {
                                        alert(`Request sent to add member: ${newMemberInput}`);
                                        setShowAddMember(false);
                                        setNewMemberInput('');
                                    } else {
                                        alert('Please enter a Resident ID or Name');
                                    }
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Household Modal */}
            {showCreateHousehold && (
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
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                🏡 Create New Household
                            </h2>
                            <button
                                onClick={() => setShowCreateHousehold(false)}
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
                                ×
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                                Creating a new household will make you the household head and allow you to manage members.
                            </p>
                        </div>

                        <div style={{ backgroundColor: '#dcfce7', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>
                                ✅ As Household Head, you can:
                            </h3>
                            <ul style={{ fontSize: '0.75rem', color: '#166534', paddingLeft: '1rem', margin: 0 }}>
                                <li>Add and manage household members</li>
                                <li>Send invitations to residents</li>
                                <li>Accept or reject member requests</li>
                                <li>Manage household information</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowCreateHousehold(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setHouseholdStatus('head');
                                    setShowCreateHousehold(false);
                                    alert('Household created successfully! You are now the household head.');
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#16a34a',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Create Household
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Join Household Modal */}
            {showJoinHousehold && (
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
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                🔗 Join Existing Household
                            </h2>
                            <button
                                onClick={() => setShowJoinHousehold(false)}
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
                                ×
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                                Enter the Household ID to request joining as a member. The household head will need to approve your request.
                            </p>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    Household ID
                                </label>
                                <input
                                    type="text"
                                    value={joinHouseholdId}
                                    onChange={(e) => setJoinHouseholdId(e.target.value)}
                                    placeholder="e.g., HH-599-2025-002"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fef3c7', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                                ⚠️ Note:
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: '#92400e', margin: 0 }}>
                                Your request will be sent to the household head for approval. You'll be notified once they respond.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowJoinHousehold(false);
                                    setJoinHouseholdId('');
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (joinHouseholdId.trim()) {
                                        alert(`Join request sent to household ${joinHouseholdId}! You'll be notified when the head responds.`);
                                        setShowJoinHousehold(false);
                                        setJoinHouseholdId('');
                                    } else {
                                        alert('Please enter a valid Household ID');
                                    }
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f59e0b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Leave Household Modal */}
            {showLeaveHousehold && (
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
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                🚪 Leave Household
                            </h2>
                            <button
                                onClick={() => setShowLeaveHousehold(false)}
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
                                ×
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                                Are you sure you want to leave this household? The household head will be notified of your departure.
                            </p>
                        </div>

                        <div style={{ backgroundColor: '#fee2e2', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.5rem' }}>
                                ⚠️ This action cannot be undone
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: 0 }}>
                                You'll need to request to join a household again or create your own household.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowLeaveHousehold(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setHouseholdStatus('none');
                                    setShowLeaveHousehold(false);
                                    alert('You have left the household. The household head has been notified.');
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Leave Household
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Transfer Headship Modal */}
            {showTransferHeadship && (
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
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                🔄 Transfer Headship & Leave
                            </h2>
                            <button
                                onClick={() => setShowTransferHeadship(false)}
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
                                ×
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                                As household head, you must assign a new head before leaving. Select a member to transfer headship to:
                            </p>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                                    New Household Head
                                </label>
                                <select
                                    value={selectedNewHead}
                                    onChange={(e) => setSelectedNewHead(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    <option value="">Select a member...</option>
                                    {householdMembers.map(member => (
                                        <option key={member.id} value={member.id}>
                                            {member.name} ({member.id})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fef3c7', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                                📋 What happens next:
                            </h3>
                            <ul style={{ fontSize: '0.75rem', color: '#92400e', paddingLeft: '1rem', margin: 0 }}>
                                <li>The selected member will be notified of the headship transfer</li>
                                <li>They'll become the new household head immediately</li>
                                <li>You'll leave the household and return to "No Household" status</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => {
                                    setShowTransferHeadship(false);
                                    setSelectedNewHead('');
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedNewHead) {
                                        const newHead = householdMembers.find(m => m.id === selectedNewHead);
                                        setHouseholdStatus('none');
                                        setShowTransferHeadship(false);
                                        setSelectedNewHead('');
                                        alert(`Headship transferred to ${newHead?.name}! They have been notified. You have left the household.`);
                                    } else {
                                        alert('Please select a member to transfer headship to');
                                    }
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Transfer & Leave
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Household Invitations Modal */}
            {showHouseholdInvitations && (
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                � Household Invitations
                            </h2>
                            <button
                                onClick={() => setShowHouseholdInvitations(false)}
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
                                ×
                            </button>
                        </div>

                        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                            Review invitations from household heads who want to add you to their household.
                        </p>

                        {householdInvitations.length === 0 ? (
                            <div style={{ 
                                textAlign: 'center', 
                                padding: '2rem',
                                color: '#6b7280'
                            }}>
                                <p>No household invitations at this time.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {householdInvitations.map((invitation) => (
                                    <div key={invitation.id} style={{
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '0.5rem',
                                        padding: '1.5rem',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                                                    Invitation from {invitation.householdHead}
                                                </div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                    Household ID: {invitation.householdId}
                                                </div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                    Address: {invitation.address}
                                                </div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                    Proposed Role: {invitation.proposedRole}
                                                </div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                                                    Invite Date: {invitation.inviteDate}
                                                </div>
                                                <div style={{ 
                                                    fontSize: '0.875rem', 
                                                    color: '#374151',
                                                    backgroundColor: '#f3f4f6',
                                                    padding: '0.5rem',
                                                    borderRadius: '0.25rem',
                                                    fontStyle: 'italic'
                                                }}>
                                                    "{invitation.message}"
                                                </div>
                                            </div>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: '#f59e0b',
                                                backgroundColor: '#fef3c7',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {invitation.status}
                                            </span>
                                        </div>
                                        
                                        {invitation.status === 'Pending' && (
                                            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => {
                                                        alert(`Invitation from ${invitation.householdHead} has been declined.`);
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        backgroundColor: '#fef2f2',
                                                        color: '#dc2626',
                                                        border: '1px solid #dc2626',
                                                        borderRadius: '0.5rem',
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    Decline
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setHouseholdStatus('member');
                                                        setShowHouseholdInvitations(false);
                                                        alert(`You have joined ${invitation.householdHead}'s household as ${invitation.proposedRole}.`);
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        backgroundColor: '#dcfce7',
                                                        color: '#16a34a',
                                                        border: '1px solid #16a34a',
                                                        borderRadius: '0.5rem',
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    Accept
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Unified Document Upload Dropbox Modal */}
            {showDocumentDropbox && (
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
                                📎 Upload Supporting Documents
                            </h2>
                            <button
                                onClick={() => setShowDocumentDropbox(false)}
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
                                ×
                            </button>
                        </div>

                        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                            Upload supporting documents to speed up the approval process for your profile and household information.
                        </p>

                        {/* Single File Upload Area - Similar to Registration */}
                        <div style={{
                            border: '2px dashed #cbd5e1',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            textAlign: 'center',
                            backgroundColor: '#f8fafc',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📎</div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                                    Drop files here or click to browse
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                                    Support for PDF, JPG, JPEG, PNG files up to 5MB each
                                </p>
                                
                                {/* Document Categories as Text Notes */}
                                <div style={{ 
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    textAlign: 'left',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                                        📋 Documents you can upload:
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                                        <div>
                                            <strong style={{ color: '#374151' }}>🆔 Identity Documents:</strong> Birth Certificate, Valid ID, Passport, etc.
                                        </div>
                                        <div>
                                            <strong style={{ color: '#374151' }}>🏠 Address Verification:</strong> Utility Bills, Lease Agreement, Property Documents, etc.
                                        </div>
                                        <div>
                                            <strong style={{ color: '#374151' }}>💼 Employment/Business Documents:</strong> Certificate of Employment, Business Permit, TIN/SSS Records, etc.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>

                        <div style={{ 
                            backgroundColor: '#dcfce7',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            marginTop: '1.5rem'
                        }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>
                                📋 Upload Guidelines:
                            </h3>
                            <ul style={{ fontSize: '0.75rem', color: '#166534', paddingLeft: '1rem', margin: 0 }}>
                                <li>Accepted formats: PDF, JPG, JPEG, PNG</li>
                                <li>Maximum file size: 5MB per document</li>
                                <li>Ensure documents are clear and readable</li>
                                <li>Original or certified copies preferred</li>
                            </ul>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => setShowDocumentDropbox(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    alert('Documents uploaded successfully! Your profile will be reviewed faster.');
                                    setShowDocumentDropbox(false);
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#16a34a',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                }}
                            >
                                Upload Documents
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Dashboard;
