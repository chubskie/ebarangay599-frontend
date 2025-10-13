import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

import { 
    FaEye,
    FaEyeSlash,
    FaSpinner
} from 'react-icons/fa';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        otp_code: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendOtp = async () => {
        if (!formData.username.trim() || !formData.password.trim()) {
            alert('Please enter both username and password first.');
            return;
        }

        setSendingOtp(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setShowOtpField(true);
        setOtpSent(true);
        setSendingOtp(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.otp_code.trim()) {
            alert('Please enter the OTP code.');
            return;
        }

        if (formData.otp_code !== '123456') {
            alert('Invalid OTP code. Please use: 123456');
            return;
        }

        setProcessing(true);
        
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Set login status
        localStorage.setItem('isLoggedIn', 'true');
        
        // Navigate to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            {/* Header Section */}
            <div style={{ backgroundColor: '#05215e', textAlign: 'center', padding: '3rem 0' }}>
                <Link 
                    to="/"
                    className="inline-block cursor-pointer hover:opacity-90 transition-opacity"
                >
                    <div className="flex justify-center items-center mb-6">
                        <img
                            src="/logo/barangay-599-logo.png"
                            alt="Barangay 599 Logo"
                            className="h-20 w-20 mr-4"
                        />
                        <h1 className="text-white text-4xl font-bold">BARANGAY 599</h1>
                    </div>
                </Link>
                <h2 className="text-white text-2xl font-semibold mb-2">Welcome Back</h2>
                <p className="text-gray-300 text-lg">Sign in to access your resident account</p>
            </div>

            {/* OTP Sent Message */}
            {otpSent && (
                <div style={{ maxWidth: '28rem', margin: '0 auto', padding: '0 1rem', paddingTop: '2rem' }}>
                    <div style={{ 
                        marginBottom: '1rem', 
                        padding: '1rem', 
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#2563eb',
                        backgroundColor: '#eff6ff',
                        borderRadius: '0.5rem',
                        border: '1px solid #dbeafe'
                    }}>
                        OTP code has been sent to your registered contact number. Use code: <strong>123456</strong>
                    </div>
                </div>
            )}

            {/* Form Section */}
            <div style={{ maxWidth: '28rem', margin: '0 auto', padding: '2rem 1rem' }}>
                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb',
                    padding: '2rem'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {/* Username Field */}
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="username" style={{ color: '#1f2937', fontWeight: '500' }}>Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="username"
                                    placeholder="Enter your username"
                                    disabled={showOtpField}
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.25rem',
                                        color: 'black',
                                        backgroundColor: showOtpField ? '#f9fafb' : 'white',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        cursor: showOtpField ? 'not-allowed' : 'text'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            {/* Password Field with Eye Toggle */}
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <label htmlFor="password" style={{ color: '#1f2937', fontWeight: '500' }}>Password</label>
                                    <Link
                                        to="/forgot-password"
                                        style={{ 
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: '#05215e',
                                            textDecoration: 'none'
                                        }}
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        disabled={showOtpField}
                                        style={{
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            padding: '0.5rem 0.75rem',
                                            paddingRight: '2.5rem',
                                            fontSize: '0.875rem',
                                            lineHeight: '1.25rem',
                                            color: 'black',
                                            width: '100%',
                                            backgroundColor: showOtpField ? '#f9fafb' : 'white',
                                            boxSizing: 'border-box',
                                            cursor: showOtpField ? 'not-allowed' : 'text'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        tabIndex={3}
                                        disabled={showOtpField}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '0.75rem',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#9ca3af',
                                            cursor: showOtpField ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash style={{ width: '1rem', height: '1rem' }} />
                                        ) : (
                                            <FaEye style={{ width: '1rem', height: '1rem' }} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Send OTP Button */}
                            {!showOtpField && (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    tabIndex={4}
                                    disabled={sendingOtp}
                                    style={{
                                        marginTop: '1rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        backgroundColor: '#05215e',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: sendingOtp ? 'not-allowed' : 'pointer',
                                        opacity: sendingOtp ? 0.7 : 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!sendingOtp) (e.target as HTMLButtonElement).style.opacity = '0.9';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!sendingOtp) (e.target as HTMLButtonElement).style.opacity = '1';
                                    }}
                                >
                                    {sendingOtp && (
                                        <FaSpinner style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
                                    )}
                                    {sendingOtp ? 'Sending OTP...' : 'Send OTP Code'}
                                </button>
                            )}

                            {/* OTP Field */}
                            {showOtpField && (
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label htmlFor="otp_code" style={{ color: '#1f2937', fontWeight: '500' }}>OTP Code</label>
                                    <input
                                        id="otp_code"
                                        type="text"
                                        name="otp_code"
                                        value={formData.otp_code}
                                        onChange={handleInputChange}
                                        required
                                        tabIndex={4}
                                        placeholder="Enter 6-digit OTP code (123456)"
                                        maxLength={6}
                                        style={{
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            padding: '0.5rem 0.75rem',
                                            fontSize: '1.125rem',
                                            lineHeight: '1.75rem',
                                            color: 'black',
                                            textAlign: 'center',
                                            letterSpacing: '0.1em',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                                        <span style={{ color: '#6b7280' }}>Use code: 123456</span>
                                        <button
                                            type="button"
                                            onClick={handleSendOtp}
                                            disabled={sendingOtp}
                                            style={{
                                                color: '#2563eb',
                                                fontWeight: '500',
                                                background: 'none',
                                                border: 'none',
                                                cursor: sendingOtp ? 'not-allowed' : 'pointer',
                                                textDecoration: 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!sendingOtp) (e.target as HTMLButtonElement).style.color = '#1d4ed8';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!sendingOtp) (e.target as HTMLButtonElement).style.color = '#2563eb';
                                            }}
                                        >
                                            Resend code
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Login Button */}
                            {showOtpField && (
                                <button
                                    type="submit"
                                    tabIndex={5}
                                    disabled={processing}
                                    style={{
                                        marginTop: '1rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        backgroundColor: '#05215e',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: processing ? 'not-allowed' : 'pointer',
                                        opacity: processing ? 0.7 : 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!processing) (e.target as HTMLButtonElement).style.opacity = '0.9';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!processing) (e.target as HTMLButtonElement).style.opacity = '1';
                                    }}
                                >
                                    {processing && (
                                        <FaSpinner style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
                                    )}
                                    Log In
                                </button>
                            )}
                        </div>

                        {/* Register Link */}
                        <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '1.5rem' }}>
                            Don't have an account?{' '}
                            <Link 
                                to="/register" 
                                tabIndex={6} 
                                style={{ 
                                    fontWeight: '500',
                                    color: '#05215e',
                                    textDecoration: 'none'
                                }}
                            >
                                Create account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer Section */}
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                <p>© 2025 Barangay 599. All rights reserved.</p>
            </div>

            <style>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;
