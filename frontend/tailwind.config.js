/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb', // Blue 600 (Corporate Blue)
                    foreground: '#ffffff',
                    dark: '#1d4ed8', // Blue 700
                    light: '#60a5fa', // Blue 400
                },
                secondary: {
                    DEFAULT: '#475569', // Slate 600
                    foreground: '#ffffff',
                    dark: '#334155', // Slate 700
                    light: '#94a3b8', // Slate 400
                },
                dark: {
                    DEFAULT: '#0f172a', // Slate 900
                    lighter: '#1e293b', // Slate 800
                    card: '#1e293b',
                },
                light: {
                    DEFAULT: '#f8fafc', // Slate 50
                    darker: '#e2e8f0', // Slate 200
                },
                glass: {
                    DEFAULT: 'rgba(255, 255, 255, 0.7)', // More opaque, cleaner glass
                    dark: 'rgba(15, 23, 42, 0.7)',
                    border: 'rgba(226, 232, 240, 0.6)',
                },
                accent: '#0ea5e9', // Sky 500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': "url('/hero-pattern.svg')", // Placeholder if we add one later
                'main-gradient': 'linear-gradient(to right bottom, #0f172a, #1e1b4b, #312e81)',
            },
            animation: {
                'shimmer': 'shimmer 2s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                shimmer: {
                    'from': { backgroundPosition: '0 0' },
                    'to': { backgroundPosition: '-200% 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
