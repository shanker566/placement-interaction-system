import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Reports = () => {
    const handleDownload = () => {
        alert("Download functionality would generate a PDF/CSV here.");
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
            <Card>
                <h3 className="text-lg font-semibold mb-2">Quarterly Placement Report</h3>
                <p className="text-gray-500 mb-4">Summary of all placements, offers, and company participation for the current quarter.</p>
                <Button onClick={handleDownload}>Download PDF</Button>
            </Card>
            <Card>
                <h3 className="text-lg font-semibold mb-2">Student Performance Report</h3>
                <p className="text-gray-500 mb-4">Detailed breakdown of student application metrics and interview success rates.</p>
                <Button onClick={handleDownload}>Download CSV</Button>
            </Card>
        </div>
    );
};

export default Reports;
