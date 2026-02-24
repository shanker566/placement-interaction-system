import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Terms &amp; Conditions</h1>
            <p className="text-gray-700 dark:text-gray-300">This is a sample Terms &amp; Conditions page. Replace with your organization's actual terms.</p>
            <section className="mt-6">
                <h2 className="font-semibold">Use of Service</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">Users must comply with all applicable laws. This platform facilitates job postings and applications for educational purposes.</p>
            </section>
            <section className="mt-6">
                <h2 className="font-semibold">Privacy</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">We collect basic profile information and resume uploads for recruitment purposes.</p>
            </section>
        </div>
    );
};

export default Terms;
