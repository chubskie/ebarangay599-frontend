import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

import { 
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaFacebook,
    FaClock
} from 'react-icons/fa';

const Contact: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            {/* Hero Section */}
            <section className="py-24 bg-barangay-blue-600">
                <div className="max-w-7xl mx-auto px-4" style={{ textAlign: 'center' }}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ textAlign: 'center' }}>
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
                        Makipag-ugnayan sa amin para sa anumang mga katanungan, serbisyo, o pababatid. Nandito kami upang maglingkod sa inyo.
                    </p>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                                Get in Touch
                            </h2>
                            <div className="w-24 h-1 mx-auto mb-12 bg-barangay-blue-500"></div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Office Hours */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-sky-50">
                                        <FaClock className="w-6 h-6 text-barangay-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Office Hours
                                        </h3>
                                        <div className="text-gray-600 space-y-1">
                                            <p><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</p>
                                            <p><strong>Saturday:</strong> 8:00 AM - 12:00 PM</p>
                                            <p><strong>Sunday:</strong> Closed</p>
                                            <p><strong>Lunch Break:</strong> 12:00 PM - 1:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-sky-50">
                                        <FaEnvelope className="w-6 h-6 text-barangay-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Email Address
                                        </h3>
                                        <p className="text-gray-600">barangay599@gmail.com</p>
                                    </div>
                                </div>

                                {/* Phone Numbers */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-sky-50">
                                        <FaPhone className="w-6 h-6 text-barangay-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Phone Numbers
                                        </h3>
                                        <div className="text-gray-600 space-y-1">
                                            <p><strong>Hotline:</strong> 0998 3333 463</p>
                                            <p><strong>Direct line:</strong> 89527011</p>
                                            <p><strong>Trunk line:</strong> 87787783</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-sky-50">
                                        <FaMapMarkerAlt className="w-6 h-6 text-barangay-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Office Address
                                        </h3>
                                        <p className="text-gray-600">Barangay 599, Zone 59, District VI, Sta. Mesa, Manila</p>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="flex items-start lg:col-span-2">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-sky-50">
                                        <FaFacebook className="w-6 h-6 text-barangay-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Follow Us
                                        </h3>
                                        <a 
                                            href="https://www.facebook.com/profile.php?id=61553960765449" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            Barangay 599 Facebook Page
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div style={{ textAlign: 'center' }} className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900" style={{ textAlign: 'center' }}>
                            Visit Our Office
                        </h2>
                        <div className="w-24 h-1 bg-barangay-blue-500" style={{ margin: '0 auto 1.5rem auto' }}></div>
                        <p className="text-gray-600" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
                            Bisitahin ang aming tanggapan para sa personal na pakikipag-ugnayan at mas mabilis na serbisyo.
                        </p>
                    </div>
                    
                    {/* Placeholder for map */}
                    <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                            <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600">Map integration coming soon</p>
                            <p className="text-sm text-gray-400 mt-2">
                                Barangay 599, Zone 59, District VI, Sta. Mesa, Manila
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 bg-barangay-blue-600">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Logo and Description */}
                        <div className="md:col-span-1">
                            <div className="flex items-center mb-4">
                                <img 
                                    src="/logo/barangay-599-logo.png" 
                                    alt="Barangay 599 Logo" 
                                    className="h-16 w-16 mr-3"
                                />
                                <span className="text-xl font-semibold text-white">BARANGAY 599</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Serving the community of Barangay 599 with dedication and commitment to excellence in public service.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="md:col-span-1">
                            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/about" className="text-gray-300 hover:text-white text-sm transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/profile.php?id=61553960765449" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm transition-colors">
                                        Barangay Facebook
                                    </a>
                                </li>
                                <li>
                                    <Link to="/announcements" className="text-gray-300 hover:text-white text-sm transition-colors">
                                        Announcements
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/events" className="text-gray-300 hover:text-white text-sm transition-colors">
                                        Events
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="md:col-span-2">
                            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaEnvelope className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">barangay599@gmail.com</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <FaPhone className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">Hotline - 0998 3333 463</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <FaPhone className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">Direct line - 89527011</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <FaPhone className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">Trunk line - 87787783</span>
                                </div>
                                
                                <div className="flex items-start">
                                    <FaMapMarkerAlt className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300 text-sm">Barangay 599, Zone 59, District VI, Sta. Mesa, Manila</span>
                                </div>
                            </div>
                            
                            {/* Social Media Links */}
                            <div className="flex space-x-4 mt-6">
                                <a href="https://www.facebook.com/profile.php?id=61553960765449" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                                    <FaFacebook className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Copyright */}
                    <div className="border-t border-gray-600 mt-12 pt-8">
                        <p className="text-gray-400 text-sm text-center">
                            Copyright © 2025 Barangay 599. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;
