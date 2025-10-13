import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FaEye,
    FaEyeSlash,
    FaUpload,
    FaTimes,
    FaSpinner
} from 'react-icons/fa';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birth_date: '',
        age: '',
        sex: '',
        civil_status: '',
        address: '',
        contact_number: '',
        period_of_residency: '',
        resident_tags: '',
        username: '',
        password: '',
        password_confirmation: '',
        otp_code: ''
    });
    
    const [dragOver, setDragOver] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Capitalize first letter of each word
    const capitalizeWords = (str: string) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        let processedValue = value;
        
        // Apply capitalization for name fields
        if (name === 'first_name' || name === 'middle_name' || name === 'last_name') {
            processedValue = capitalizeWords(value.toLowerCase());
        }
        
        // Apply contact number restrictions (only numbers, max 11 digits)
        if (name === 'contact_number') {
            processedValue = value.replace(/\D/g, '');
            if (processedValue.length > 11) {
                processedValue = processedValue.slice(0, 11);
            }
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    // Format birth date typing
    const formatBirthDateTyping = (raw: string) => {
        const digits = raw.replace(/\D/g, '').slice(0, 8); // MMDDYYYY
        const mm = digits.slice(0, 2);
        const dd = digits.slice(2, 4);
        const yyyy = digits.slice(4, 8);

        if (digits.length <= 2) return mm;
        if (digits.length <= 4) return `${mm}/${dd}`;
        return `${mm}/${dd}/${yyyy}`;
    };

    const handleBirthDateTyping = (raw: string) => {
        const masked = formatBirthDateTyping(raw);
        setFormData(prev => ({ ...prev, birth_date: masked }));

        // Calculate age when complete
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(masked)) {
            calculateAge(masked);
        } else {
            setFormData(prev => ({ ...prev, age: "" }));
        }
    };

    const calculateAge = (dateStr: string) => {
        const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateStr);
        if (!match) return;

        const month = Number(match[1]);
        const day = Number(match[2]);
        const year = Number(match[3]);

        const now = new Date();
        const currentYear = now.getFullYear();

        if (year < 1800 || year > currentYear || month < 1 || month > 12) return;

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) return;

        const selectedDate = new Date(year, month - 1, day);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        if (selectedDate > today) return;

        let age = currentYear - year;
        const hasNotHadBirthdayThisYear =
            now.getMonth() < (month - 1) ||
            (now.getMonth() === (month - 1) && now.getDate() < day);

        if (hasNotHadBirthdayThisYear) age--;

        if (age >= 0) {
            setFormData(prev => ({ ...prev, age: String(age) }));
        }
    };

    // Generate username when first name or last name changes
    useEffect(() => {
        if (formData.first_name && formData.last_name) {
            const cleanFirstName = formData.first_name.replace(/\s+/g, '').toLowerCase();
            const cleanLastName = formData.last_name.replace(/\s+/g, '').toLowerCase();
            
            const firstInitial = cleanFirstName.charAt(0);
            const randomNumber = Math.floor(Math.random() * 900) + 100;
            
            const generatedUsername = `${firstInitial}${cleanLastName}${randomNumber}`;
            setFormData(prev => ({
                ...prev,
                username: generatedUsername
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                username: ''
            }));
        }
    }, [formData.first_name, formData.last_name]);

    // Handle file drop
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter(file => 
            ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) &&
            file.size <= 5 * 1024 * 1024
        );
        
        setUploadedFiles(prev => [...prev, ...validFiles]);
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => 
            ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) &&
            file.size <= 5 * 1024 * 1024
        );
        
        setUploadedFiles(prev => [...prev, ...validFiles]);
    };

    // Remove file
    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Format file size
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSendOtp = async () => {
        // Basic validation
        if (!formData.first_name || !formData.last_name || !formData.contact_number || !formData.password) {
            alert('Please fill in all required fields first.');
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            alert('Passwords do not match.');
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
                <h2 className="text-white text-2xl font-semibold mb-2">Resident Registration</h2>
                <p className="text-gray-300 text-lg">Enter your details below to create your resident account</p>
            </div>

            {/* OTP Sent Message */}
            {otpSent && (
                <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem', paddingTop: '2rem' }}>
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
                        OTP code has been sent to {formData.contact_number}. Use code: <strong>123456</strong>
                    </div>
                </div>
            )}

            {/* Form Section */}
            <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {/* Name Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="first_name" style={{ color: '#1f2937', fontWeight: '500' }}>First Name *</label>
                                <input
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    required
                                    autoFocus
                                    placeholder="First name"
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="middle_name" style={{ color: '#1f2937', fontWeight: '500' }}>Middle Name</label>
                                <input
                                    id="middle_name"
                                    type="text"
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleInputChange}
                                    placeholder="Middle name"
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="last_name" style={{ color: '#1f2937', fontWeight: '500' }}>Last Name *</label>
                                <input
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Last name"
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="suffix" style={{ color: '#1f2937', fontWeight: '500' }}>Suffix</label>
                                <select
                                    id="suffix"
                                    name="suffix"
                                    value={formData.suffix}
                                    onChange={handleInputChange}
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        backgroundColor: 'white',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                >
                                    <option value="">None</option>
                                    <option value="jr">Jr.</option>
                                    <option value="sr">Sr.</option>
                                    <option value="ii">II</option>
                                    <option value="iii">III</option>
                                    <option value="iv">IV</option>
                                    <option value="v">V</option>
                                </select>
                            </div>
                        </div>

                        {/* Birth Date and Age */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="birth_date" style={{ color: '#1f2937', fontWeight: '500' }}>Birth Date *</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        id="birth_date"
                                        type="text"
                                        name="birth_date"
                                        value={formData.birth_date}
                                        onChange={(e) => handleBirthDateTyping(e.target.value)}
                                        required
                                        placeholder="MM/DD/YYYY"
                                        maxLength={10}
                                        style={{
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            padding: '0.5rem 0.75rem',
                                            paddingRight: '2.5rem',
                                            fontSize: '0.875rem',
                                            color: 'black',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '0.75rem',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        color: 'black'
                                    }}>
                                        📅
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="age" style={{ color: '#1f2937', fontWeight: '500' }}>Age *</label>
                                <input
                                    id="age"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    readOnly
                                    placeholder="Auto-calculated"
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        backgroundColor: '#f9fafb',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Sex and Civil Status */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="sex" style={{ color: '#1f2937', fontWeight: '500' }}>Sex *</label>
                                <select
                                    id="sex"
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        backgroundColor: 'white',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                >
                                    <option value="">Select Sex</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="intersex">Intersex</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="civil_status" style={{ color: '#1f2937', fontWeight: '500' }}>Civil Status *</label>
                                <select
                                    id="civil_status"
                                    name="civil_status"
                                    value={formData.civil_status}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        backgroundColor: 'white',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                >
                                    <option value="">Select Civil Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="widowed">Widowed</option>
                                    <option value="separated">Separated</option>
                                    <option value="divorced">Divorced</option>
                                </select>
                            </div>
                        </div>

                        {/* Address */}
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label htmlFor="address" style={{ color: '#1f2937', fontWeight: '500' }}>Address *</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                placeholder="0000 Sample Street, Barangay 599, Sta. Mesa, Manila City, Metro Manila, 1016"
                                style={{
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    padding: '0.5rem 0.75rem',
                                    fontSize: '0.875rem',
                                    color: 'black',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    minHeight: '80px',
                                    resize: 'vertical'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        {/* Contact and Period of Residency */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="contact_number" style={{ color: '#1f2937', fontWeight: '500' }}>Contact Number *</label>
                                <input
                                    id="contact_number"
                                    type="tel"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="09XXXXXXXXX (11 digits)"
                                    maxLength={11}
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label htmlFor="period_of_residency" style={{ color: '#1f2937', fontWeight: '500' }}>Period of Residency *</label>
                                <input
                                    id="period_of_residency"
                                    type="text"
                                    name="period_of_residency"
                                    value={formData.period_of_residency}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., 5 years, 2 years and 6 months"
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>
                        </div>

                        {/* Resident Tags */}
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label htmlFor="resident_tags" style={{ color: '#1f2937', fontWeight: '500' }}>Resident Tags *</label>
                            <select
                                id="resident_tags"
                                name="resident_tags"
                                value={formData.resident_tags}
                                onChange={handleInputChange}
                                required
                                style={{
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    padding: '0.5rem 0.75rem',
                                    fontSize: '0.875rem',
                                    color: 'black',
                                    backgroundColor: 'white',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            >
                                <option value="">Select Resident Tag</option>
                                <option value="none">None</option>
                                <option value="senior">Senior</option>
                                <option value="pwd">PWD (Person with Disability)</option>
                                <option value="minor">Minor</option>
                                <option value="solo_parent">Solo Parent</option>
                                <option value="first_job_seeker">First Job Seeker</option>
                                <option value="unemployed">Unemployed</option>
                            </select>
                        </div>

                        {/* Supporting Documents */}
                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                                Supporting Documents (Optional)
                            </h3>
                            
                            {/* File Upload Area */}
                            <div
                                style={{
                                    border: dragOver ? '2px dashed #3b82f6' : '2px dashed #d1d5db',
                                    borderRadius: '0.5rem',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    backgroundColor: dragOver ? '#eff6ff' : 'transparent',
                                    transition: 'all 0.2s'
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                    <FaUpload style={{ width: '3rem', height: '3rem', color: '#9ca3af' }} />
                                </div>
                                <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                    Drag and drop files here, or{' '}
                                    <label style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}>
                                        browse
                                        <input
                                            type="file"
                                            multiple
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </p>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                    Supported formats: JPEG, PNG, PDF - Max 5MB each
                                </p>
                            </div>
                            
                            {/* Uploaded Files */}
                            {uploadedFiles.length > 0 && (
                                <div style={{ marginTop: '1rem', display: 'grid', gap: '0.5rem' }}>
                                    <h5 style={{ fontWeight: '500', color: '#1f2937' }}>Uploaded Files:</h5>
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            backgroundColor: '#f9fafb',
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem'
                                        }}>
                                            <div>
                                                <p style={{ fontWeight: '500', color: '#1f2937', fontSize: '0.875rem', margin: 0 }}>{file.name}</p>
                                                <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: 0 }}>{formatFileSize(file.size)}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                style={{
                                                    color: '#ef4444',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '0.25rem'
                                                }}
                                            >
                                                <FaTimes style={{ width: '1.25rem', height: '1.25rem' }} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Account Information */}
                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1f2937' }}>
                                Account Information
                            </h3>

                            {/* Username Field */}
                            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
                                <label htmlFor="username" style={{ color: '#1f2937', fontWeight: '500' }}>Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    readOnly
                                    placeholder="Auto-generated based on your name"
                                    style={{
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        color: 'black',
                                        backgroundColor: '#f9fafb',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                                    Your username will be automatically generated when you enter your first and last name
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label htmlFor="password" style={{ color: '#1f2937', fontWeight: '500' }}>Password *</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Password"
                                            style={{
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem 0.75rem',
                                                paddingRight: '2.5rem',
                                                fontSize: '0.875rem',
                                                color: 'black',
                                                width: '100%',
                                                boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '0.75rem',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                color: '#9ca3af',
                                                cursor: 'pointer'
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

                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label htmlFor="password_confirmation" style={{ color: '#1f2937', fontWeight: '500' }}>
                                        Confirm Password *
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            id="password_confirmation"
                                            type={showPasswordConfirmation ? 'text' : 'password'}
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Confirm password"
                                            style={{
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.375rem',
                                                padding: '0.5rem 0.75rem',
                                                paddingRight: '2.5rem',
                                                fontSize: '0.875rem',
                                                color: 'black',
                                                width: '100%',
                                                boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '0.75rem',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                color: '#9ca3af',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {showPasswordConfirmation ? (
                                                <FaEyeSlash style={{ width: '1rem', height: '1rem' }} />
                                            ) : (
                                                <FaEye style={{ width: '1rem', height: '1rem' }} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Send OTP Button */}
                        {!showOtpField && (
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={sendingOtp}
                                style={{
                                    marginTop: '2rem',
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
                                {sendingOtp ? 'Sending OTP...' : 'Send OTP to Complete Registration'}
                            </button>
                        )}

                        {/* OTP Field */}
                        {showOtpField && (
                            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1.5rem' }}>
                                <label htmlFor="otp_code" style={{ color: '#1f2937', fontWeight: '500' }}>OTP Code</label>
                                <input
                                    id="otp_code"
                                    type="text"
                                    name="otp_code"
                                    value={formData.otp_code}
                                    onChange={handleInputChange}
                                    required
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

                        {/* Register Button */}
                        {showOtpField && (
                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    marginTop: '2rem',
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
                                Register as a Resident
                            </button>
                        )}
                    </div>

                    {/* Login Link */}
                    <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '1.5rem' }}>
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            style={{ 
                                fontWeight: '500',
                                color: '#05215e',
                                textDecoration: 'none'
                            }}
                        >
                            Log in
                        </Link>
                    </div>
                </form>
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

export default Register;