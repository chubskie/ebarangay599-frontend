import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaSearch, FaEye, FaEdit, FaTrash, FaHistory, FaUserShield } from 'react-icons/fa';

// Official positions in the barangay
type OfficialPosition = 
    | 'Chairperson' 
    | 'Secretary' 
    | 'Treasurer' 
    | 'Kagawad 1' 
    | 'Kagawad 2' 
    | 'Kagawad 3' 
    | 'Kagawad 4' 
    | 'Kagawad 5' 
    | 'Kagawad 6' 
    | 'Kagawad 7' 
    | 'SK Chairperson'
    | 'System Admin';

interface BarangayOfficial {
    id: number;
    uuid: string;
    fullName: string;
    position: OfficialPosition;
    contactNumber: string;
    emailAddress: string;
    status: 'ACTIVE' | 'INACTIVE';
}

interface AuditLog {
    id: string; // UUID (PK)
    user_id: string | null; // FK to USERS, nullable
    event: string;
    old_values: string | null; // nullable, stored as JSON string
    new_value: string | null; // nullable, stored as JSON string
    auditable_id: string;
    auditable_type: string;
    ip_address: string | null; // nullable
    user_agent: string | null; // nullable
    created_at: string;
    updated_at: string;
}

// Helper interface for displaying audit logs with user info
interface AuditLogDisplay extends AuditLog {
    userName?: string;
    userPosition?: string;
}

const BarangayAccessManagement: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('access-management');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [officials, setOfficials] = useState<BarangayOfficial[]>([]);
    const [selectedOfficial, setSelectedOfficial] = useState<BarangayOfficial | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAuditLogs, setShowAuditLogs] = useState(false);
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [auditSearchTerm, setAuditSearchTerm] = useState('');
    const [auditCurrentPage, setAuditCurrentPage] = useState(1);

    // Helper to generate UUID
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

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
        const sampleOfficials: BarangayOfficial[] = [
            {
                id: 1,
                uuid: '550e8400-e29b-41d4-a716-446655440001',
                fullName: 'Editha E. Alviso',
                position: 'Chairperson',
                contactNumber: '09171234567',
                emailAddress: 'editha.alviso@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 2,
                uuid: '550e8400-e29b-41d4-a716-446655440002',
                fullName: 'jewel nicole Dimaculangan Maming',
                position: 'Secretary',
                contactNumber: '09972858407',
                emailAddress: 'mamingjewel30@gmail.com',
                status: 'ACTIVE'
            },
            {
                id: 3,
                uuid: '550e8400-e29b-41d4-a716-446655440003',
                fullName: 'Maria Dela Cruz',
                position: 'Treasurer',
                contactNumber: '09181234567',
                emailAddress: 'maria.delacruz@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 4,
                uuid: '550e8400-e29b-41d4-a716-446655440004',
                fullName: 'Juan Santos',
                position: 'Kagawad 1',
                contactNumber: '09191234567',
                emailAddress: 'juan.santos@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 5,
                uuid: '550e8400-e29b-41d4-a716-446655440005',
                fullName: 'Pedro Reyes',
                position: 'Kagawad 2',
                contactNumber: '09201234567',
                emailAddress: 'pedro.reyes@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 6,
                uuid: '550e8400-e29b-41d4-a716-446655440006',
                fullName: 'Ana Garcia',
                position: 'Kagawad 3',
                contactNumber: '09211234567',
                emailAddress: 'ana.garcia@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 7,
                uuid: '550e8400-e29b-41d4-a716-446655440007',
                fullName: 'Carlos Mendoza',
                position: 'Kagawad 4',
                contactNumber: '09221234567',
                emailAddress: 'carlos.mendoza@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 8,
                uuid: '550e8400-e29b-41d4-a716-446655440008',
                fullName: 'Rosa Villanueva',
                position: 'Kagawad 5',
                contactNumber: '09231234567',
                emailAddress: 'rosa.villanueva@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 9,
                uuid: '550e8400-e29b-41d4-a716-446655440009',
                fullName: 'Roberto Cruz',
                position: 'Kagawad 6',
                contactNumber: '09241234567',
                emailAddress: 'roberto.cruz@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 10,
                uuid: '550e8400-e29b-41d4-a716-446655440010',
                fullName: 'Linda Ramos',
                position: 'Kagawad 7',
                contactNumber: '09251234567',
                emailAddress: 'linda.ramos@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 11,
                uuid: '550e8400-e29b-41d4-a716-446655440011',
                fullName: 'Miguel Torres',
                position: 'SK Chairperson',
                contactNumber: '09261234567',
                emailAddress: 'miguel.torres@barangay599.gov.ph',
                status: 'ACTIVE'
            },
            {
                id: 12,
                uuid: '550e8400-e29b-41d4-a716-446655440012',
                fullName: 'Luc Elric Trevecedo',
                position: 'System Admin',
                contactNumber: '09271234567',
                emailAddress: 'luc.trevecedo@barangay599.gov.ph',
                status: 'ACTIVE'
            }
        ];
        setOfficials(sampleOfficials);

        // Initialize audit logs with database schema format
        const sampleAuditLogs: AuditLog[] = [
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440012',
                auditable_type: 'User',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440001', // Editha E. Alviso (Chairperson)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440001',
                auditable_type: 'User',
                ip_address: '192.168.1.101',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440003', // Maria Dela Cruz (Treasurer)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440003',
                auditable_type: 'User',
                ip_address: '192.168.1.102',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'ACCOUNT_CREATED',
                old_values: null,
                new_value: JSON.stringify({ 
                    fullName: 'Miguel Torres',
                    position: 'SK Chairperson',
                    accessLevel: 'full'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440011',
                auditable_type: 'User',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440001', // Editha E. Alviso (Chairperson)
                event: 'DOCUMENT_PROCESSED',
                old_values: JSON.stringify({ status: 'pending' }),
                new_value: JSON.stringify({ status: 'approved', documentType: 'Barangay Clearance' }),
                auditable_id: generateUUID(),
                auditable_type: 'Document',
                ip_address: '192.168.1.101',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'PERMISSION_UPDATED',
                old_values: JSON.stringify({ modules: [] }),
                new_value: JSON.stringify({ 
                    modules: ['activity_management'],
                    targetUser: 'Miguel Torres',
                    position: 'SK Chairperson'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440011',
                auditable_type: 'Permission',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440001', // Editha E. Alviso (Chairperson)
                event: 'ANNOUNCEMENT_POSTED',
                old_values: null,
                new_value: JSON.stringify({ 
                    title: 'Upcoming Barangay Assembly',
                    category: 'Community Announcement'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'Announcement',
                ip_address: '192.168.1.101',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440002', // jewel nicole Dimaculangan Maming (Secretary)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440002',
                auditable_type: 'User',
                ip_address: '192.168.1.103',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'PASSWORD_RESET',
                old_values: null,
                new_value: JSON.stringify({ 
                    targetUser: 'Maria Dela Cruz',
                    position: 'Treasurer'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440003',
                auditable_type: 'User',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'SYSTEM_MAINTENANCE',
                old_values: null,
                new_value: JSON.stringify({ 
                    maintenanceType: 'Database Optimization',
                    description: 'Scheduled cleanup'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'System',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440001', // Editha E. Alviso (Chairperson)
                event: 'RESIDENT_UPDATED',
                old_values: JSON.stringify({ address: 'Old Address' }),
                new_value: JSON.stringify({ address: 'Updated Address', contactNumber: 'New Number' }),
                auditable_id: generateUUID(),
                auditable_type: 'Resident',
                ip_address: '192.168.1.101',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'PERMISSION_UPDATED',
                old_values: JSON.stringify({ modules: ['basic'] }),
                new_value: JSON.stringify({ 
                    modules: ['basic', 'financial'],
                    targetUser: 'Maria Dela Cruz',
                    position: 'Treasurer'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440003',
                auditable_type: 'Permission',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440004', // Juan Santos (Kagawad 1)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440004',
                auditable_type: 'User',
                ip_address: '192.168.1.104',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'ACCESS_REVOKED',
                old_values: JSON.stringify({ status: 'active', accessLevel: 'full' }),
                new_value: JSON.stringify({ 
                    status: 'inactive',
                    accessLevel: 'none',
                    targetUser: 'Former Official',
                    reason: 'Resignation from position'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'User',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440003', // Maria Dela Cruz (Treasurer)
                event: 'TRANSACTION_RECORDED',
                old_values: null,
                new_value: JSON.stringify({ 
                    transactionType: 'Payment',
                    amount: 5000,
                    category: 'Barangay Clearance'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'Transaction',
                ip_address: '192.168.1.102',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'SYSTEM_MAINTENANCE',
                old_values: null,
                new_value: JSON.stringify({ 
                    maintenanceType: 'Security Updates',
                    description: 'System patches applied'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'System',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'ACCOUNT_CREATED',
                old_values: null,
                new_value: JSON.stringify({ 
                    fullName: 'Ana Garcia',
                    position: 'Kagawad 3',
                    accessLevel: 'standard'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440006',
                auditable_type: 'User',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'PASSWORD_RESET',
                old_values: null,
                new_value: JSON.stringify({ 
                    targetUser: 'Carlos Mendoza',
                    position: 'Kagawad 4',
                    reason: 'Forgotten credentials'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440007',
                auditable_type: 'User',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440007', // Carlos Mendoza (Kagawad 4)
                event: 'LOGIN',
                old_values: null,
                new_value: JSON.stringify({ note: 'After password reset' }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440007',
                auditable_type: 'User',
                ip_address: '192.168.1.105',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'SYSTEM_MAINTENANCE',
                old_values: null,
                new_value: JSON.stringify({ 
                    maintenanceType: 'System Backup',
                    description: 'All data secured',
                    status: 'completed'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'System',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440002', // jewel nicole Dimaculangan Maming (Secretary)
                event: 'DOCUMENT_ISSUED',
                old_values: null,
                new_value: JSON.stringify({ 
                    documentType: 'Certificate of Residency',
                    status: 'issued'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'Document',
                ip_address: '192.168.1.103',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'PERMISSION_UPDATED',
                old_values: JSON.stringify({ modules: ['basic', 'documents'] }),
                new_value: JSON.stringify({ 
                    modules: ['basic', 'documents', 'announcement'],
                    targetUser: 'jewel nicole Dimaculangan Maming',
                    position: 'Secretary'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440002',
                auditable_type: 'Permission',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440008', // Rosa Villanueva (Kagawad 5)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440008',
                auditable_type: 'User',
                ip_address: '192.168.1.106',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'ACCOUNT_CREATED',
                old_values: null,
                new_value: JSON.stringify({ 
                    fullName: 'Roberto Cruz',
                    position: 'Kagawad 6',
                    accessLevel: 'incident_management'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440009',
                auditable_type: 'User',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440005', // Pedro Reyes (Kagawad 2)
                event: 'INCIDENT_REPORTED',
                old_values: null,
                new_value: JSON.stringify({ 
                    incidentType: 'Community Disturbance',
                    status: 'filed'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'Incident',
                ip_address: '192.168.1.107',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'SYSTEM_MAINTENANCE',
                old_values: null,
                new_value: JSON.stringify({ 
                    maintenanceType: 'Health Check',
                    description: 'Routine system check and log rotation',
                    status: 'completed'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'System',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440010', // Linda Ramos (Kagawad 7)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440010',
                auditable_type: 'User',
                ip_address: '192.168.1.108',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'PERMISSION_UPDATED',
                old_values: JSON.stringify({ modules: ['basic', 'activity'] }),
                new_value: JSON.stringify({ 
                    modules: ['basic', 'activity', 'youth_events'],
                    targetUser: 'Miguel Torres',
                    position: 'SK Chairperson'
                }),
                auditable_id: '550e8400-e29b-41d4-a716-446655440011',
                auditable_type: 'Permission',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440011', // Miguel Torres (SK Chairperson)
                event: 'LOGIN',
                old_values: null,
                new_value: null,
                auditable_id: '550e8400-e29b-41d4-a716-446655440011',
                auditable_type: 'User',
                ip_address: '192.168.1.109',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 47 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 47 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: generateUUID(),
                user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
                event: 'SYSTEM_MAINTENANCE',
                old_values: null,
                new_value: JSON.stringify({ 
                    maintenanceType: 'System Initialization',
                    description: 'All modules operational',
                    status: 'completed'
                }),
                auditable_id: generateUUID(),
                auditable_type: 'System',
                ip_address: '112.209.182.241',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        setAuditLogs(sampleAuditLogs);
    }, []);

    // Filter officials based on search term
    const filteredOfficials = officials.filter(official =>
        official.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        official.contactNumber.includes(searchTerm) ||
        official.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredOfficials.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOfficials = filteredOfficials.slice(startIndex, endIndex);

    // Handle view official
    const handleView = (official: BarangayOfficial) => {
        setSelectedOfficial(official);
        setShowViewModal(true);
    };

    // Handle edit official
    const handleEdit = (official: BarangayOfficial) => {
        setSelectedOfficial(official);
        setShowEditModal(true);
    };

    // Helper to add audit log (System Admin only)
    const addAuditLog = (event: string, targetOfficial?: BarangayOfficial, oldValues?: any, newValues?: any, auditableType?: string) => {
        const timestamp = new Date().toISOString();
        const newLog: AuditLog = {
            id: generateUUID(),
            user_id: '550e8400-e29b-41d4-a716-446655440012', // Luc Elric Trevecedo (System Admin)
            event: event,
            old_values: oldValues ? JSON.stringify(oldValues) : null,
            new_value: newValues ? JSON.stringify(newValues) : null,
            auditable_id: targetOfficial?.uuid || generateUUID(),
            auditable_type: auditableType || 'User',
            ip_address: '112.209.182.241',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            created_at: timestamp,
            updated_at: timestamp
        };
        setAuditLogs(prev => [newLog, ...prev]);
    };

    // Handle remove official (revoke access) - System Admin only
    const handleRemove = (official: BarangayOfficial) => {
        if (window.confirm(`Are you sure you want to revoke access for ${official.fullName}?`)) {
            setOfficials(officials.map(o => 
                o.id === official.id ? { ...o, status: 'INACTIVE' } : o
            ));
            addAuditLog(
                'ACCESS_REVOKED', 
                official,
                { status: 'active', accessLevel: 'full' },
                { status: 'inactive', accessLevel: 'none', reason: 'Access revoked' }
            );
            alert(`Access revoked for ${official.fullName}`);
        }
    };

    // Handle restore access - System Admin only
    const handleRestoreAccess = (official: BarangayOfficial) => {
        if (window.confirm(`Are you sure you want to restore access for ${official.fullName}?`)) {
            setOfficials(officials.map(o => 
                o.id === official.id ? { ...o, status: 'ACTIVE' } : o
            ));
            addAuditLog(
                'ACCESS_RESTORED', 
                official,
                { status: 'inactive', accessLevel: 'none' },
                { status: 'active', accessLevel: 'restored' }
            );
            alert(`Access restored for ${official.fullName}`);
        }
    };

    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

    // Helper to get user name from user_id
    const getUserName = (user_id: string | null): string => {
        if (!user_id) return 'System';
        const official = officials.find(o => o.uuid === user_id);
        return official?.fullName || 'Unknown User';
    };

    // Helper to get user position from user_id
    const getUserPosition = (user_id: string | null): string => {
        if (!user_id) return 'System';
        const official = officials.find(o => o.uuid === user_id);
        return official?.position || 'Unknown';
    };

    // Helper to get module name from auditable_type
    const getModuleName = (auditable_type: string): string => {
        const moduleMap: Record<string, string> = {
            'User': 'User Management',
            'Document': 'Document Management',
            'Transaction': 'Transaction Management',
            'Announcement': 'Announcements',
            'Resident': 'Resident Management',
            'Permission': 'Access Control',
            'System': 'System',
            'Incident': 'Incident Reports'
        };
        return moduleMap[auditable_type] || auditable_type;
    };

    // Helper to format description from audit log
    const formatDescription = (log: AuditLog): string => {
        const userName = getUserName(log.user_id);
        const eventName = log.event.replace(/_/g, ' ').toLowerCase();
        
        // Try to parse new_value for additional details
        let details = '';
        if (log.new_value) {
            try {
                const newData = JSON.parse(log.new_value);
                if (newData.targetUser) {
                    details = ` for ${newData.targetUser}`;
                } else if (newData.fullName) {
                    details = ` - ${newData.fullName}`;
                } else if (newData.documentType) {
                    details = ` - ${newData.documentType}`;
                }
            } catch (e) {
                // Ignore parse errors
            }
        }
        
        return `${userName} ${eventName}${details}`;
    };

    // Filter audit logs based on search term
    const filteredAuditLogs = auditLogs.filter(log => {
        const searchLower = auditSearchTerm.toLowerCase();
        const userName = getUserName(log.user_id).toLowerCase();
        const userPosition = getUserPosition(log.user_id).toLowerCase();
        const event = log.event.toLowerCase();
        const module = getModuleName(log.auditable_type).toLowerCase();
        const description = formatDescription(log).toLowerCase();
        const ipAddress = (log.ip_address || '').toLowerCase();
        
        return userName.includes(searchLower) ||
               userPosition.includes(searchLower) ||
               event.includes(searchLower) ||
               module.includes(searchLower) ||
               description.includes(searchLower) ||
               ipAddress.includes(searchLower) ||
               log.id.toLowerCase().includes(searchLower);
    });

    // Audit logs pagination
    const auditItemsPerPage = 10;
    const auditTotalPages = Math.ceil(filteredAuditLogs.length / auditItemsPerPage);
    const auditStartIndex = (auditCurrentPage - 1) * auditItemsPerPage;
    const auditEndIndex = auditStartIndex + auditItemsPerPage;
    const currentAuditLogs = filteredAuditLogs.slice(auditStartIndex, auditEndIndex);

    // Audit logs pagination handlers
    const goToAuditFirstPage = () => setAuditCurrentPage(1);
    const goToAuditLastPage = () => setAuditCurrentPage(auditTotalPages);
    const goToAuditPreviousPage = () => setAuditCurrentPage(prev => Math.max(1, prev - 1));
    const goToAuditNextPage = () => setAuditCurrentPage(prev => Math.min(auditTotalPages, prev + 1));

    // Format timestamp for display
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                        Barangay Access Management
                    </h1>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem',
                        marginBottom: 0
                    }}>
                        Manage barangay officials and their access permissions
                    </p>
                </header>

                {/* Main Content */}
                <main style={{ padding: '2rem' }}>
                    {/* Tab Navigation */}
                    <div style={{ 
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        <button
                            onClick={() => setShowAuditLogs(false)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: !showAuditLogs ? '#3b82f6' : 'white',
                                color: !showAuditLogs ? 'white' : '#374151',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            <FaUserShield /> Access Management
                        </button>
                        <button
                            onClick={() => setShowAuditLogs(true)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: showAuditLogs ? '#3b82f6' : 'white',
                                color: showAuditLogs ? 'white' : '#374151',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            <FaHistory /> Audit Logs
                        </button>
                    </div>

                    {!showAuditLogs ? (
                        <>
                            {/* Search Bar */}
                            <div style={{ 
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: '0.5rem',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ position: 'relative', maxWidth: '400px' }}>
                                    <FaSearch style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af',
                                        fontSize: '1rem'
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Search officials..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.75rem',
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

                    {/* Officials Table */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#dbeafe' }}>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Full Name
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Position
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Contact Number
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Email Address
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Status
                                        </th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#1e40af',
                                            borderBottom: '2px solid #93c5fd'
                                        }}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOfficials.length > 0 ? (
                                        currentOfficials.map((official, index) => (
                                            <tr 
                                                key={official.id}
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb'}
                                            >
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    {official.fullName}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: '#6366f1',
                                                        color: 'white',
                                                        borderRadius: '0.375rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {official.position}
                                                    </span>
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    {official.contactNumber}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1f2937',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    {official.emailAddress}
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: official.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                                                        color: official.status === 'ACTIVE' ? '#166534' : '#991b1b',
                                                        borderRadius: '0.375rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        {official.status}
                                                    </span>
                                                </td>
                                                <td style={{
                                                    padding: '1rem',
                                                    fontSize: '0.875rem',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => handleView(official)}
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                backgroundColor: '#3b82f6',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.25rem',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                                        >
                                                            <FaEye /> View
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(official)}
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                backgroundColor: '#f59e0b',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.25rem',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                                                        >
                                                            <FaEdit /> Edit
                                                        </button>
                                                        {official.status === 'ACTIVE' ? (
                                                            <button
                                                                onClick={() => handleRemove(official)}
                                                                style={{
                                                                    padding: '0.5rem 1rem',
                                                                    backgroundColor: '#ef4444',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '0.375rem',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '500',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.25rem',
                                                                    transition: 'background-color 0.2s'
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                                                            >
                                                                <FaTrash /> Remove
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleRestoreAccess(official)}
                                                                style={{
                                                                    padding: '0.5rem 1rem',
                                                                    backgroundColor: '#10b981',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '0.375rem',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '500',
                                                                    cursor: 'pointer',
                                                                    transition: 'background-color 0.2s'
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                                                            >
                                                                Restore
                                                            </button>
                                                        )}
                                                    </div>
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
                                                No officials found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {filteredOfficials.length > 0 && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1.5rem',
                                borderTop: '1px solid #e5e7eb'
                            }}>
                                <button
                                    onClick={goToFirstPage}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
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
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
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
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
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
                                        padding: '0.5rem 1rem',
                                        backgroundColor: currentPage === totalPages ? '#f3f4f6' : 'white',
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
                        )}
                    </div>
                        </>
                    ) : (
                        <>
                            {/* Audit Logs Search Bar */}
                            <div style={{ 
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: '0.5rem',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ position: 'relative', maxWidth: '400px' }}>
                                    <FaSearch style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af',
                                        fontSize: '1rem'
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Search audit logs..."
                                        value={auditSearchTerm}
                                        onChange={(e) => {
                                            setAuditSearchTerm(e.target.value);
                                            setAuditCurrentPage(1);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.75rem',
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

                            {/* Audit Logs Table */}
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '0.5rem',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                            }}>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#dbeafe' }}>
                                                <th style={{
                                                    padding: '1rem',
                                                    textAlign: 'left',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#1e40af',
                                                    borderBottom: '2px solid #93c5fd'
                                                }}>
                                                    ID
                                                </th>
                                                <th style={{
                                                    padding: '1rem',
                                                    textAlign: 'left',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#1e40af',
                                                    borderBottom: '2px solid #93c5fd'
                                                }}>
                                                    Date & Time
                                                </th>
                                                <th style={{
                                                    padding: '1rem',
                                                    textAlign: 'left',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#1e40af',
                                                    borderBottom: '2px solid #93c5fd'
                                                }}>
                                                    Admin
                                                </th>
                                                <th style={{
                                                    padding: '1rem',
                                                    textAlign: 'left',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#1e40af',
                                                    borderBottom: '2px solid #93c5fd'
                                                }}>
                                                    Module
                                                </th>
                                                <th style={{
                                                    padding: '1rem',
                                                    textAlign: 'left',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#1e40af',
                                                    borderBottom: '2px solid #93c5fd'
                                                }}>
                                                    Description
                                                </th>
                                                <th style={{
                                                    padding: '1rem',
                                                    textAlign: 'left',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#1e40af',
                                                    borderBottom: '2px solid #93c5fd'
                                                }}>
                                                    IP Address
                                                </th>
                                                <th style={{
                                                    padding: '1rem',
                                                    textAlign: 'left',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: '#1e40af',
                                                    borderBottom: '2px solid #93c5fd'
                                                }}>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentAuditLogs.length > 0 ? (
                                                currentAuditLogs.map((log, index) => {
                                                    const userName = getUserName(log.user_id);
                                                    const userPosition = getUserPosition(log.user_id);
                                                    const moduleName = getModuleName(log.auditable_type);
                                                    const description = formatDescription(log);
                                                    
                                                    return (
                                                        <tr 
                                                            key={log.id}
                                                            style={{
                                                                backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb'}
                                                        >
                                                            <td style={{
                                                                padding: '1rem',
                                                                fontSize: '0.75rem',
                                                                color: '#6b7280',
                                                                borderBottom: '1px solid #e5e7eb',
                                                                fontFamily: 'monospace',
                                                                maxWidth: '200px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }} title={log.id}>
                                                                {log.id.substring(0, 8)}...
                                                            </td>
                                                            <td style={{
                                                                padding: '1rem',
                                                                fontSize: '0.875rem',
                                                                color: '#1f2937',
                                                                borderBottom: '1px solid #e5e7eb',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {formatTimestamp(log.created_at)}
                                                            </td>
                                                            <td style={{
                                                                padding: '1rem',
                                                                fontSize: '0.875rem',
                                                                color: '#1f2937',
                                                                borderBottom: '1px solid #e5e7eb'
                                                            }}>
                                                                <div>{userName}</div>
                                                                <div style={{
                                                                    fontSize: '0.75rem',
                                                                    color: '#6b7280',
                                                                    marginTop: '0.25rem'
                                                                }}>
                                                                    {userPosition}
                                                                </div>
                                                            </td>
                                                            <td style={{
                                                                padding: '1rem',
                                                                fontSize: '0.875rem',
                                                                color: '#1f2937',
                                                                borderBottom: '1px solid #e5e7eb'
                                                            }}>
                                                                {moduleName}
                                                            </td>
                                                            <td style={{
                                                                padding: '1rem',
                                                                fontSize: '0.875rem',
                                                                color: '#6b7280',
                                                                borderBottom: '1px solid #e5e7eb'
                                                            }}>
                                                                {description}
                                                            </td>
                                                            <td style={{
                                                                padding: '1rem',
                                                                fontSize: '0.875rem',
                                                                color: '#6b7280',
                                                                borderBottom: '1px solid #e5e7eb',
                                                                fontFamily: 'monospace'
                                                            }}>
                                                                {log.ip_address || '-'}
                                                            </td>
                                                            <td style={{
                                                                padding: '1rem',
                                                                fontSize: '0.875rem',
                                                                borderBottom: '1px solid #e5e7eb',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <button
                                                                    onClick={() => alert(`Viewing details for audit log: ${log.id}\n\nEvent: ${log.event}\nUser: ${userName}\nIP: ${log.ip_address}\nTimestamp: ${log.created_at}`)}
                                                                    style={{
                                                                        padding: '0.5rem 1rem',
                                                                        backgroundColor: '#3b82f6',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '0.375rem',
                                                                        fontSize: '0.75rem',
                                                                        fontWeight: '500',
                                                                        cursor: 'pointer',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.5rem'
                                                                    }}
                                                                >
                                                                    <FaEye /> View
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td 
                                                        colSpan={7} 
                                                        style={{
                                                            padding: '3rem',
                                                            textAlign: 'center',
                                                            color: '#6b7280',
                                                            fontSize: '0.875rem'
                                                        }}
                                                    >
                                                        No audit logs found matching your search.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Audit Logs Pagination */}
                                {filteredAuditLogs.length > 0 && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '1.5rem',
                                        borderTop: '1px solid #e5e7eb'
                                    }}>
                                        <button
                                            onClick={goToAuditFirstPage}
                                            disabled={auditCurrentPage === 1}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: auditCurrentPage === 1 ? '#f3f4f6' : 'white',
                                                color: auditCurrentPage === 1 ? '#9ca3af' : '#374151',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                cursor: auditCurrentPage === 1 ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            First
                                        </button>
                                        <button
                                            onClick={goToAuditPreviousPage}
                                            disabled={auditCurrentPage === 1}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: auditCurrentPage === 1 ? '#f3f4f6' : 'white',
                                                color: auditCurrentPage === 1 ? '#9ca3af' : '#374151',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                cursor: auditCurrentPage === 1 ? 'not-allowed' : 'pointer',
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
                                            {auditCurrentPage}
                                        </span>
                                        <button
                                            onClick={goToAuditNextPage}
                                            disabled={auditCurrentPage === auditTotalPages}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: auditCurrentPage === auditTotalPages ? '#f3f4f6' : 'white',
                                                color: auditCurrentPage === auditTotalPages ? '#9ca3af' : '#374151',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                cursor: auditCurrentPage === auditTotalPages ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            Next →
                                        </button>
                                        <button
                                            onClick={goToAuditLastPage}
                                            disabled={auditCurrentPage === auditTotalPages}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: auditCurrentPage === auditTotalPages ? '#f3f4f6' : 'white',
                                                color: auditCurrentPage === auditTotalPages ? '#9ca3af' : '#374151',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                cursor: auditCurrentPage === auditTotalPages ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            Last
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>

            {/* View Modal */}
            {showViewModal && selectedOfficial && (
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
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginBottom: '1.5rem'
                        }}>
                            Official Details
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Full Name
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.fullName}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Position
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.position}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Contact Number
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.contactNumber}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Email Address
                                </label>
                                <p style={{ fontSize: '0.875rem', color: '#1f2937', marginTop: '0.25rem' }}>
                                    {selectedOfficial.emailAddress}
                                </p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                    Status
                                </label>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        backgroundColor: selectedOfficial.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2',
                                        color: selectedOfficial.status === 'ACTIVE' ? '#166534' : '#991b1b',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {selectedOfficial.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowViewModal(false)}
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

            {/* Edit Modal */}
            {showEditModal && selectedOfficial && (
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
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginBottom: '1.5rem'
                        }}>
                            Edit Official
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={selectedOfficial.fullName}
                                    onChange={(e) => setSelectedOfficial({
                                        ...selectedOfficial,
                                        fullName: e.target.value
                                    })}
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
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    value={selectedOfficial.contactNumber}
                                    onChange={(e) => setSelectedOfficial({
                                        ...selectedOfficial,
                                        contactNumber: e.target.value
                                    })}
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
                            <div>
                                <label style={{ 
                                    display: 'block',
                                    fontSize: '0.875rem', 
                                    color: '#374151', 
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={selectedOfficial.emailAddress}
                                    onChange={(e) => setSelectedOfficial({
                                        ...selectedOfficial,
                                        emailAddress: e.target.value
                                    })}
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
                                onClick={() => {
                                    const originalOfficial = officials.find(o => o.id === selectedOfficial.id);
                                    setOfficials(officials.map(o => 
                                        o.id === selectedOfficial.id ? selectedOfficial : o
                                    ));
                                    addAuditLog(
                                        'PROFILE_UPDATED', 
                                        selectedOfficial,
                                        { contactNumber: originalOfficial?.contactNumber, emailAddress: originalOfficial?.emailAddress },
                                        { contactNumber: selectedOfficial.contactNumber, emailAddress: selectedOfficial.emailAddress }
                                    );
                                    setShowEditModal(false);
                                    alert('Official information updated successfully!');
                                }}
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
                                onClick={() => setShowEditModal(false)}
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

export default BarangayAccessManagement;


