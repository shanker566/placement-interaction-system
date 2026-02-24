import React from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import EmployerNavbar from './EmployerNavbar';
import StudentNavbar from './StudentNavbar';

const GlobalLayout = ({ children }) => {
    const location = useLocation();
    const isEmployerRoute = location.pathname.startsWith('/employer');
    const isStudentRoute = location.pathname.startsWith('/student') || location.pathname === '/jobs' || location.pathname === '/applications' || location.pathname === '/profile';
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/signup';

    return (
        <div className="min-h-screen overflow-y-auto transition-colors duration-300 bg-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white flex flex-col">
            {/* Conditional Navbar rendering based on route */}
            {!isAuthRoute && (
                isEmployerRoute ? <EmployerNavbar /> :
                    isStudentRoute ? <StudentNavbar /> :
                        <Navbar />
            )}

            <main className={`flex-grow ${!isAuthRoute ? 'pt-20' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default GlobalLayout;
