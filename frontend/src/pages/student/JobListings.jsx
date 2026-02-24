import React, { useEffect, useState } from 'react';
import jobService from '../../services/jobService';
import applicationService from '../../services/applicationService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import { Search, MapPin, Briefcase, DollarSign, Filter, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [filters, setFilters] = useState({
        type: 'All',
        location: '',
        company: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async (search = '', currentFilters = filters) => {
        setLoading(true);
        try {
            const data = await jobService.getJobs(search, 1, currentFilters);
            setJobs(data.jobs || []);
        } catch (error) {
            console.error('Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = (e) => {
        e.preventDefault();
        fetchJobs(keyword, filters);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs(keyword);
    };

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile) {
            alert("Please upload a resume");
            return;
        }
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('coverLetter', coverLetter);

        try {
            await applicationService.applyForJob(selectedJob._id, formData);
            setIsModalOpen(false);
            setSuccessMessage('Thank you for your application. We have received your submission and will review it shortly.');
            setTimeout(() => setSuccessMessage(''), 7000);
        } catch (error) {
            alert(error.response?.data?.message || 'Application failed');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Jobs</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by title, skills..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="mb-0"
                        />
                    </div>
                    <Button type="submit" variant="primary">
                        <Search size={20} />
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)}>
                        <Filter size={20} />
                    </Button>
                </form>
            </div>

            {showFilters && (
                <Card className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type</label>
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-dark focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            >
                                <option value="All">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                            <Input
                                name="location"
                                placeholder="e.g. Remote, Bangalore"
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="mb-0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                            <Input
                                name="company"
                                placeholder="e.g. Google"
                                value={filters.company}
                                onChange={handleFilterChange}
                                className="mb-0"
                            />
                        </div>
                        <Button type="submit" variant="secondary">Apply Filters</Button>
                    </form>
                </Card>
            )}

            {loading ? (
                <Loader size="medium" />
            ) : (
                <div className="grid gap-6">
                    {successMessage && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded">
                            {successMessage}
                        </div>
                    )}
                    {jobs.map((job) => (
                        <Card key={job._id} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-white/10 bg-white dark:bg-dark relative overflow-hidden flex flex-col h-full rounded-2xl">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h2>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                            <Building size={16} />
                                            <span>{job.company}</span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white font-bold text-xl">
                                        {job.company.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                                        <MapPin size={12} />
                                        {job.location}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                                        <Briefcase size={12} />
                                        {job.type}
                                    </span>
                                    {job.salaryRange && (
                                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-900 dark:text-white flex items-center gap-1.5 font-bold">
                                            <DollarSign size={12} />
                                            ${job.salaryRange.min}k - ${job.salaryRange.max}k
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
                                    {job.description}
                                </p>

                                <div className="text-xs text-gray-400">
                                    Posted {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 h-10 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 font-medium"
                                    onClick={() => handleApplyClick(job)}
                                >
                                    View Details
                                </Button>
                                <Button
                                    className="flex-1 h-10 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 font-medium"
                                    onClick={() => handleApplyClick(job)}
                                >
                                    Apply Now
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Apply for ${selectedJob?.title}`}
            >
                <div className="mb-6 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-white dark:bg-dark rounded-lg flex items-center justify-center text-primary shadow-sm">
                            <Building size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedJob?.company}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedJob?.location} • {selectedJob?.type}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Resume (PDF/DOC)
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cover Letter (Optional)
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            rows="4"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Submit Application</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default JobListings;
