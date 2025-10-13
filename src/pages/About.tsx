import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaStar,
    FaCheckCircle,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaFacebook
} from 'react-icons/fa';

const About: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="py-24 bg-barangay-blue-600">
                <div className="max-w-7xl mx-auto px-4" style={{ textAlign: 'center' }}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ textAlign: 'center' }}>
                        About Us
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
                        Alamin pa ang tungkol sa Barangay 599, ang aming pamunuan, at ang aming pangako sa paglilingkod sa komunidad.
                    </p>
                </div>
            </section>

            {/* About Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-barangay-blue-500">
                                <FaStar className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-barangay-blue-600">
                                Our Mission
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Magbigay ng episyente, tapat, at maagap na pampublikong serbisyo sa lahat ng residente ng Barangay 599, isulong ang kaunlaran ng komunidad, at tiyakin ang kapakanan ng bawat mamamayan.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-barangay-blue-500">
                                <FaCheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-barangay-blue-600">
                                Our Vision
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Isang maunlad, mapayapa, at nagkakaisang Barangay 599 kung saan ang bawat residente ay nagtatamasa ng mataas na kalidad ng buhay, napapanatiling kaunlaran, at pantay-pantay na oportunidad para sa paglago at kasaganaan.
                            </p>
                        </div>
                    </div>

                    {/* Leadership Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12 text-barangay-blue-600">
                            Our Leadership
                        </h2>
                        
                        {/* Barangay Captain */}
                        <div className="text-center mb-12">
                            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                                <FaUser className="w-16 h-16 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-barangay-blue-600">
                                Kapitana Edith Alviso
                            </h3>
                            <p className="text-lg text-gray-600 mb-4">Barangay Captain</p>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Pinangungunahan ni Kapitana Edith Alviso ang Barangay 599 nang may dedikasyon at malasakit sa paglilingkod-bayan, nagsisikap siya nang walang humpay upang mapabuti ang buhay ng lahat ng residente at isulong ang kaunlaran ng komunidad.
                            </p>
                        </div>

                        {/* Executive Officials */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FaUser className="w-12 h-12 text-gray-400" />
                                </div>
                                <h4 className="font-semibold mb-1 text-barangay-blue-600">
                                    Barangay Secretary
                                </h4>
                                <p className="text-sm text-gray-600">Kalihim ng Barangay</p>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FaUser className="w-12 h-12 text-gray-400" />
                                </div>
                                <h4 className="font-semibold mb-1 text-barangay-blue-600">
                                    Barangay Treasurer
                                </h4>
                                <p className="text-sm text-gray-600">Ingat-yaman ng Barangay</p>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FaUser className="w-12 h-12 text-gray-400" />
                                </div>
                                <h4 className="font-semibold mb-1 text-barangay-blue-600">
                                    SK Chairperson
                                </h4>
                                <p className="text-sm text-gray-600">Pangulo ng Sangguniang Kabataan</p>
                            </div>
                        </div>

                        {/* Barangay Kagawads */}
                        <div>
                            <h3 className="text-2xl font-bold text-center mb-8 text-barangay-blue-600">
                                Mga Barangay Kagawad
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                                {[1, 2, 3, 4, 5, 6, 7].map((kagawad) => (
                                    <div key={kagawad} className="text-center">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                            <FaUser className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h4 className="font-semibold mb-1 text-barangay-blue-600 text-sm">
                                            Kagawad {kagawad}
                                        </h4>
                                        <p className="text-xs text-gray-600">Barangay Kagawad</p>
                                    </div>
                                ))}
                            </div>
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

export default About;