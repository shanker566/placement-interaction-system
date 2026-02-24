import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployerNavbar from './EmployerNavbar';

const EmployerLayout = () => {
    return (
        <div className="min-h-screen font-sans text-gray-900 dark:text-white bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default EmployerLayout;
