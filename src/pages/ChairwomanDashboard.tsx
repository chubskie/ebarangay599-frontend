import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../components/ChairwomanDashboardNav';
import { 
    FaChartBar,
    FaUsers,
    FaFileAlt,
    FaCalendarAlt,
    FaExclamationTriangle,
    FaDollarSign,
    FaClipboardList,
    FaHandshake,
    FaUserTie,
    FaPhone,
    FaClock
} from 'react-icons/fa';

const ChairwomanDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');

    // Role protection - redirect if not chairwoman
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn || userRole !== 'chairwoman') {
            navigate('/login');
            return;
        }
    }, [navigate]);

    // Sample data for reports and analytics
    const reportsData = {
        transactions: {
            total: 156,
            pending: 23,
            completed: 125,
            cancelled: 8
        },
        incidents: {
            total: 42,
            resolved: 35,
            pending: 5,
            investigating: 2
        },
        demographics: {
            totalResidents: 2847,
            households: 892,
            maleResidents: 1423,
            femaleResidents: 1424,
            seniors: 312,
            minors: 567
        },
        financial: {
            monthlyRevenue: 145000,
            expenses: 98000,
            pendingPayments: 25000,
            budget: 200000
        },
        services: {
            clearanceRequests: 67,
            permitApplications: 34,
            idRequests: 89,
            certificateRequests: 45
        }
    };

    const recentActivities = [
        { id: 1, type: 'Service Request', description: 'Barangay Clearance Application', time: '2 hours ago', status: 'pending' },
        { id: 2, type: 'Incident Report', description: 'Noise Complaint - Narra Street', time: '4 hours ago', status: 'investigating' },
        { id: 3, type: 'Appointment Request', description: 'Business Permit Consultation', time: '6 hours ago', status: 'approved' },
        { id: 4, type: 'Service Request', description: 'Residency Certificate', time: '8 hours ago', status: 'completed' },
        { id: 5, type: 'Incident Report', description: 'Street Light Malfunction', time: '1 day ago', status: 'resolved' }
    ];

    const renderDashboard = () => (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Barangay Chairperson Dashboard
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                    Welcome back, Chairwoman Alviso. Here's an overview of your barangay's current status.
                </p>
            </div>

            {/* Profile Summary */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaUserTie style={{ color: '#3b82f6' }} />
                    Profile Summary
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Role</p>
                        <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Barangay Chairperson</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Full Name</p>
                        <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Editha E. Alviso</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Contact Number</p>
                        <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaPhone style={{ fontSize: '0.875rem', color: '#6b7280' }} />
                            09293398212
                        </p>
                    </div>
                </div>
            </div>

            {/* Reports & Analytics */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaChartBar style={{ color: '#3b82f6' }} />
                    Reports & Analytics
                </h2>
                
                {/* Statistics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {/* Transaction Reports */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                backgroundColor: '#dbeafe',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaFileAlt style={{ color: '#3b82f6', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Transaction Reports</h3>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Total: {reportsData.transactions.total}</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <div>Completed: {reportsData.transactions.completed}</div>
                            <div>Pending: {reportsData.transactions.pending}</div>
                        </div>
                    </div>

                    {/* Incident Reports */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                backgroundColor: '#fef3c7',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Incident Reports</h3>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Total: {reportsData.incidents.total}</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <div>Resolved: {reportsData.incidents.resolved}</div>
                            <div>Pending: {reportsData.incidents.pending}</div>
                        </div>
                    </div>

                    {/* Demographics */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                backgroundColor: '#dcfce7',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaUsers style={{ color: '#16a34a', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Demographics</h3>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Residents: {reportsData.demographics.totalResidents}</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <div>Households: {reportsData.demographics.households}</div>
                            <div>Seniors: {reportsData.demographics.seniors}</div>
                        </div>
                    </div>

                    {/* Financial Reports */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                backgroundColor: '#fce7f3',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaDollarSign style={{ color: '#ec4899', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Financial Reports</h3>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Revenue: ₱{reportsData.financial.monthlyRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <div>Expenses: ₱{reportsData.financial.expenses.toLocaleString()}</div>
                            <div>Budget: ₱{reportsData.financial.budget.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Requests & Appointments */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Service Requests */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaClipboardList style={{ color: '#3b82f6' }} />
                        Service Requests
                    </h3>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', color: '#1f2937' }}>Clearance Requests</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#3b82f6' }}>{reportsData.services.clearanceRequests}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', color: '#1f2937' }}>Permit Applications</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#3b82f6' }}>{reportsData.services.permitApplications}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', color: '#1f2937' }}>ID Requests</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#3b82f6' }}>{reportsData.services.idRequests}</span>
                        </div>
                    </div>
                </div>

                {/* Appointment Requests */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaHandshake style={{ color: '#16a34a' }} />
                        Appointment Requests
                    </h3>
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <FaCalendarAlt style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '1rem' }} />
                        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                            No pending appointment requests at the moment.
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
            }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaClock style={{ color: '#f59e0b' }} />
                    Recent Activities
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {recentActivities.map((activity) => (
                        <div key={activity.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                                        {activity.type}
                                    </span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '0.375rem',
                                        backgroundColor: activity.status === 'completed' ? '#dcfce7' : 
                                                       activity.status === 'pending' ? '#fef3c7' : 
                                                       activity.status === 'approved' ? '#dbeafe' : '#fee2e2',
                                        color: activity.status === 'completed' ? '#166534' : 
                                               activity.status === 'pending' ? '#92400e' : 
                                               activity.status === 'approved' ? '#1e40af' : '#991b1b'
                                    }}>
                                        {activity.status}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                    {activity.description}
                                </p>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'right' }}>
                                {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return renderDashboard();
            case 'home':
                return (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>Home</h2>
                        <p style={{ color: '#6b7280' }}>Welcome to the Barangay 599 Main Page</p>
                    </div>
                );
            case 'announcements':
                return (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>Announcements</h2>
                        <p style={{ color: '#6b7280' }}>View and manage barangay announcements</p>
                    </div>
                );
            case 'events':
                return (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>Events</h2>
                        <p style={{ color: '#6b7280' }}>Manage community events and activities</p>
                    </div>
                );
            case 'resident-management':
                return (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>Resident Management</h2>
                        <p style={{ color: '#6b7280' }}>Manage resident information and records</p>
                    </div>
                );
            default:
                return (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>
                            {activeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h2>
                        <p style={{ color: '#6b7280' }}>This section is under development</p>
                    </div>
                );
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <ChairwomanDashboardNav 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
            />
            <main style={{ 
                marginLeft: '280px', 
                flex: 1,
                overflowY: 'auto'
            }}>
                {renderContent()}
            </main>
        </div>
    );
};

export default ChairwomanDashboard;
