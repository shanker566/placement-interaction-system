import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import {
    Briefcase,
    ArrowLeft,
    MapPin,
    DollarSign,
    FileText,
    CheckCircle,
    LayoutDashboard,
    Plus,
    Users
} from 'lucide-react';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        type: 'Full-time',
        requirements: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await jobService.createJob({
                ...formData,
                requirements: formData.requirements.split(',').map(r => r.trim()),
                salaryRange: { min: Number(formData.salaryMin), max: Number(formData.salaryMax) }
            });
            // Show success message or redirect with state? For now, standard redirect
            navigate('/employer/jobs');
        } catch (error) {
            alert('Failed to post job'); // In a real app, use a toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link to="/employer/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-2xl">
                    <div className="mb-8 border-b border-gray-100 dark:border-white/10 pb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Post a New Job</h1>
                        <p className="text-gray-500 dark:text-gray-400">Find the best talent for your company.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Job Details Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Briefcase size={18} className="text-blue-600 dark:text-blue-500" />
                                Job Details
                            </h2>
                            <div className="grid gap-6">
                                <InputGroup label="Job Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Software Engineer" required />

                                <div className="grid md:grid-cols-2 gap-6">
                                    <InputGroup label="Company Name" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. TechCorp Inc." required />
                                    <InputGroup label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote / New York" icon={MapPin} required />
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <InputGroup label="Min Salary" name="salaryMin" type="number" value={formData.salaryMin} onChange={handleChange} placeholder="e.g. 50000" icon={DollarSign} />
                                    <InputGroup label="Max Salary" name="salaryMax" type="number" value={formData.salaryMax} onChange={handleChange} placeholder="e.g. 80000" icon={DollarSign} />
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Job Type</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Internship</option>
                                            <option>Contract</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <FileText size={18} className="text-blue-600 dark:text-blue-500" />
                                Description & Requirements
                            </h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                        placeholder="Describe the role responsibilities and company culture..."
                                        required
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Requirements <span className="text-xs text-gray-500">(comma separated)</span></label>
                                    <textarea
                                        name="requirements"
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                        placeholder="e.g. React, Node.js, 3+ years experience, CS Degree"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/employer/dashboard')}
                                className="px-6 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Post Job
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// UI Helpers
const InputGroup = ({ label, name, type = 'text', value, onChange, placeholder, required, icon: Icon }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <Icon size={18} />
                </div>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg ${Icon ? 'pl-10' : 'px-4'} py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600`}
                placeholder={placeholder}
                required={required}
            />
        </div>
    </div>
);

export default PostJob;
