import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaCalendarAlt,
    FaCheckCircle,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaFacebook
} from 'react-icons/fa';

const Events: React.FC = () => {
    const events = [
        {
            title: "General Cleaning",
            date: "Jul 14, 2025 3:28am",
            image: "/images/sample-event1.jpg",
            icon: FaCheckCircle,
            gradientClass: "bg-gradient-to-br from-blue-500 to-blue-800"
        },
        {
            title: "General Assembly",
            date: "Nov 21, 2025 2:03pm",
            image: "/images/sample-event2.jpg",
            icon: FaCalendarAlt,
            gradientClass: "bg-gradient-to-br from-purple-500 to-purple-800"
        },
        {
            title: "Paghahain sa Matatanda",
            date: "Nov 20, 2025 11:14pm",
            image: "/images/sample-event3.jpg",
            icon: FaCalendarAlt,
            gradientClass: "bg-gradient-to-br from-red-500 to-red-800"
        },
        {
            title: "Kantahan at Sayawan",
            date: "Oct 15, 2025 10:00am",
            image: "/images/sample-event4.jpg",
            icon: FaCalendarAlt,
            gradientClass: "bg-gradient-to-br from-emerald-500 to-emerald-800"
        },
        {
            title: "Christmas Party",
            date: "Oct 10, 2025 8:00am",
            image: "/images/sample-event5.jpg",
            icon: FaCheckCircle,
            gradientClass: "bg-gradient-to-br from-teal-500 to-teal-800"
        },
        {
            title: "Pagbibigay puri sa diyos",
            date: "Oct 5, 2025 2:00pm",
            image: "/images/sample-event6.jpg",
            icon: FaCalendarAlt,
            gradientClass: "bg-gradient-to-br from-orange-500 to-orange-800"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="py-24 bg-barangay-blue-600">
                <div className="max-w-7xl mx-auto px-4" style={{ textAlign: 'center' }}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ textAlign: 'center' }}>
                        Events
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
                        Manatiling updated sa lahat ng mga pinakabagong kaganapan at aktibidad sa Barangay 599.
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Section Header */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">
                            All Events
                        </h2>
                        <div className="w-24 h-1 bg-barangay-blue-500"></div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, index) => {
                            const IconComponent = event.icon;
                            return (
                                <div 
                                    key={index}
                                    className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        {/* Background Image */}
                                        <img 
                                            src={event.image} 
                                            alt={event.title}
                                            className="absolute inset-0 w-full h-full object-cover z-0"
                                        />
                                        
                                        {/* Subtle Black Overlay */}
                                        <div className="absolute inset-0 bg-black opacity-30 z-5"></div>
                                        
                                        {/* Gradient Overlay for Icon */}
                                        <div className={`absolute top-4 right-4 w-12 h-12 rounded-full ${event.gradientClass} flex items-center justify-center z-15`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="absolute inset-0 flex items-end z-10">
                                            <div className="p-6 text-white">
                                                <h3 className="text-xl font-bold mb-2">
                                                    {event.title}
                                                </h3>
                                                <p className="text-sm text-barangay-accent-100">
                                                    {event.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default Events;