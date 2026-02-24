import React, { useEffect, useState } from 'react';
import applicationService from '../../services/applicationService';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { Building, MapPin, Calendar, ArrowRight } from 'lucide-react';

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const data = await applicationService.getMyApplications();
                setApplications(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch applications', error);
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'hired': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
            case 'interview': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
            case 'shortlisted': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20';
            default: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
        }
    };

    if (loading) return <Loader size="large" />;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
            {applications.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't applied to any jobs yet.</p>
                    <Button onClick={() => window.location.href = '/jobs'}>Find Jobs</Button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {applications.map((app) => (
                        <Card key={app._id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-white/10 bg-white dark:bg-dark overflow-hidden">
                            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between md:hidden mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(app.status)}`}>
                                            {app.status.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                                        {app.job?.title || 'Job Unavailable'}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Building size={16} />
                                            <span className="font-medium">{app.job?.company || 'Unknown Company'}</span>
                                        </div>
                                        {app.job?.location && (
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={16} />
                                                <span>{app.job.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={16} />
                                            <span>Applied: {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '-'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                    <span className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(app.status)}`}>
                                        {app.status.replace('_', ' ')}
                                    </span>

                                    <Button variant="outline" size="sm" className="w-full group-hover:bg-gray-50 dark:group-hover:bg-white/5 border-gray-200 dark:border-white/10">
                                        View Details <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppliedJobs;
