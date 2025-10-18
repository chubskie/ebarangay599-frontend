import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { 
    FaChartBar,
    FaChartPie,
    FaPrint,
    FaDownload
} from 'react-icons/fa';

const ChairwomanDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [selectedReport, setSelectedReport] = useState('overview');

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
            maleResidents: 1420,
            femaleResidents: 1422,
            intersexResidents: 5,
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
        },
        communityConcerns: 18,
        blotterReports: 5,
        vawcReports: 3,
        registeredVoters: 1311,
        documentRequests: 89,
        appointmentRequests: 12
    };

    // Print function
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const printContent = generatePrintContent();
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    // Download as HTML function
    const handleDownload = () => {
        const content = generatePrintContent();
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedReport}-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Generate print content based on selected report
    const generatePrintContent = () => {
        const reportTitle = {
            'overview': 'Dashboard Overview Report',
            'transaction-report': 'Transaction Report',
            'incident-report': 'Incident Report',
            'demographic-report': 'Demographic & Household-Based Report',
            'financial-reports': 'Financial Report',
            'service-activity-report': 'Service Activity Report',
            'analytics-report': 'Analytics Report'
        }[selectedReport] || 'Report';

        const date = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        let tableContent = '';

        // Generate table based on report type
        switch(selectedReport) {
            case 'overview':
                tableContent = `
                    <h3>Service Requests Summary</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Requests</td>
                                <td>${reportsData.transactions.total}</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>${reportsData.transactions.completed}</td>
                                <td>${Math.round((reportsData.transactions.completed / reportsData.transactions.total) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Pending</td>
                                <td>${reportsData.transactions.pending}</td>
                                <td>${Math.round((reportsData.transactions.pending / reportsData.transactions.total) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Cancelled</td>
                                <td>${reportsData.transactions.cancelled}</td>
                                <td>${Math.round((reportsData.transactions.cancelled / reportsData.transactions.total) * 100)}%</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h3>Incident Resolution Summary</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Incidents</td>
                                <td>${reportsData.incidents.total}</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Resolved</td>
                                <td>${reportsData.incidents.resolved}</td>
                                <td>${Math.round((reportsData.incidents.resolved / reportsData.incidents.total) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Pending</td>
                                <td>${reportsData.incidents.pending}</td>
                                <td>${Math.round((reportsData.incidents.pending / reportsData.incidents.total) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Investigating</td>
                                <td>${reportsData.incidents.investigating}</td>
                                <td>${Math.round((reportsData.incidents.investigating / reportsData.incidents.total) * 100)}%</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'transaction-report':
                tableContent = `
                    <h3>Service Requests Log</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Requests</td>
                                <td>${reportsData.transactions.total}</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>${reportsData.transactions.completed}</td>
                                <td>${Math.round((reportsData.transactions.completed / reportsData.transactions.total) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Pending</td>
                                <td>${reportsData.transactions.pending}</td>
                                <td>${Math.round((reportsData.transactions.pending / reportsData.transactions.total) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Cancelled</td>
                                <td>${reportsData.transactions.cancelled}</td>
                                <td>${Math.round((reportsData.transactions.cancelled / reportsData.transactions.total) * 100)}%</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Complaint Report</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Unresolved Complaints</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>Under Review</td>
                                <td>8</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'incident-report':
                tableContent = `
                    <h3>Blotter Reports</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Blotter Reports</td>
                                <td>${reportsData.blotterReports}</td>
                            </tr>
                            <tr>
                                <td>Resolved</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>Pending</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>VAWC Reports</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total VAWC Reports</td>
                                <td>${reportsData.vawcReports}</td>
                            </tr>
                            <tr>
                                <td>Resolved</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Ongoing</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Community Concerns</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Concerns</td>
                                <td>${reportsData.communityConcerns}</td>
                            </tr>
                            <tr>
                                <td>Active</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>Resolved</td>
                                <td>6</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Resolved Complaints & Repeat Offenders</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Resolved Complaints</td>
                                <td>${reportsData.incidents.resolved}</td>
                            </tr>
                            <tr>
                                <td>Repeat Offenders</td>
                                <td>7</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'demographic-report':
                tableContent = `
                    <h3>Population Statistics</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Total Population</strong></td>
                                <td><strong>${reportsData.demographics.totalResidents.toLocaleString()}</strong></td>
                                <td><strong>100%</strong></td>
                            </tr>
                            <tr>
                                <td>Male Residents</td>
                                <td>${reportsData.demographics.maleResidents.toLocaleString()}</td>
                                <td>${Math.round((reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Female Residents</td>
                                <td>${reportsData.demographics.femaleResidents.toLocaleString()}</td>
                                <td>${Math.round((reportsData.demographics.femaleResidents / reportsData.demographics.totalResidents) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Intersex Residents</td>
                                <td>${reportsData.demographics.intersexResidents}</td>
                                <td>${((reportsData.demographics.intersexResidents / reportsData.demographics.totalResidents) * 100).toFixed(2)}%</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Household Statistics</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Households (Family Master List)</td>
                                <td>${reportsData.demographics.households}</td>
                            </tr>
                            <tr>
                                <td>Household Heads</td>
                                <td>${reportsData.demographics.households}</td>
                            </tr>
                            <tr>
                                <td>Household Members</td>
                                <td>${reportsData.demographics.totalResidents - reportsData.demographics.households}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Age Group Distribution</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Age Group</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Senior Citizens (60+)</td>
                                <td>${reportsData.demographics.seniors}</td>
                                <td>${Math.round((reportsData.demographics.seniors / reportsData.demographics.totalResidents) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Youth/Minors (0-17)</td>
                                <td>${reportsData.demographics.minors}</td>
                                <td>${Math.round((reportsData.demographics.minors / reportsData.demographics.totalResidents) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Adults (18-59)</td>
                                <td>${reportsData.demographics.totalResidents - reportsData.demographics.seniors - reportsData.demographics.minors}</td>
                                <td>${Math.round(((reportsData.demographics.totalResidents - reportsData.demographics.seniors - reportsData.demographics.minors) / reportsData.demographics.totalResidents) * 100)}%</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Special Categories</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PWD (Persons with Disabilities)</td>
                                <td>45</td>
                            </tr>
                            <tr>
                                <td>Registered Voters</td>
                                <td>${reportsData.registeredVoters.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'financial-reports':
                tableContent = `
                    <h3>Financial Overview</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount (PHP)</th>
                                <th>Percentage of Budget</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Total Budget</strong></td>
                                <td><strong>₱${reportsData.financial.budget.toLocaleString()}</strong></td>
                                <td><strong>100%</strong></td>
                            </tr>
                            <tr>
                                <td>Monthly Revenue</td>
                                <td>₱${reportsData.financial.monthlyRevenue.toLocaleString()}</td>
                                <td>${Math.round((reportsData.financial.monthlyRevenue / reportsData.financial.budget) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Expenses</td>
                                <td>₱${reportsData.financial.expenses.toLocaleString()}</td>
                                <td>${Math.round((reportsData.financial.expenses / reportsData.financial.budget) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Pending Payments</td>
                                <td>₱${reportsData.financial.pendingPayments.toLocaleString()}</td>
                                <td>${Math.round((reportsData.financial.pendingPayments / reportsData.financial.budget) * 100)}%</td>
                            </tr>
                            <tr>
                                <td><strong>Net (Revenue - Expenses)</strong></td>
                                <td><strong>₱${(reportsData.financial.monthlyRevenue - reportsData.financial.expenses).toLocaleString()}</strong></td>
                                <td><strong>${Math.round(((reportsData.financial.monthlyRevenue - reportsData.financial.expenses) / reportsData.financial.budget) * 100)}%</strong></td>
                            </tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'service-activity-report':
                tableContent = `
                    <h3>Service Requests Breakdown</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Service Type</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Barangay Clearance</td>
                                <td>${reportsData.services.clearanceRequests}</td>
                                <td>${Math.round((reportsData.services.clearanceRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.idRequests + reportsData.services.certificateRequests)) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Permit Applications</td>
                                <td>${reportsData.services.permitApplications}</td>
                                <td>${Math.round((reportsData.services.permitApplications / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.idRequests + reportsData.services.certificateRequests)) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Barangay ID Requests</td>
                                <td>${reportsData.services.idRequests}</td>
                                <td>${Math.round((reportsData.services.idRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.idRequests + reportsData.services.certificateRequests)) * 100)}%</td>
                            </tr>
                            <tr>
                                <td>Certificate Requests</td>
                                <td>${reportsData.services.certificateRequests}</td>
                                <td>${Math.round((reportsData.services.certificateRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.idRequests + reportsData.services.certificateRequests)) * 100)}%</td>
                            </tr>
                            <tr>
                                <td><strong>Total Services</strong></td>
                                <td><strong>${reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.idRequests + reportsData.services.certificateRequests}</strong></td>
                                <td><strong>100%</strong></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Document & Appointment Requests</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Request Type</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Document Requests</td>
                                <td>${reportsData.documentRequests}</td>
                            </tr>
                            <tr>
                                <td>Appointment Requests</td>
                                <td>${reportsData.appointmentRequests}</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                break;

            case 'analytics-report':
                tableContent = `
                    <h3>Key Performance Indicators</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Value</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Population</td>
                                <td>${reportsData.demographics.totalResidents.toLocaleString()}</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>Total Households</td>
                                <td>${reportsData.demographics.households}</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>Service Completion Rate</td>
                                <td>${Math.round((reportsData.transactions.completed / reportsData.transactions.total) * 100)}%</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>Incident Resolution Rate</td>
                                <td>${Math.round((reportsData.incidents.resolved / reportsData.incidents.total) * 100)}%</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>Budget Utilization</td>
                                <td>${Math.round((reportsData.financial.expenses / reportsData.financial.budget) * 100)}%</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>Pending Transactions</td>
                                <td>${reportsData.transactions.pending}</td>
                                <td>⚠</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Activity Summary</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Total</th>
                                <th>Completed/Resolved</th>
                                <th>Pending/Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Service Requests</td>
                                <td>${reportsData.transactions.total}</td>
                                <td>${reportsData.transactions.completed}</td>
                                <td>${reportsData.transactions.pending}</td>
                            </tr>
                            <tr>
                                <td>Incident Reports</td>
                                <td>${reportsData.incidents.total}</td>
                                <td>${reportsData.incidents.resolved}</td>
                                <td>${reportsData.incidents.pending}</td>
                            </tr>
                            <tr>
                                <td>Community Concerns</td>
                                <td>${reportsData.communityConcerns}</td>
                                <td>6</td>
                                <td>12</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                break;
        }

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>${reportTitle}</title>
                <style>
                    @media print {
                        @page { margin: 1.5cm; }
                        body { margin: 0; }
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        max-width: 210mm;
                        margin: 0 auto;
                    }
                    h1 {
                        color: #1f2937;
                        border-bottom: 3px solid #3b82f6;
                        padding-bottom: 10px;
                        margin-bottom: 5px;
                    }
                    h3 {
                        color: #374151;
                        margin-top: 30px;
                        margin-bottom: 15px;
                        font-size: 1.1em;
                    }
                    .header-info {
                        color: #6b7280;
                        margin-bottom: 30px;
                        font-size: 0.9em;
                    }
                    .profile-section {
                        background-color: #f9fafb;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                        border: 1px solid #e5e7eb;
                    }
                    .profile-section h3 {
                        margin-top: 0;
                        margin-bottom: 10px;
                    }
                    .profile-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 15px;
                    }
                    .profile-item {
                        font-size: 0.9em;
                    }
                    .profile-item label {
                        display: block;
                        color: #6b7280;
                        font-size: 0.85em;
                        margin-bottom: 3px;
                    }
                    .profile-item value {
                        display: block;
                        color: #1f2937;
                        font-weight: 600;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        background-color: white;
                    }
                    th {
                        background-color: #3b82f6;
                        color: white;
                        padding: 12px;
                        text-align: left;
                        font-weight: 600;
                    }
                    td {
                        padding: 10px 12px;
                        border-bottom: 1px solid #e5e7eb;
                        color: #374151;
                    }
                    tr:nth-child(even) {
                        background-color: #f9fafb;
                    }
                    tr:hover {
                        background-color: #f3f4f6;
                    }
                    .footer {
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 2px solid #e5e7eb;
                        text-align: center;
                        color: #6b7280;
                        font-size: 0.85em;
                    }
                </style>
            </head>
            <body>
                <h1>${reportTitle}</h1>
                <div class="header-info">
                    <strong>Date Generated:</strong> ${date}<br>
                    <strong>Barangay:</strong> San Vicente, Olongapo City
                </div>

                <div class="profile-section">
                    <h3>Chairperson Information</h3>
                    <div class="profile-grid">
                        <div class="profile-item">
                            <label>Name</label>
                            <value>Luc Elric R. Trevecedo</value>
                        </div>
                        <div class="profile-item">
                            <label>Username</label>
                            <value>admin1234</value>
                        </div>
                        <div class="profile-item">
                            <label>Contact Number</label>
                            <value>+63 917 123 4567</value>
                        </div>
                        <div class="profile-item">
                            <label>UUID</label>
                            <value>1a2b3c4d-5e6f-4789-9123-abcdef123456</value>
                        </div>
                    </div>
                </div>

                ${tableContent}

                <div class="footer">
                    <p><strong>Barangay 599 E-Barangay Management System</strong></p>
                    <p>This is an official computer-generated report. No signature required.</p>
                </div>
            </body>
            </html>
        `;
    };

    const renderDashboard = () => (
        <div>
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
                    Barangay Admin Dashboard
                </h1>
                <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    marginTop: '0.25rem',
                    marginBottom: 0
                }}>
                    Overview of barangay statistics and reports
                </p>
            </header>

            {/* Profile Summary */}
            <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem 2rem', 
                borderBottom: '1px solid #e5e7eb',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
            }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.25rem' }}>UUID</div>
                    <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '500' }}>1a2b3c4d-5e6f-4789-9123-abcdef123456</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.25rem' }}>Username</div>
                    <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '500' }}>admin1234</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.25rem' }}>Name</div>
                    <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '500' }}>Luc Elric R. Trevecedo</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.25rem' }}>Contact Number</div>
                    <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '500' }}>+63 917 123 4567</div>
                </div>
            </div>

            {/* Dashboard Content */}
            <main style={{ padding: '2rem', backgroundColor: '#f8fafc' }}>

                {/* Colorful Stats Cards - Row 1 */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                    gap: '1rem', 
                    marginBottom: '1.5rem' 
                }}>
                    {/* Households */}
                    <div style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.demographics.households}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Households</div>
                    </div>

                    {/* Population */}
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.demographics.totalResidents.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Population</div>
                    </div>

                    {/* Community Concerns */}
                    <div style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.communityConcerns}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Community Concerns</div>
                    </div>

                    {/* Blotter Reports */}
                    <div style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.blotterReports}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Blotter Reports</div>
                    </div>
                </div>

                {/* Colorful Stats Cards - Row 2 */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                    gap: '1rem', 
                    marginBottom: '2rem' 
                }}>
                    {/* VAWC Reports */}
                    <div style={{
                        background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.vawcReports}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>VAWC Reports</div>
                    </div>

                    {/* Registered Voters */}
                    <div style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.registeredVoters.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Registered Voters</div>
                    </div>

                    {/* Document Requests */}
                    <div style={{
                        background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(249, 115, 22, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.documentRequests}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Document Requests</div>
                    </div>

                    {/* Appointment Requests */}
                    <div style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            {reportsData.appointmentRequests}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Appointment Requests</div>
                    </div>
                </div>

                {/* Report Selector and Charts */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    marginBottom: '2rem'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1', minWidth: '250px' }}>
                                <label style={{ 
                                    display: 'block', 
                                    fontSize: '0.875rem', 
                                    fontWeight: '600', 
                                    color: '#1f2937',
                                    marginBottom: '0.5rem'
                                }}>
                                    Select Report Type
                                </label>
                                <select
                                    value={selectedReport}
                                    onChange={(e) => setSelectedReport(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '0.875rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="overview">Overview</option>
                                    <option value="transaction-report">Transaction Report</option>
                                    <option value="incident-report">Incident Report</option>
                                    <option value="demographic-report">Demographic & Household-Based Reports</option>
                                    <option value="financial-reports">Financial Reports</option>
                                    <option value="service-activity-report">Service Activity Reports</option>
                                    <option value="analytics-report">Analytics</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={handlePrint}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.25rem',
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                >
                                    <FaPrint />
                                    Print Report
                                </button>
                                <button
                                    onClick={handleDownload}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.25rem',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                                >
                                    <FaDownload />
                                    Download Report
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Charts Based on Selection */}
                    <div style={{ marginTop: '2rem' }}>
                        {selectedReport === 'overview' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                                    Dashboard Overview
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {/* Pie Chart - Service Completion */}
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '220px',
                                            height: '220px',
                                            margin: '0 auto 1rem',
                                            borderRadius: '50%',
                                            background: `conic-gradient(#22c55e 0deg ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg, #f59e0b ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg 360deg)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 16px -1px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <div style={{
                                                width: '160px',
                                                height: '160px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937' }}>
                                                    {Math.round((reportsData.transactions.completed / reportsData.transactions.total) * 100)}%
                                                </div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Completed</div>
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Service Requests</h4>
                                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Completed: {reportsData.transactions.completed}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Pending: {reportsData.transactions.pending}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pie Chart - Incident Resolution */}
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '220px',
                                            height: '220px',
                                            margin: '0 auto 1rem',
                                            borderRadius: '50%',
                                            background: `conic-gradient(#3b82f6 0deg ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg, #ef4444 ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg 360deg)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 16px -1px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <div style={{
                                                width: '160px',
                                                height: '160px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937' }}>
                                                    {Math.round((reportsData.incidents.resolved / reportsData.incidents.total) * 100)}%
                                                </div>
                                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Resolved</div>
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Incident Resolution</h4>
                                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Resolved: {reportsData.incidents.resolved}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Pending: {reportsData.incidents.pending}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TRANSACTION REPORT - View All */}
                        {selectedReport === 'transaction-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '2rem' }}>
                                    Transaction Reports
                                </h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                                    {/* Service Requests Log */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Service Requests Log</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #22c55e 0deg ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg,
                                                    #f59e0b ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg ${((reportsData.transactions.completed + reportsData.transactions.pending) / reportsData.transactions.total) * 360}deg,
                                                    #ef4444 ${((reportsData.transactions.completed + reportsData.transactions.pending) / reportsData.transactions.total) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <div style={{
                                                    width: '140px',
                                                    height: '140px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.transactions.total}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Completed: {reportsData.transactions.completed}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Pending: {reportsData.transactions.pending}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Cancelled: {reportsData.transactions.cancelled}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Finished Request Report */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Finished Request Report</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#22c55e 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '140px',
                                                    height: '140px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>{reportsData.transactions.completed}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Completed</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Complaint Report */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Complaint Report</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #ef4444 0deg ${(reportsData.communityConcerns / (reportsData.communityConcerns + 10)) * 360}deg,
                                                    #f59e0b ${(reportsData.communityConcerns / (reportsData.communityConcerns + 10)) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '140px',
                                                    height: '140px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.communityConcerns}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Active Complaints</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Unresolved: {reportsData.communityConcerns}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Under Review: 10</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* INCIDENT REPORT - View All */}
                        {selectedReport === 'incident-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '2rem' }}>
                                    Incident Reports
                                </h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {/* Blotter Reports Log */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Blotter Reports Log</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '180px',
                                                height: '180px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#22c55e 0deg 216deg, #f59e0b 216deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <div style={{
                                                    width: '130px',
                                                    height: '130px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.blotterReports}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Blotters</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Resolved: 3</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Pending: 2</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* VAWC Reports Log */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>VAWC Reports Log</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '180px',
                                                height: '180px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#22c55e 0deg 240deg, #ef4444 240deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '130px',
                                                    height: '130px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.vawcReports}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total VAWC</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Resolved: 2</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Ongoing: 1</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resolved Complaints */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Resolved Complaints</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '180px',
                                                height: '180px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#22c55e 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '130px',
                                                    height: '130px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>{reportsData.incidents.resolved}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Resolved</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Repeat Offender Log */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Repeat Offender Log</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '180px',
                                                height: '180px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#dc2626 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '130px',
                                                    height: '130px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#dc2626' }}>7</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Repeat Offenders</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Community Concerns */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Community Concerns</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '180px',
                                                height: '180px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #f59e0b 0deg ${(reportsData.communityConcerns / (reportsData.communityConcerns + 5)) * 360}deg,
                                                    #22c55e ${(reportsData.communityConcerns / (reportsData.communityConcerns + 5)) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '130px',
                                                    height: '130px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.communityConcerns}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Concerns</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Active: {reportsData.communityConcerns}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Resolved: 5</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* DEMOGRAPHIC REPORT - View All */}
                        {selectedReport === 'demographic-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '2rem' }}>
                                    Demographic & Household Reports
                                </h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    {/* Family Master List */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Family Master List</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#3b82f6 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#3b82f6' }}>{reportsData.demographics.households}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Families</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Senior Citizens */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Senior Citizens List</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#8b5cf6 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#8b5cf6' }}>{reportsData.demographics.seniors}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Seniors</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Youth/Minor */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Youth/Minor List</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#f59e0b 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f59e0b' }}>{reportsData.demographics.minors}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Minors</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PWD List */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>PWD List</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#10b981 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10b981' }}>45</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>PWDs</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Population by Gender */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Population by Gender</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #3b82f6 0deg ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg,
                                                    #ec4899 ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg ${((reportsData.demographics.maleResidents + reportsData.demographics.femaleResidents) / reportsData.demographics.totalResidents) * 360}deg,
                                                    #8b5cf6 ${((reportsData.demographics.maleResidents + reportsData.demographics.femaleResidents) / reportsData.demographics.totalResidents) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.demographics.totalResidents.toLocaleString()}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Total</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '0.7rem', flexWrap: 'wrap' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Male: {reportsData.demographics.maleResidents}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ec4899' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Female: {reportsData.demographics.femaleResidents}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Intersex: {reportsData.demographics.intersexResidents}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Household Members & Head List */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Household Members & Head List</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #0891b2 0deg ${(reportsData.demographics.households / reportsData.demographics.totalResidents) * 360}deg,
                                                    #6366f1 ${(reportsData.demographics.households / reportsData.demographics.totalResidents) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                                                        {reportsData.demographics.totalResidents.toLocaleString()}
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Total People</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '0.7rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0891b2' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Heads: {reportsData.demographics.households}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Members: {reportsData.demographics.totalResidents - reportsData.demographics.households}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SERVICE ACTIVITY REPORT - View All */}
                        {selectedReport === 'service-activity-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '2rem' }}>
                                    Service Activity Reports
                                </h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {/* Service Requests Log */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Service Requests Log</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #3b82f6 0deg ${(reportsData.services.clearanceRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg,
                                                    #10b981 ${(reportsData.services.clearanceRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg ${((reportsData.services.clearanceRequests + reportsData.services.permitApplications) / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg,
                                                    #f59e0b ${((reportsData.services.clearanceRequests + reportsData.services.permitApplications) / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <div style={{
                                                    width: '140px',
                                                    height: '140px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
                                                        {reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Services</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Clearance: {reportsData.services.clearanceRequests}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Permits: {reportsData.services.permitApplications}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Certificates: {reportsData.services.certificateRequests}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Finished Requests */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Finished Request Report</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#22c55e 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '140px',
                                                    height: '140px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>
                                                        {reportsData.services.clearanceRequests + reportsData.services.certificateRequests}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Finished</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Complaint Report */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Service Complaints</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#ef4444 0deg 288deg, #22c55e 288deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '140px',
                                                    height: '140px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>12</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Complaints</div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Active: 10</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                    <span style={{ color: '#6b7280' }}>Resolved: 2</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ANALYTICS REPORT - View All */}
                        {selectedReport === 'analytics-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '2rem' }}>
                                    Analytics
                                </h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    {/* Population Statistics */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Population Statistics</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #3b82f6 0deg ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg,
                                                    #ec4899 ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.demographics.totalResidents.toLocaleString()}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Total Population</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Household Demographics */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Household Demographics</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#16a34a 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#16a34a' }}>{reportsData.demographics.households}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Households</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Service Response Times */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Service Response Times</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#22c55e 0deg 240deg, #f59e0b 240deg 300deg, #ef4444 300deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937' }}>2.5</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Avg. Days</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financial Analytics */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Financial Analytics</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#8b5cf6 0deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#8b5cf6' }}>₱{(reportsData.financial.budget / 1000).toFixed(0)}K</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Budget</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Complaint Trends */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Complaint Trends</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(#ef4444 0deg 180deg, #f59e0b 180deg 270deg, #22c55e 270deg 360deg)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937' }}>{reportsData.communityConcerns}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Complaints</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resolution Rates */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Resolution Rates</h4>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                margin: '0 auto',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                    #22c55e 0deg ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg,
                                                    #ef4444 ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg 360deg
                                                )`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3)'
                                            }}>
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column'
                                                }}>
                                                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#22c55e' }}>
                                                        {Math.round((reportsData.incidents.resolved / reportsData.incidents.total) * 100)}%
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Resolution</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transaction Report - Service Requests Log */}
                        {selectedReport === 'service-requests-log' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#3b82f6' }} />
                                    Service Requests Log
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg,
                                            #f59e0b ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg ${((reportsData.transactions.completed + reportsData.transactions.pending) / reportsData.transactions.total) * 360}deg,
                                            #ef4444 ${((reportsData.transactions.completed + reportsData.transactions.pending) / reportsData.transactions.total) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.transactions.total}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Service Requests</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed: {reportsData.transactions.completed}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pending: {reportsData.transactions.pending}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cancelled: {reportsData.transactions.cancelled}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transaction Report - Finished Request Report */}
                        {selectedReport === 'finished-request-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartBar style={{ color: '#22c55e' }} />
                                    Finished Request Report
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(#22c55e 0deg 360deg)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(34, 197, 94, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#22c55e' }}>
                                                {reportsData.transactions.completed}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Completed Requests</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transaction Report - Complaint Report */}
                        {selectedReport === 'complaint-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#ef4444' }} />
                                    Complaint Report
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #ef4444 0deg ${(reportsData.communityConcerns / (reportsData.communityConcerns + 10)) * 360}deg,
                                            #f59e0b ${(reportsData.communityConcerns / (reportsData.communityConcerns + 10)) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(239, 68, 68, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.communityConcerns}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Active Complaints</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Unresolved: {reportsData.communityConcerns}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Under Review: 10</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Keep old transaction for backward compatibility */}
                        {selectedReport === 'transaction' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#3b82f6' }} />
                                    Transaction Reports
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg,
                                            #f59e0b ${(reportsData.transactions.completed / reportsData.transactions.total) * 360}deg ${((reportsData.transactions.completed + reportsData.transactions.pending) / reportsData.transactions.total) * 360}deg,
                                            #ef4444 ${((reportsData.transactions.completed + reportsData.transactions.pending) / reportsData.transactions.total) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.transactions.total}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Transactions</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed: {reportsData.transactions.completed}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pending: {reportsData.transactions.pending}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cancelled: {reportsData.transactions.cancelled}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Incident Report - Blotter Reports Log */}
                        {selectedReport === 'blotter-reports-log' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#f59e0b' }} />
                                    Blotter Reports Log
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg,
                                            #f59e0b ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.blotterReports}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Blotter Reports</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Resolved: 3</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pending: 2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Incident Report - VAWC Reports Log */}
                        {selectedReport === 'vawc-reports-log' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#ec4899' }} />
                                    VAWC Reports Log
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg ${(2 / reportsData.vawcReports) * 360}deg,
                                            #ef4444 ${(2 / reportsData.vawcReports) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(236, 72, 153, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.vawcReports}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total VAWC Reports</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Resolved: 2</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ongoing: 1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Incident Report - Resolved Complaints Report */}
                        {selectedReport === 'resolved-complaints-report' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartBar style={{ color: '#22c55e' }} />
                                    Resolved Complaints Report
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(#22c55e 0deg 360deg)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(34, 197, 94, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#22c55e' }}>
                                                {reportsData.incidents.resolved}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Resolved Complaints</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Incident Report - Repeat Offender Log */}
                        {selectedReport === 'repeat-offender-log' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#dc2626' }} />
                                    Repeat Offender Log
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(#dc2626 0deg 360deg)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(220, 38, 38, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#dc2626' }}>
                                                7
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Repeat Offenders</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Keep old incident for backward compatibility */}
                        {selectedReport === 'incident' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#f59e0b' }} />
                                    Incident Reports
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg,
                                            #f59e0b ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg ${((reportsData.incidents.resolved + reportsData.incidents.pending) / reportsData.incidents.total) * 360}deg,
                                            #3b82f6 ${((reportsData.incidents.resolved + reportsData.incidents.pending) / reportsData.incidents.total) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.incidents.total}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Incidents</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Resolved: {reportsData.incidents.resolved}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pending: {reportsData.incidents.pending}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Investigating: {reportsData.incidents.investigating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Demographic Reports - I'll add a few key ones */}
                        {(selectedReport === 'family-master-list' || selectedReport === 'demographic') && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#16a34a' }} />
                                    Demographic & Household Reports
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                                    {/* Population by Gender */}
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '240px',
                                            height: '240px',
                                            margin: '0 auto',
                                            borderRadius: '50%',
                                            background: `conic-gradient(
                                                #3b82f6 0deg ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg,
                                                #ec4899 ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg 360deg
                                            )`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <div style={{
                                                width: '170px',
                                                height: '170px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
                                                    {reportsData.demographics.totalResidents.toLocaleString()}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Population</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Male: {reportsData.demographics.maleResidents}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ec4899' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Female: {reportsData.demographics.femaleResidents}</span>
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginTop: '1rem' }}>Population by Gender</h4>
                                    </div>

                                    {/* Age Distribution */}
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '240px',
                                            height: '240px',
                                            margin: '0 auto',
                                            borderRadius: '50%',
                                            background: `conic-gradient(
                                                #10b981 0deg ${(reportsData.demographics.seniors / reportsData.demographics.totalResidents) * 360}deg,
                                                #f59e0b ${(reportsData.demographics.seniors / reportsData.demographics.totalResidents) * 360}deg ${((reportsData.demographics.seniors + reportsData.demographics.minors) / reportsData.demographics.totalResidents) * 360}deg,
                                                #6366f1 ${((reportsData.demographics.seniors + reportsData.demographics.minors) / reportsData.demographics.totalResidents) * 360}deg 360deg
                                            )`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <div style={{
                                                width: '170px',
                                                height: '170px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
                                                    {reportsData.demographics.totalResidents.toLocaleString()}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>All Ages</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Seniors: {reportsData.demographics.seniors}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Minors: {reportsData.demographics.minors}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#6366f1' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Adults: {reportsData.demographics.totalResidents - reportsData.demographics.seniors - reportsData.demographics.minors}</span>
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginTop: '1rem' }}>Age Distribution</h4>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedReport === 'financial' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                                    Financial Reports
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '300px',
                                        height: '300px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #10b981 0deg ${(reportsData.financial.monthlyRevenue / reportsData.financial.budget) * 360}deg,
                                            #ef4444 ${(reportsData.financial.monthlyRevenue / reportsData.financial.budget) * 360}deg ${((reportsData.financial.monthlyRevenue + reportsData.financial.expenses) / reportsData.financial.budget) * 360}deg,
                                            #d1d5db ${((reportsData.financial.monthlyRevenue + reportsData.financial.expenses) / reportsData.financial.budget) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            width: '220px',
                                            height: '220px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937' }}>
                                                ₱{(reportsData.financial.budget / 1000).toFixed(0)}K
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Budget</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', maxWidth: '600px', margin: '2rem auto 0' }}>
                                        <div style={{ padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '0.5rem' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534' }}>
                                                ₱{reportsData.financial.monthlyRevenue.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#166534', marginTop: '0.25rem' }}>Revenue</div>
                                        </div>
                                        <div style={{ padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '0.5rem' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#991b1b' }}>
                                                ₱{reportsData.financial.expenses.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#991b1b', marginTop: '0.25rem' }}>Expenses</div>
                                        </div>
                                        <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#92400e' }}>
                                                ₱{reportsData.financial.pendingPayments.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#92400e', marginTop: '0.25rem' }}>Pending</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedReport === 'service' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#ec4899' }} />
                                    Service Activity Reports
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #3b82f6 0deg ${(reportsData.services.clearanceRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg,
                                            #10b981 ${(reportsData.services.clearanceRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg ${((reportsData.services.clearanceRequests + reportsData.services.permitApplications) / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg,
                                            #f59e0b ${((reportsData.services.clearanceRequests + reportsData.services.permitApplications) / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Services</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Barangay Clearance: {reportsData.services.clearanceRequests}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Permit Applications: {reportsData.services.permitApplications}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Certificate Requests: {reportsData.services.certificateRequests}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedReport === 'analytics' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartBar style={{ color: '#06b6d4' }} />
                                    Analytics Dashboard
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    {/* Population Statistics */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                                        <div style={{
                                            width: '120px',
                                            height: '120px',
                                            margin: '0 auto 0.75rem',
                                            borderRadius: '50%',
                                            background: `conic-gradient(#3b82f6 0deg ${(reportsData.demographics.totalResidents / 3000) * 360}deg, #e5e7eb ${(reportsData.demographics.totalResidents / 3000) * 360}deg 360deg)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={{
                                                width: '85px',
                                                height: '85px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700',
                                                fontSize: '1.125rem',
                                                color: '#1f2937'
                                            }}>
                                                {reportsData.demographics.totalResidents}
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Population Statistics</h4>
                                    </div>

                                    {/* Household Demographics */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                                        <div style={{
                                            width: '120px',
                                            height: '120px',
                                            margin: '0 auto 0.75rem',
                                            borderRadius: '50%',
                                            background: `conic-gradient(#16a34a 0deg ${(reportsData.demographics.households / 1000) * 360}deg, #e5e7eb ${(reportsData.demographics.households / 1000) * 360}deg 360deg)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={{
                                                width: '85px',
                                                height: '85px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700',
                                                fontSize: '1.125rem',
                                                color: '#1f2937'
                                            }}>
                                                {reportsData.demographics.households}
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Household Demographics</h4>
                                    </div>

                                    {/* Resolution Rates */}
                                    <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                                        <div style={{
                                            width: '120px',
                                            height: '120px',
                                            margin: '0 auto 0.75rem',
                                            borderRadius: '50%',
                                            background: `conic-gradient(#22c55e 0deg ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg, #ef4444 ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg 360deg)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={{
                                                width: '85px',
                                                height: '85px',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700',
                                                fontSize: '1.125rem',
                                                color: '#1f2937'
                                            }}>
                                                {Math.round((reportsData.incidents.resolved / reportsData.incidents.total) * 100)}%
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Resolution Rates</h4>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics - Population Statistics */}
                        {selectedReport === 'population-statistics' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartBar style={{ color: '#3b82f6' }} />
                                    Population Statistics
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #3b82f6 0deg ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg,
                                            #ec4899 ${(reportsData.demographics.maleResidents / reportsData.demographics.totalResidents) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(59, 130, 246, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.demographics.totalResidents.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Population</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Male: {reportsData.demographics.maleResidents}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ec4899' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Female: {reportsData.demographics.femaleResidents}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics - Household Demographics */}
                        {selectedReport === 'household-demographics' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#16a34a' }} />
                                    Household Demographics
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(#16a34a 0deg 360deg)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(22, 163, 74, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#16a34a' }}>
                                                {reportsData.demographics.households}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Households</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginTop: '0.75rem' }}>
                                                {(reportsData.demographics.totalResidents / reportsData.demographics.households).toFixed(2)}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Avg. Size</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics - Service Response Times */}
                        {selectedReport === 'service-response-times' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartBar style={{ color: '#f59e0b' }} />
                                    Service Requests & Response Times
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg 240deg,
                                            #f59e0b 240deg 300deg,
                                            #ef4444 300deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(245, 158, 11, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937' }}>
                                                2.5
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Avg. Days</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Fast (1-2 days): 67%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Moderate (3-5 days): 17%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Slow (5+ days): 16%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics - Financial Analytics */}
                        {(selectedReport === 'financial-analytics' || selectedReport === 'financial' || selectedReport === 'financial-reports') && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#8b5cf6' }} />
                                    Financial Report
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '300px',
                                        height: '300px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg ${(reportsData.financial.monthlyRevenue / reportsData.financial.budget) * 360}deg,
                                            #ef4444 ${(reportsData.financial.monthlyRevenue / reportsData.financial.budget) * 360}deg ${((reportsData.financial.monthlyRevenue + reportsData.financial.expenses) / reportsData.financial.budget) * 360}deg,
                                            #f59e0b ${((reportsData.financial.monthlyRevenue + reportsData.financial.expenses) / reportsData.financial.budget) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(139, 92, 246, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '220px',
                                            height: '220px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
                                                ₱{reportsData.financial.budget.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Budget</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                        <div style={{ padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '0.5rem' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534' }}>
                                                ₱{reportsData.financial.monthlyRevenue.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#166534', marginTop: '0.25rem' }}>Revenue</div>
                                        </div>
                                        <div style={{ padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '0.5rem' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#991b1b' }}>
                                                ₱{reportsData.financial.expenses.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#991b1b', marginTop: '0.25rem' }}>Expenses</div>
                                        </div>
                                        <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#92400e' }}>
                                                ₱{reportsData.financial.pendingPayments.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#92400e', marginTop: '0.25rem' }}>Pending</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics - Complaint Trends */}
                        {selectedReport === 'complaint-trends' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartBar style={{ color: '#ef4444' }} />
                                    Complaint Trends
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #ef4444 0deg 180deg,
                                            #f59e0b 180deg 270deg,
                                            #22c55e 270deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(239, 68, 68, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.communityConcerns}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Complaints</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Noise: 50%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Sanitation: 25%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Others: 25%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics - Resolution Rates */}
                        {selectedReport === 'resolution-rates' && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#22c55e' }} />
                                    Resolution Rates
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #22c55e 0deg ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg,
                                            #ef4444 ${(reportsData.incidents.resolved / reportsData.incidents.total) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(34, 197, 94, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#22c55e' }}>
                                                {Math.round((reportsData.incidents.resolved / reportsData.incidents.total) * 100)}%
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Resolution Rate</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Resolved: {reportsData.incidents.resolved}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Unresolved: {reportsData.incidents.total - reportsData.incidents.resolved}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Service Activity Reports - These mirror Transaction Reports */}
                        {(selectedReport === 'service-requests-log-activity' || selectedReport === 'service') && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaChartPie style={{ color: '#ec4899' }} />
                                    Service Activity - Requests Log
                                </h3>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '280px',
                                        height: '280px',
                                        margin: '0 auto',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                                            #3b82f6 0deg ${(reportsData.services.clearanceRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg,
                                            #10b981 ${(reportsData.services.clearanceRequests / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg ${((reportsData.services.clearanceRequests + reportsData.services.permitApplications) / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg,
                                            #f59e0b ${((reportsData.services.clearanceRequests + reportsData.services.permitApplications) / (reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests)) * 360}deg 360deg
                                        )`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px -1px rgba(236, 72, 153, 0.3)'
                                    }}>
                                        <div style={{
                                            width: '200px',
                                            height: '200px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            padding: '1rem'
                                        }}>
                                            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>
                                                {reportsData.services.clearanceRequests + reportsData.services.permitApplications + reportsData.services.certificateRequests}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Total Services</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Clearance: {reportsData.services.clearanceRequests}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Permits: {reportsData.services.permitApplications}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Certificates: {reportsData.services.certificateRequests}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </main>
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
                            {activeSection.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
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
