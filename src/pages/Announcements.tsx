import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaBullhorn,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBell,
    FaFacebook
} from 'react-icons/fa';

const Announcements: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="py-24 bg-barangay-blue-600">
                <div className="max-w-7xl mx-auto px-4" style={{ textAlign: 'center' }}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ textAlign: 'center' }}>
                        Announcements
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
                        Manatiling updated sa mga pinakabagong balita at anunsiyo mula sa Barangay 599.
                    </p>
                </div>
            </section>

            {/* Announcements Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col gap-8">
                        {/* Featured Announcement */}
                        <div className="relative rounded-lg overflow-hidden shadow-xl bg-gradient-to-r from-black to-gray-800">
                            {/* Background Image */}
                            <img 
                                src="/images/sample-announcement1.jpg" 
                                alt="Announcement Background"
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />
                            
                            {/* Background Pattern Overlay */}
                            <div className="absolute inset-0 opacity-80 z-5 bg-gradient-to-r from-black to-gray-800"></div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 opacity-10 z-10">
                                <div className="absolute top-4 right-4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/15 rounded-full blur-xl"></div>
                            </div>

                            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center">
                                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                        <FaBullhorn className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white mb-4">
                                        <span className="w-2 h-2 rounded-full mr-2 bg-red-700 animate-pulse"></span>
                                        FEATURED ANNOUNCEMENT
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Ayuda para sa mga matatanda
                                    </h2>
                                    <p className="text-gray-300 mb-2">November 21, 2025 12:44pm</p>
                                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                                        Pumunta lamang sa barangay hall para sa pamamahagi ng ayuda sa mga nakatatanda. Mangyaring dalhin ang inyong valid ID at sumunod sa health protocols.
                                    </p>
                                    <button className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                                        Read More
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Bottom Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full z-20"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full z-20"></div>
                        </div>

                        {/* Recent Announcements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div 
                                    key={item}
                                    className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center mb-3">
                                            <FaBell className="w-4 h-4 mr-2 text-barangay-blue-500" />
                                            <span className="text-xs font-medium text-gray-500">ANNOUNCEMENT</span>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-3 text-barangay-blue-600">
                                            Sample Announcement {item}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            Brief description of the announcement content. This provides a preview of what the announcement is about.
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">Nov {20 + item}, 2025</span>
                                            <button className="text-sm font-medium text-barangay-blue-500 hover:text-barangay-blue-600 underline">
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-8">
                            <button className="inline-flex items-center px-8 py-3 text-white font-medium rounded-lg bg-barangay-blue-600 hover:bg-barangay-blue-700 transition-colors">
                                Load More Announcements
                            </button>
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
                                    <span className="text-gray-300 text-sm">Hotline - 0932 130 5431</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <FaPhone className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">Direct line - 0932 130 5431</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <FaPhone className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">Trunk line - 0932 130 5431</span>
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

export default Announcements;