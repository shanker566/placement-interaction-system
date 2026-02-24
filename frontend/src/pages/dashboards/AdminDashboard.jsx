import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Direct API call for stats
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Loader size="large" className="mt-10" />;

    const userRoleData = [
        { name: 'Students', value: stats.totalStudents },
        { name: 'Employers', value: stats.totalEmployers },
    ];

    const jobStatusData = [
        { name: 'Active', count: stats.activeJobs },
        { name: 'Total', count: stats.totalJobs },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </Card>
                <Card>
                    <p className="text-sm text-gray-500">Total Jobs</p>
                    <p className="text-3xl font-bold">{stats.totalJobs}</p>
                </Card>
                <Card>
                    <p className="text-sm text-gray-500">Applications</p>
                    <p className="text-3xl font-bold">{stats.totalApplications}</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
                    <PieChart data={userRoleData} dataKey="value" nameKey="name" />
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Job Statistics</h3>
                    <BarChart data={jobStatusData} xKey="name" yKey="count" />
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
