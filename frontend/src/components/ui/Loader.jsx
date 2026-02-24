import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'medium', className = '' }) => {
    const sizes = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className={`${sizes[size]} border-4 border-gray-200 border-t-primary rounded-full`}
            />
        </div>
    );
};

export default Loader;
