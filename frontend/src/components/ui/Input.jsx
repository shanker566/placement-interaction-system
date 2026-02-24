import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, className = '', icon: Icon }) => {
    return (
        <div className={`mb-6 relative group ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-400 mb-2 transition-colors group-focus-within:text-primary"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full bg-dark-lighter/50 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder:text-gray-600 ${Icon ? 'pl-10' : ''}`}
                />
            </div>
        </div>
    );
};

export default Input;
