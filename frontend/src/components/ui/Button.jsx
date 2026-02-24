import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, ...props }) => {

    const baseStyles = 'relative overflow-hidden font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5',
        secondary: 'bg-dark-lighter text-white border border-white/10 hover:bg-white/5 hover:border-white/20',
        danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40',
        outline: 'border-2 border-primary/50 text-primary hover:bg-primary/10',
        ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
        gradient: 'bg-gradient-to-r from-blue-500 via-primary to-secondary text-white shadow-lg hover:shadow-xl'
    };

    const sizeStyles = "px-6 py-2.5";

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${sizeStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}
        </motion.button>
    );
};

export default Button;
