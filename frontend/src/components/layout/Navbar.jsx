import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import {
    LogOut, User, Menu, X,
    LayoutDashboard, Users, Briefcase, FileText, BarChart2, Upload, CheckSquare
} from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const links = {
        admin: [
            { to: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/admin/users', label: 'Users', icon: Users },
            { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
            { to: '/admin/stats', label: 'Stats', icon: BarChart2 },
        ],
        student: [
            { to: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/jobs', label: 'Jobs', icon: Briefcase },
            { to: '/applications', label: 'Applications', icon: FileText },
            { to: '/profile', label: 'Profile', icon: Users },
        ],
        employer: [
            { to: '/dashboard/employer', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/post-job', label: 'Post Job', icon: Briefcase },
            { to: '/employer/jobs', label: 'My Jobs', icon: Briefcase },
            { to: '/employer/applicants', label: 'Applicants', icon: Users },
        ],
        placement_officer: [
            { to: '/dashboard/placement', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/placement/records', label: 'Records', icon: FileText },
            { to: '/placement/analytics', label: 'Analytics', icon: BarChart2 },
        ]
    };

    const roleLinks = user ? (links[user.role] || []) : [];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 w-full z-50 bg-white dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between w-full h-16">
                    {/* Left - Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20"
                            >
                                P
                            </motion.div>
                            <span className="text-xl font-bold tracking-tight group-hover:opacity-80 transition-opacity">
                                PlacementPortal
                            </span>
                        </Link>
                    </div>

                    {/* Center - Navigation Tabs */}
                    <div className="hidden md:flex items-center gap-6">
                        {roleLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.to;
                            return (
                                <Link to={link.to} key={link.to}>
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                                        }`}>
                                        <Icon size={18} />
                                        <span>{link.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium tracking-wider">{user.role?.toUpperCase()}</div>
                                        <span className="text-sm font-medium">{user.username}</span>
                                    </div>
                                    <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center ml-2">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                                <button
                                    className="md:hidden p-2 text-gray-500"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login">
                                    <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white dark:bg-dark border-t border-gray-100 dark:border-white/5 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {roleLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        to={link.to}
                                        key={link.to}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                            ? 'bg-primary/10 text-primary dark:text-white font-medium'
                                            : 'text-gray-500 dark:text-gray-400'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                            <div className="pt-4 mt-2 border-t border-gray-100 dark:border-white/5">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-3 text-red-500 w-full"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
