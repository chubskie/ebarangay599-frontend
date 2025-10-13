import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaHome,
    FaUser,
    FaFileAlt,
    FaBullhorn,
    FaCalendarAlt,
    FaInfoCircle,
    FaSignOutAlt,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle,
    FaCalendar,
    FaExclamationCircle,
    FaIdCard
} from 'react-icons/fa';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            // Clear login status
            localStorage.removeItem('isLoggedIn');
            navigate('/');
        }
    };

    const sidebarItems = [
        { id: 'dashboard', icon: FaUser, label: 'Dashboard', active: true },
        { id: 'home', icon: FaHome, label: 'Home', route: '/' },
        { id: 'announcements', icon: FaBullhorn, label: 'Announcements', route: '/announcements' },
        { id: 'events', icon: FaCalendarAlt, label: 'Events', route: '/events' },
        { id: 'about', icon: FaInfoCircle, label: 'About Us', route: '/about' },
        { id: 'contact', icon: FaInfoCircle, label: 'Contact Us', route: '/contact' },
        { id: 'request', icon: FaFileAlt, label: 'Request New Document' },
        { id: 'incident', icon: FaExclamationCircle, label: 'Report an Incident' },
        { id: 'meeting', icon: FaCalendar, label: 'Schedule a Meeting' },
        { id: 'barangay-id', icon: FaIdCard, label: 'My Barangay ID' }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Sidebar */}
            <div style={{ 
                width: '280px', 
                backgroundColor: '#1e3a8a', 
                color: 'white', 
                padding: '0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Logo Section */}
                <div style={{ 
                    padding: '1.5rem', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <img 
                        src="/logo/barangay-599-logo.png" 
                        alt="Barangay 599 Logo" 
                        style={{ width: '32px', height: '32px' }}
                    />
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>BARANGAY 599</span>
                </div>

                {/* Platform Label */}
                <div style={{ 
                    padding: '1rem 1.5rem 0.5rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    Platform
                </div>

                {/* Navigation Items */}
                <nav style={{ flex: 1, padding: '0 0.75rem' }}>
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.id === activeSection;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.route) {
                                        navigate(item.route);
                                    } else {
                                        setActiveSection(item.id);
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    margin: '0.125rem 0',
                                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    textAlign: 'left',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <Icon style={{ width: '1rem', height: '1rem' }} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div style={{ 
                    padding: '1.5rem', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: 'bold'
                        }}>
                            ET
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>Ethic Trev</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>Barangay 599 User</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255, 255, 255, 0.7)',
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                        title="Logout"
                    >
                        <FaSignOutAlt style={{ width: '1rem', height: '1rem' }} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    {/* Status Cards */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '1.5rem', 
                        marginBottom: '2rem' 
                    }}>
                        {/* Approved Documents */}
                        <div style={{
                            backgroundColor: '#10b981',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <FaCheckCircle style={{ width: '1.5rem', height: '1.5rem' }} />
                                <span style={{ fontWeight: '600' }}>Approved Documents</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>0</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Ready for pickup</div>
                        </div>

                        {/* Pending Requests */}
                        <div style={{
                            backgroundColor: '#f59e0b',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <FaClock style={{ width: '1.5rem', height: '1.5rem' }} />
                                <span style={{ fontWeight: '600' }}>Pending Requests</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>1</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Under review</div>
                        </div>

                        {/* Urgent Notices */}
                        <div style={{
                            backgroundColor: '#ef4444',
                            borderRadius: '0.75rem',
                            padding: '2rem',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <FaExclamationTriangle style={{ width: '1.5rem', height: '1.5rem' }} />
                                <span style={{ fontWeight: '600' }}>Urgent Notices</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>1</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Requires attention</div>
                        </div>
                    </div>

                    {/* Dashboard Title */}
                    <h1 style={{ 
                        fontSize: '1.875rem', 
                        fontWeight: 'bold', 
                        color: '#1f2937', 
                        marginBottom: '2rem' 
                    }}>
                        My Dashboard
                    </h1>

                    {/* Content Grid */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        {/* Profile Summary */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600', 
                                color: '#1f2937', 
                                marginBottom: '1rem' 
                            }}>
                                Profile Summary
                            </h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Full Name:</span>
                                    <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Ethic Trev</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Resident ID:</span>
                                    <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>RES-599-2025-001</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Address:</span>
                                    <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Barangay 599, Zone 58</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Status:</span>
                                    <span style={{ 
                                        fontWeight: '500', 
                                        fontSize: '0.875rem',
                                        color: '#059669',
                                        backgroundColor: '#d1fae5',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '0.25rem'
                                    }}>
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Household Profile */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600', 
                                color: '#1f2937', 
                                marginBottom: '1rem' 
                            }}>
                                Household Profile
                            </h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Household Head:</span>
                                    <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Ethic Trev</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Family Members:</span>
                                    <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>4</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>House Number:</span>
                                    <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Block 15, Lot 8</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Registration Date:</span>
                                    <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>January 15, 2025</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Request Status */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600', 
                                color: '#1f2937', 
                                marginBottom: '1rem' 
                            }}>
                                Service Request Status
                            </h2>
                            
                            <div style={{
                                backgroundColor: '#fef3c7',
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                border: '1px solid #fbbf24'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <FaClock style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} />
                                    <span style={{ fontWeight: '600', color: '#92400e' }}>Barangay Clearance</span>
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.25rem' }}>
                                    Under review
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#78716c' }}>
                                    Ref: BC-J77584360928R08
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#78716c' }}>
                                    Submitted: Oct 2, 2025
                                </div>
                            </div>
                        </div>

                        {/* Appointment Request Status */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600', 
                                color: '#1f2937', 
                                marginBottom: '1rem' 
                            }}>
                                Appointment Request Status
                            </h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Confirmed Appointment */}
                                <div style={{
                                    backgroundColor: '#dcfce7',
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    border: '1px solid #16a34a'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <FaCheckCircle style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                                        <span style={{ fontWeight: '600', color: '#166534' }}>Meeting with Barangay Captain</span>
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '0.25rem' }}>
                                        Confirmed - Tomorrow, 2:00 PM
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#78716c' }}>
                                        Purpose: Business permit consultation
                                    </div>
                                </div>

                                {/* Pending Request */}
                                <div style={{
                                    backgroundColor: '#fef3c7',
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    border: '1px solid #fbbf24'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <FaClock style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} />
                                        <span style={{ fontWeight: '600', color: '#92400e' }}>Document Pickup</span>
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.25rem' }}>
                                        Pending approval
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#78716c' }}>
                                        Requested for: Oct 15, 2025
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Incident Reports Status */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600', 
                                color: '#1f2937', 
                                marginBottom: '1rem' 
                            }}>
                                Incident Reports Status
                            </h2>
                            
                            <div style={{
                                backgroundColor: '#f3f4f6',
                                borderRadius: '0.5rem',
                                padding: '2rem',
                                textAlign: 'center' as const,
                                color: '#6b7280'
                            }}>
                                <FaCheckCircle style={{ 
                                    width: '2rem', 
                                    height: '2rem', 
                                    margin: '0 auto 1rem',
                                    color: '#10b981'
                                }} />
                                <p style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                                    No Active Reports
                                </p>
                                <p style={{ fontSize: '0.75rem' }}>
                                    You have no pending incident reports at this time.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;