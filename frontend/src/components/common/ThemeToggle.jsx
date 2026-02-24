import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            id="themeToggle"
            onClick={toggleTheme}
            className={`relative w-14 h-8 flex items-center rounded-full p-1 transition transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${isDark ? 'bg-slate-700' : 'bg-gray-300'
                }`}
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <div
                id="toggleCircle"
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-6' : 'translate-x-0'
                    }`}
            >
                <span id="toggleIcon" className="text-xs">{isDark ? '🌙' : '☀️'}</span>
            </div>
        </button>
    );
};

export default ThemeToggle;
