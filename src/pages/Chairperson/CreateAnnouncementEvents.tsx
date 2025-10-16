import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChairwomanDashboardNav from '../../components/ChairwomanDashboardNav';
import { FaBullhorn, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const CreateAnnouncementEvents: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('create-announcement');
    const [postType, setPostType] = useState<'announcement' | 'event'>('announcement');
    
    // Form data
    const [formData, setFormData] = useState({
        title: '',
        subject: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Role protection
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn || userRole !== 'chairwoman') {
            navigate('/login');
            return;
        }
    }, [navigate]);

    // Handle form submission
    const handleSubmit = () => {
        if (!formData.title.trim() || !formData.subject.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        // Simulate posting
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccessModal(true);
            // Reset form
            setFormData({ title: '', subject: '' });
        }, 1500);
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
                        Create Announcements & Events
                    </h1>
                    <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem',
                        marginBottom: 0
                    }}>
                        Create and publish announcements or events for residents
                    </p>
                </header>

                {/* Main Content */}
                <main style={{ padding: '2rem' }}>
                    {/* Post Type Selection */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        padding: '1.5rem',
                        marginBottom: '1.5rem'
                    }}>
                        <h2 style={{ 
                            fontSize: '1.125rem', 
                            fontWeight: '600', 
                            color: '#1f2937',
                            marginTop: 0,
                            marginBottom: '1rem'
                        }}>
                            Select Post Type
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1rem'
                        }}>
                            {/* Announcement Card */}
                            <button
                                onClick={() => setPostType('announcement')}
                                style={{
                                    padding: '1.5rem',
                                    border: postType === 'announcement' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    backgroundColor: postType === 'announcement' ? '#eff6ff' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (postType !== 'announcement') {
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (postType !== 'announcement') {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                    }
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '0.75rem'
                                }}>
                                    <FaBullhorn style={{
                                        fontSize: '1.5rem',
                                        color: postType === 'announcement' ? '#3b82f6' : '#6b7280'
                                    }} />
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: postType === 'announcement' ? '#1f2937' : '#4b5563',
                                        margin: 0
                                    }}>
                                        Announcement
                                    </h3>
                                </div>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#6b7280',
                                    margin: 0,
                                    lineHeight: '1.5'
                                }}>
                                    Create important announcements for residents to stay informed about barangay updates and notices.
                                </p>
                            </button>

                            {/* Event Card */}
                            <button
                                onClick={() => setPostType('event')}
                                style={{
                                    padding: '1.5rem',
                                    border: postType === 'event' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    backgroundColor: postType === 'event' ? '#eff6ff' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (postType !== 'event') {
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (postType !== 'event') {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                    }
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '0.75rem'
                                }}>
                                    <FaCalendarAlt style={{
                                        fontSize: '1.5rem',
                                        color: postType === 'event' ? '#3b82f6' : '#6b7280'
                                    }} />
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: postType === 'event' ? '#1f2937' : '#4b5563',
                                        margin: 0
                                    }}>
                                        Event
                                    </h3>
                                </div>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#6b7280',
                                    margin: 0,
                                    lineHeight: '1.5'
                                }}>
                                    Schedule and announce upcoming events, activities, and gatherings for the barangay community.
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}>
                            {postType === 'announcement' ? (
                                <FaBullhorn style={{ fontSize: '1.25rem', color: '#3b82f6' }} />
                            ) : (
                                <FaCalendarAlt style={{ fontSize: '1.25rem', color: '#3b82f6' }} />
                            )}
                            <h2 style={{ 
                                fontSize: '1.125rem', 
                                fontWeight: '600', 
                                color: '#1f2937',
                                margin: 0
                            }}>
                                {postType === 'announcement' ? 'Create Announcement' : 'Create Event'}
                            </h2>
                        </div>

                        {/* Title */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Title *
                            </label>
                            <input
                                type="text"
                                placeholder={postType === 'announcement' ? 'e.g., Ayuda para sa mga matatanda' : 'e.g., General Cleaning'}
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 1rem',
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

                        {/* Subject/Description */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                {postType === 'announcement' ? 'Subject/Details' : 'Event Details'} *
                            </label>
                            <textarea
                                placeholder={postType === 'announcement' 
                                    ? 'Enter the announcement details...' 
                                    : 'Enter event description, date, time, and location...'
                                }
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                rows={6}
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 1rem',
                                    fontSize: '0.875rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                            <div style={{ 
                                fontSize: '0.75rem', 
                                color: '#6b7280',
                                marginTop: '0.25rem'
                            }}>
                                {formData.subject.length} characters
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid #e5e7eb'
                        }}>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#2563eb';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#3b82f6';
                                }}
                            >
                                {postType === 'announcement' ? <FaBullhorn /> : <FaCalendarAlt />}
                                {isSubmitting ? 'Publishing...' : `Publish ${postType === 'announcement' ? 'Announcement' : 'Event'}`}
                            </button>

                            <button
                                onClick={() => setFormData({ title: '', subject: '' })}
                                disabled={isSubmitting}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: 'white',
                                    color: '#6b7280',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = '#f9fafb';
                                        e.currentTarget.style.borderColor = '#9ca3af';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }
                                }}
                            >
                                Clear Form
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
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
                        maxWidth: '400px',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <FaCheckCircle style={{
                            fontSize: '3rem',
                            color: '#22c55e',
                            marginBottom: '1rem'
                        }} />
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginTop: 0,
                            marginBottom: '0.5rem'
                        }}>
                            {postType === 'announcement' ? 'Announcement' : 'Event'} Published Successfully!
                        </h3>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            marginBottom: '1.5rem'
                        }}>
                            Your {postType === 'announcement' ? 'announcement' : 'event'} has been published and is now visible to all residents.
                        </p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            style={{
                                padding: '0.75rem 1.5rem',
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
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAnnouncementEvents;
