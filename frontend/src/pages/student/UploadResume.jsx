import React from 'react';
import Card from '../../components/ui/Card';

const UploadResume = () => {
    // Basic placeholder since resume upload is integrated in job application for now
    // But could be for profile-level resume
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Resume</h1>
            <Card>
                <p className="text-gray-500">
                    You can upload your resume directly when applying for jobs.
                    A centralized resume manager can be added here in future updates.
                </p>
            </Card>
        </div>
    );
};

export default UploadResume;
