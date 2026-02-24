import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import GlobalLayout from './components/layout/GlobalLayout';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <GlobalLayout>
                        <AppRoutes />
                    </GlobalLayout>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
