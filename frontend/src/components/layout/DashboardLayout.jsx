import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-200 bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="flex flex-1 pt-6">
                <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
