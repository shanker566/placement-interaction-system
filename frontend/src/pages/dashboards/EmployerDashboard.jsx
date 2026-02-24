import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import jobService from '../../services/jobService';
import { Link, useNavigate } from 'react-router-dom';
import {
    Briefcase,
    Users,
    Plus,
    TrendingUp,
    Clock,
    Search,
    Bell,
    Settings,
    ChevronRight,
    MapPin,
    Calendar,
    MoreHorizontal,
    LayoutDashboard,
    FileText
} from 'lucide-react';

const EmployerDashboard = () => {
    const { user, logout } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobService.getMyJobs();
                setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const activeJobs = jobs.filter(j => j.status === 'active').length;
    const totalApplicants = jobs.reduce((acc, job) => acc + (job.applicants?.length || 0), 0);

    return (
        <div className="w-full">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Welcome & Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome back, <span className="text-blue-600 dark:text-blue-400 font-semibold">{user?.username}</span> 👋
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your job postings today.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/post-job">
                            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/30">
                                <Plus size={18} />
                                Post New Job
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        title="Total Jobs Posted"
                        value={jobs.length}
                        trend="+2 this month"
                        icon={Briefcase}
                        color="blue"
                    />
                    <StatCard
                        title="Active Jobs"
                        value={activeJobs}
                        trend="Currently Live"
                        icon={TrendingUp}
                        color="green"
                    />
                    <StatCard
                        title="Total Applicants"
                        value={totalApplicants}
                        trend="+15 this week"
                        icon={Users}
                        color="purple"
                    />
                </div>

                {/* Recent Jobs Section */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Job List (2/3 width) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Job Postings</h2>
                            <Link to="/employer/jobs" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-colors">
                                View All Jobs <ChevronRight size={16} />
                            </Link>
                        </div>

                        {loading ? (
                            <div className="h-64 flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : jobs.length === 0 ? (

                            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 dark:border-white/5 text-center border-dashed shadow-sm dark:shadow-none">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs posted yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first job posting to start finding talent.</p>
                                <Link to="/post-job" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Post a Job &rarr;</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {jobs.slice(0, 3).map((job) => (
                                    <div key={job._id} className="group bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-gray-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:bg-gray-50 dark:hover:bg-slate-800/80">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    {job.title[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                                                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                        <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${job.status === 'active'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                                    }`}>
                                                    {job.status === 'active' ? 'Active' : 'Closed'}
                                                </span>
                                                <span className="text-xs text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {/* Fake Applicants Avatars */}
                                                {[...Array(Math.min(3, job.applicants?.length || 0))].map((_, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-gray-700 flex items-center justify-center text-xs text-white">
                                                        {String.fromCharCode(65 + i)}
                                                    </div>
                                                ))}
                                                {(job.applicants?.length || 0) > 3 && (
                                                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs text-gray-400">
                                                        +{job.applicants.length - 3}
                                                    </div>
                                                )}
                                                {(job.applicants?.length || 0) === 0 && <span className="text-sm text-gray-500 italic ml-2">No applicants yet</span>}
                                                {(job.applicants?.length || 0) > 0 && <span className="text-sm text-gray-400 ml-4 self-center">{job.applicants.length} Applicants</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link to={`/employer/jobs/${job._id}`}>
                                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                        <Settings size={18} />
                                                    </button>
                                                </Link>
                                                <Link to={`/employer/applicants/${job._id}`}>
                                                    <button className="px-4 py-1.5 text-sm font-medium text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors">
                                                        View Applicants
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Quick Stats (1/3 width) */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <div className="p-1.5 bg-purple-100 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400"><TrendingUp size={18} /></div>
                                Monthly Insight
                            </h3>
                            <div className="space-y-4">
                                <InsightRow label="Profile Views" value="1,245" change="+12%" />
                                <InsightRow label="Job Clicks" value="856" change="+5%" />
                                <InsightRow label="Application Rate" value="12.5%" change="+2%" />
                            </div>
                        </Card>

                        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <h3 className="font-bold text-lg mb-2 relative z-10">Need more visibility?</h3>
                            <p className="text-blue-100 text-sm mb-4 relative z-10">Boost your job postings to reach 2x more candidates this week.</p>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-lg relative z-10 hover:bg-gray-50 transition-colors">
                                Boost Postings
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// UI Helpers
const StatCard = ({ title, value, trend, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'from-blue-500/20 to-blue-600/5 text-blue-600 dark:text-blue-400',
        green: 'from-green-500/20 to-green-600/5 text-green-600 dark:text-green-400',
        purple: 'from-purple-500/20 to-purple-600/5 text-purple-600 dark:text-purple-400'
    };

    return (
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-300 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
            <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl bg-gradient-to-br ${colorClasses[color]} opacity-50`}>
                <Icon size={24} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</h3>
            <p className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block bg-gray-100 dark:bg-white/5 ${colorClasses[color].split(' ').slice(2).join(' ')}`}>
                {trend}
            </p>
        </div>
    );
};

const InsightRow = ({ label, value, change }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/5 last:border-0">
        <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
        <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-white font-bold">{value}</span>
            <span className="text-green-600 dark:text-green-400 text-xs bg-green-100 dark:bg-green-500/10 px-1.5 py-0.5 rounded">{change}</span>
        </div>
    </div>
);

const Card = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl ${className}`}>
        {children}
    </div>
);

export default EmployerDashboard;
