import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import applicationService from '../../services/applicationService';
import {
    Briefcase,
    LayoutDashboard,
    Plus,
    Users,
    Search,
    Mail,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    ArrowLeft,
    DownloadCloud
} from 'lucide-react';

const Applicants = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const data = jobId
                    ? await applicationService.getJobApplications(jobId)
                    : await applicationService.getEmployerApplications();

                let apps = [];
                if (Array.isArray(data)) {
                    apps = data;
                } else if (data && Array.isArray(data.applications)) {
                    apps = data.applications;
                } else if (data && Array.isArray(data.data)) {
                    apps = data.data;
                } else {
                    apps = data || [];
                }
                setApplicants(apps);

                if (jobId && apps.length > 0 && apps[0].job) {
                    setJobTitle(apps[0].job.title);
                } else if (jobId) {
                    setJobTitle('Job');
                }
            } catch (err) {
                console.error('Failed to fetch applicants', err);
                setError(err?.response?.data?.message || 'Failed to fetch applicants');
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [jobId]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await applicationService.updateStatus(id, status);
            setApplicants(applicants.map(app => app._id === id ? { ...app, status } : app));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const filteredApplicants = filterStatus === 'all'
        ? applicants
        : applicants.filter(app => app.status === filterStatus);

    return (
        <div className="w-full">
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                            <Link to="/employer/dashboard" className="hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</Link>
                            <span>/</span>
                            {jobId && <><Link to="/employer/jobs" className="hover:text-gray-900 dark:hover:text-white transition-colors">Jobs</Link> <span>/</span></>}
                            <span className="text-gray-400 dark:text-gray-500">Applicants</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {jobId ? `Candidates for ${jobTitle}` : 'All Applicants'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Review, shortlist, and hire top talent.</p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-none">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <FilterButton active={filterStatus === 'all'} onClick={() => setFilterStatus('all')} label="All" count={applicants.length} />
                        <FilterButton active={filterStatus === 'applied'} onClick={() => setFilterStatus('applied')} label="New" count={applicants.filter(a => a.status === 'applied').length} color="blue" />
                        <FilterButton active={filterStatus === 'shortlisted'} onClick={() => setFilterStatus('shortlisted')} label="Shortlisted" count={applicants.filter(a => a.status === 'shortlisted').length} color="yellow" />
                        <FilterButton active={filterStatus === 'interview_scheduled'} onClick={() => setFilterStatus('interview_scheduled')} label="Interviewing" count={applicants.filter(a => a.status === 'interview_scheduled').length} color="purple" />
                        <FilterButton active={filterStatus === 'hired'} onClick={() => setFilterStatus('hired')} label="Hired" count={applicants.filter(a => a.status === 'hired').length} color="green" />
                        <FilterButton active={filterStatus === 'rejected'} onClick={() => setFilterStatus('rejected')} label="Rejected" count={applicants.filter(a => a.status === 'rejected').length} color="red" />
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400 dark:placeholder-gray-600 text-sm"
                        />
                    </div>
                </div>

                {/* Applicants List */}
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredApplicants.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-900/30 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-none">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
                            <Users size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No candidates found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            {filterStatus !== 'all' ? `No candidates marked as ${filterStatus}.` : "Share your job posting to attract more talent."}
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredApplicants.map((app) => (
                            <div key={app._id} className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg group shadow-sm dark:shadow-none">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[2px]">
                                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                                                {app.student.username[0].toUpperCase()}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{app.student.username}</h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                                <span className="flex items-center gap-1"><Mail size={12} /> {app.student.email}</span>
                                            </div>
                                            {!jobId && app.job && (
                                                <div className="flex items-center gap-1 text-xs text-blue-400 mt-2 bg-blue-500/10 px-2 py-0.5 rounded w-fit">
                                                    <Briefcase size={10} />
                                                    <span>{app.job.title}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <StatusBadge status={app.status} />
                                </div>

                                {app.coverLetter && (
                                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 mb-4 border border-gray-100 dark:border-white/5 text-sm text-gray-600 dark:text-gray-300 italic">
                                        "{app.coverLetter.length > 100 ? app.coverLetter.substring(0, 100) + '...' : app.coverLetter}"
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex gap-2">
                                        <a
                                            href={`http://localhost:5000/${app.resume}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm transition-colors border border-gray-200 dark:border-white/5"
                                        >
                                            <FileText size={14} /> Resume
                                        </a>
                                        <span className="flex items-center gap-1 text-xs text-gray-500 self-center ml-2">
                                            <Calendar size={12} /> {new Date(app.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {/* Simplified Actions for Demo */}
                                        <button
                                            onClick={() => handleStatusUpdate(app._id, 'hired')}
                                            className="p-1.5 rounded-lg text-green-400 hover:bg-green-500/10 hover:text-green-300 transition-colors"
                                            title="Hire"
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                            title="Reject"
                                        >
                                            <XCircle size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(app._id, 'interview_scheduled')}
                                            className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                                            title="Schedule Interview"
                                        >
                                            <Clock size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

// UI Components
const FilterButton = ({ active, onClick, label, count, color = 'blue' }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${active
            ? `bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 border-${color}-500/20`
            : 'bg-transparent text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
    >
        {label} <span className={`ml-1 text-xs ${active ? `text-${color}-600 dark:text-${color}-400` : 'text-gray-400 dark:text-gray-600'}`}>{count}</span>
    </button>
);

const StatusBadge = ({ status }) => {
    const styles = {
        hired: 'bg-green-500/10 text-green-400 border-green-500/20',
        rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
        interview_scheduled: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        shortlisted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };

    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${styles[status] || styles.applied}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

export default Applicants;
