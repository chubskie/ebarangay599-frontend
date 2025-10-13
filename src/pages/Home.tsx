import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

import { 
    FaBullhorn,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaChevronRight,
    FaFacebook
} from 'react-icons/fa';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Use Navigation Component */}
            <Navigation />
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-barangay-blue-600">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
                    style={{
                        backgroundImage: "url('/images/barangay-599-herosection-image.jpg')"
                    }}
                ></div>
                
                {/* Abstract Flowing Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Large flowing shape - top right */}
                    <div 
                        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl transform rotate-45 animate-pulse"
                        style={{ background: 'linear-gradient(to bottom right, rgba(0, 21, 68, 0.3), rgba(0, 40, 102, 0.2))' }}
                    ></div>
                    
                    {/* Medium flowing shape - center */}
                    <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 w-80 h-80 rounded-full blur-2xl"
                        style={{ 
                            background: 'linear-gradient(to bottom right, rgba(0, 40, 102, 0.25), rgba(0, 61, 136, 0.15))',
                            animationDelay: '1s' 
                        }}
                    ></div>
                    
                    {/* Small flowing shape - bottom left */}
                    <div 
                        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl transform -rotate-45"
                        style={{ 
                            background: 'linear-gradient(to bottom right, rgba(0, 61, 136, 0.2), rgba(185, 207, 220, 0.1))',
                            animationDelay: '2s' 
                        }}
                    ></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 h-screen flex items-center">
                    <div className="max-w-4xl">
                        <h1 
                            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none"
                            style={{ marginBottom: '1rem' }}
                        >
                            Barangay 599
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed text-white/90">
                            Pinangungunahan nina Kapitana Edith Alviso at ng Konseho, ang Barangay 599 ay patuloy na umuunlad sa pamamagitan ng paglilingkod at malasakit.
                        </p>
                    </div>
                </div>


            </section>

            {/* Announcement Section */}
            <section className="py-16 bg-barangay-accent-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-2 text-barangay-blue-600">
                            Latest Announcement
                        </h2>
                        <div className="w-24 h-1 bg-barangay-blue-500"></div>
                    </div>

                    {/* Announcement Card */}
                    <div className="relative rounded-lg overflow-hidden shadow-xl bg-gradient-to-r from-black to-gray-800">
                        {/* Background Image */}
                        <img 
                            src="/images/sample-announcement1.jpg" 
                            alt="Announcement Background"
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />
                        
                        {/* Background Pattern Overlay */}
                        <div className="absolute inset-0 opacity-80 z-5 bg-gradient-to-r from-black to-gray-800"></div>

                        <div className="relative z-10 p-12 flex items-center">
                            {/* Megaphone Icon */}
                            <div className="flex-shrink-0 mr-8">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaBullhorn className="w-10 h-10 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                {/* Badge */}
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white mb-4">
                                    <span className="w-2 h-2 rounded-full mr-2 bg-red-700 animate-pulse"></span>
                                    IMPORTANT ANNOUNCEMENT!
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl font-bold text-white mb-3">
                                    Ayuda para sa mga matatanda
                                </h3>

                                {/* Date */}
                                <p className="text-base mb-4 text-barangay-accent-100">
                                    Nov 21, 2025 12:44pm
                                </p>

                                {/* Description */}
                                <p className="text-white/90 text-lg leading-relaxed mb-6">
                                    Pumunta lamang sa barangay hall para sa pamamahagi ng ayuda sa mga nakatatanda. Mangyaring dalhin ang inyong valid ID at sumunod sa health protocols.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* See More Button */}
                    <div className="text-center mt-8">
                        <Link 
                            to="/announcements" 
                            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-full bg-barangay-blue-600 hover:bg-barangay-blue-700 transition-colors"
                        >
                            See more
                            <FaChevronRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Recent Events Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">
                            Recent Events
                        </h2>
                        <div className="w-24 h-1 bg-barangay-blue-500"></div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Event 1 - General Cleaning */}
                        <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative h-64 overflow-hidden">
                                {/* Background Image */}
                                <img 
                                    src="/images/sample-event1.jpg" 
                                    alt="General Cleaning"
                                    className="absolute inset-0 w-full h-full object-cover z-0"
                                />
                                
                                {/* Subtle Black Overlay */}
                                <div className="absolute inset-0 bg-black opacity-30 z-5"></div>
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex items-end z-10">
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">General Cleaning</h3>
                                        <p className="text-sm text-barangay-accent-100">Jul 14, 2025 3:28am</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event 2 - Paghahain sa matatanda */}
                        <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative h-64 overflow-hidden">
                                {/* Background Image */}
                                <img 
                                    src="/images/sample-event3.jpg" 
                                    alt="Paghahain sa matatanda"
                                    className="absolute inset-0 w-full h-full object-cover z-0"
                                />
                                
                                {/* Subtle Black Overlay */}
                                <div className="absolute inset-0 bg-black opacity-30 z-5"></div>
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex items-end z-10">
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">Paghahain sa matatanda</h3>
                                        <p className="text-sm text-barangay-accent-100">Nov 21, 2025 2:03pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event 3 - General Assembly */}
                        <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative h-64 overflow-hidden">
                                {/* Background Image */}
                                <img 
                                    src="/images/sample-event2.jpg" 
                                    alt="General Assembly"
                                    className="absolute inset-0 w-full h-full object-cover z-0"
                                />
                                
                                {/* Subtle Black Overlay */}
                                <div className="absolute inset-0 bg-black opacity-30 z-5"></div>
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex items-end z-10">
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">General Assembly</h3>
                                        <p className="text-sm text-barangay-accent-100">Nov 20, 2025 11:14pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* See More Button */}
                    <div className="text-center mt-12">
                        <Link 
                            to="/events" 
                            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-full bg-barangay-blue-600 hover:bg-barangay-blue-700 transition-colors"
                        >
                            See more
                            <FaChevronRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 bg-barangay-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

export default Home;
