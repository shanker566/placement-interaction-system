import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import applicationService from '../../services/applicationService';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import PageTransition from '../../components/animations/PageTransition';
import AnimatedComponent from '../../components/animations/AnimatedComponent';
import { motion } from 'framer-motion';
import { Briefcase, FileText, CheckSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                // In a real app, we might need a specific endpoint for stats or just filter apps
                const data = await applicationService.getMyApplications();
                setApplications(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch applications', error);
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'student') {
            fetchApps();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader size="large" />
        </div>
    );

    const stats = [
        { label: 'Applied Jobs', value: applications.length, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'interview_scheduled').length, icon: CheckSquare, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
        { label: 'Offers', value: applications.filter(a => a.status === 'hired').length, icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    ];

    return (
        <PageTransition>
            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome back, <span className="text-blue-600 dark:text-blue-400 font-semibold">{user.username}</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your job applications.</p>
                    </div>
                    <Link to="/jobs">
                        <Button variant="primary" className="shadow-lg shadow-primary/25">Find Jobs</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <AnimatedComponent key={stat.label} delay={index * 0.1} direction="up">
                                <div className={`flex items-center space-x-4 border rounded-2xl p-6 bg-white dark:bg-slate-900/60 backdrop-blur-xl shadow-sm dark:shadow-none ${stat.border}`}>
                                    <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                        <Icon size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                                    </div>
                                </div>
                            </AnimatedComponent>
                        );
                    })}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <FileText size={20} className="text-blue-600 dark:text-blue-500" />
                        Recent Applications
                    </h2>

                    {applications.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
                                <Briefcase size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No applications yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Start your career journey by browsing available positions.</p>
                            <Link to="/jobs">
                                <Button variant="outline">Browse Jobs</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Job Role</th>
                                            <th className="px-6 py-4 font-medium">Company</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium">Date</th>
                                            <th className="px-6 py-4 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                        {applications.slice(0, 5).map((app, index) => (
                                            <motion.tr
                                                key={app._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900 dark:text-white">{app.job?.title || 'Unknown Job'}</div>
                                                    <div className="text-xs text-gray-500">{app.job?.location || 'Remote'}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{app.job?.company || 'Unknown Company'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${app.status === 'hired' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-500/20' :
                                                            app.status === 'rejected' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/20' :
                                                                'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20'}`}>
                                                        {app.status ? app.status.replace('_', ' ').toUpperCase() : 'PENDING'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                                                    {new Date(app.createdAt || Date.now()).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link to={`/applications`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white transition-colors text-sm font-medium">
                                                        View Details
                                                    </Link>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
};

export default StudentDashboard;
