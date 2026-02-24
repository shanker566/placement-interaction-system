import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import {
    Briefcase,
    LayoutDashboard,
    Plus,
    Users,
    Search,
    MapPin,
    Clock,
    MoreHorizontal,
    Edit3,
    Trash2,
    Eye
} from 'lucide-react';

const EmployerJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            try {
                await jobService.deleteJob(jobId);
                setJobs(jobs.filter(j => j._id !== jobId));
            } catch (error) {
                alert('Failed to delete job');
            }
        }
    };

    return (
        <div className="w-full">
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Jobs</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your job postings and view applications.</p>
                    </div>
                    <Link to="/post-job">
                        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/30">
                            <Plus size={18} />
                            Post New Job
                        </button>
                    </Link>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-8 flex items-center gap-4 shadow-sm dark:shadow-none">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search jobs by title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400 dark:placeholder-gray-600"
                        />
                    </div>
                    {/* Add filters here if needed */}
                </div>

                {/* Jobs List */}
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-900/30 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-none">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or post a new job.</p>
                        {searchTerm === '' && (
                            <Link to="/post-job" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Post a Job &rarr;</Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredJobs.map((job) => (
                            <div key={job._id} className="group bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-slate-800/80">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h3>
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border md:hidden ${job.status === 'active'
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                                }`}>
                                                {job.status === 'active' ? 'Active' : 'Closed'}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.company}</span>
                                            <span className="hidden md:inline w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
                                            <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                                            <span className="hidden md:inline w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
                                            <span className="flex items-center gap-1.5"><Clock size={16} /> {job.type}</span>
                                            <span className="hidden md:inline w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
                                            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users size={16} className="text-blue-600 dark:text-blue-400" />
                                                <span className="text-gray-900 dark:text-white font-medium">{job.applicants?.length || 0}</span>
                                                <span className="text-gray-500 dark:text-gray-400">Applicants</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 min-w-[200px]">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border hidden md:inline-block ${job.status === 'active'
                                            ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20'
                                            : 'bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20'
                                            }`}>
                                            {job.status}
                                        </span>

                                        <div className="flex items-center gap-2 w-full md:w-auto mt-auto">
                                            <Link to={`/employer/applicants/${job._id}`} className="flex-1 md:flex-none">
                                                <button className="w-full md:w-auto px-4 py-2 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                                    <Users size={16} /> View Applicants
                                                </button>
                                            </Link>

                                            <Link to={`/employer/jobs/${job._id}`}> {/* Assuming edit route exists or will exist */}
                                                <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors" title="Edit">
                                                    <Edit3 size={18} />
                                                </button>
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-200 dark:hover:border-red-500/30 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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

// Nav Item Helper
export default EmployerJobs;
