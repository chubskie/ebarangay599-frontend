import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaUser,
    FaFileAlt,
    FaExclamationCircle,
    FaCalendar,
    FaIdCard,
    FaSignOutAlt
} from 'react-icons/fa';

interface ResidentDashboardNavProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const ResidentDashboardNav: React.FC<ResidentDashboardNavProps> = ({ activeSection, setActiveSection }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            // Clear login status
            localStorage.removeItem('isLoggedIn');
            navigate('/');
        }
    };

    const sidebarItems = [
        { id: 'dashboard', icon: FaUser, label: 'Dashboard', route: '/dashboard' },
        { id: 'request', icon: FaFileAlt, label: 'Request New Document', route: '/request-document' },
        { id: 'incident', icon: FaExclamationCircle, label: 'Report an Incident', route: '/resident/report-incident' },
        { id: 'appointment', icon: FaCalendar, label: 'Schedule an Appointment', route: '/schedule-an-appointment' },
        { id: 'barangay-id', icon: FaIdCard, label: 'My Barangay ID', route: '/resident/my-barangay-id' }
    ];

    return (
        <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '280px', 
            height: '100vh',
            backgroundColor: '#1e3a8a', 
            color: 'white', 
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10
        }}>
            {/* Logo Section */}
            <div 
                onClick={() => navigate('/')}
                style={{ 
                    padding: '1.5rem', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
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
                Resident Portal
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
                                }
                                setActiveSection(item.id);
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
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
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
                        <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>Elric Trev</div>
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
    );
};

export default ResidentDashboardNav;