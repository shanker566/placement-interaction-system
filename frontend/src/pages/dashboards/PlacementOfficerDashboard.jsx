import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import PieChart from '../../components/charts/PieChart';

const PlacementOfficerDashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get('/placement/analytics');
                setAnalytics(data);
            } catch (error) {
                console.error('Failed to fetch analytics');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <Loader size="large" className="mt-10" />;

    const placementData = [
        { name: 'Hired', value: analytics.hiredStudents },
        { name: 'Not Hired', value: analytics.totalStudents - analytics.hiredStudents },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Placement Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-3xl font-bold">{analytics.totalStudents}</p>
                </Card>
                <Card>
                    <p className="text-sm text-gray-500">Hired Students</p>
                    <p className="text-3xl font-bold text-green-600">{analytics.hiredStudents}</p>
                </Card>
                <Card>
                    <p className="text-sm text-gray-500">Placement Rate</p>
                    <p className="text-3xl font-bold text-blue-600">{analytics.placementRate}</p>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Placement Status</h3>
                    <div className="h-64">
                        <PieChart data={placementData} dataKey="value" nameKey="name" />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PlacementOfficerDashboard;
