import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    User,
    LogOut,
    Rocket
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

const StudentNavbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between w-full h-16">
                    {/* Left - Logo */}
                    <Link to="/student/dashboard" className="flex items-center gap-3 group">
                        <div className="bg-blue-600 p-2.5 rounded-lg shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                            <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Place<span className="text-blue-600 dark:text-blue-500">Me</span>
                        </span>
                    </Link>

                    {/* Center - Navigation Tabs */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavItem to="/student/dashboard" icon={LayoutDashboard} text="Dashboard" active={isActive('/student/dashboard')} />
                        <NavItem to="/jobs" icon={Briefcase} text="Find Jobs" active={isActive('/jobs')} />
                        <NavItem to="/applications" icon={FileText} text="Applications" active={isActive('/applications')} />
                        <NavItem to="/profile" icon={User} text="Profile" active={isActive('/profile')} />
                    </div>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-semibold">{user?.username || 'Student'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
                        </div>

                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center ml-2"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ to, icon: Icon, text, active }) => (
    <Link to={to}>
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${active
            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
            }`}>
            <Icon size={18} />
            <span>{text}</span>
        </div>
    </Link>
);

export default StudentNavbar;
