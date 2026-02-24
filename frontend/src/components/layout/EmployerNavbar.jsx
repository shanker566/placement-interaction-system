import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
    LayoutDashboard,
    Plus,
    Briefcase,
    Users,
    Bell,
    LogOut
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

const EmployerNavbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between w-full h-16">
                    {/* Left - Logo */}
                    <Link to="/employer/dashboard" className="flex items-center gap-3">
                        <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <span className="text-lg font-bold tracking-tight">PlacementPortal</span>
                    </Link>

                    {/* Center - Navigation Tabs */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavItem
                            icon={LayoutDashboard}
                            text="Dashboard"
                            to="/employer/dashboard"
                            active={location.pathname === '/employer/dashboard'}
                        />
                        <NavItem
                            icon={Plus}
                            text="Post Job"
                            to="/post-job"
                            active={location.pathname === '/post-job'}
                        />
                        <NavItem
                            icon={Briefcase}
                            text="My Jobs"
                            to="/employer/jobs"
                            active={location.pathname.startsWith('/employer/jobs')}
                        />
                        <NavItem
                            icon={Users}
                            text="Applicants"
                            to="/employer/applicants"
                            active={location.pathname.startsWith('/employer/applicants')}
                        />
                    </div>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium">{user?.username || 'Employer'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Tech Corp Inc.</p>
                        </div>

                        <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full p-[2px] hidden sm:block">
                            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-sm font-bold text-white">
                                {user?.username?.[0]?.toUpperCase() || 'E'}
                            </div>
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

const NavItem = ({ icon: Icon, text, to, active }) => (
    <Link to={to} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${active
        ? 'bg-blue-600/10 text-blue-400 shadow-sm'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}>
        <Icon size={18} />
        {text}
    </Link>
);

export default EmployerNavbar;
