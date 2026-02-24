import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-slate-900 border-t border-gray-200 dark:border-white/10 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <h2 className="text-gray-900 dark:text-white font-semibold text-lg flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">P</div>
                        PlacementPortal
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                        Bridging the gap between talent and opportunity. We help students find their dream careers and employers discover exceptional talent.
                    </p>
                </div>

                {/* Platform */}
                <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Platform</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
                        <li><Link to="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Browse Jobs</Link></li>
                        <li><Link to="/companies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Companies</Link></li>
                        <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="mailto:support@placementportal.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</a></li>
                        <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center py-4 text-gray-700 dark:text-gray-500 border-t border-gray-200 dark:border-white/10">
                &copy; {new Date().getFullYear()} PlacementPortal. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
