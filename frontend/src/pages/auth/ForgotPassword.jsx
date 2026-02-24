import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.forgotPassword(email);
            setMessage('OTP sent to your email.');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
            setMessage('');
        }
    };

    // Note: Actual reset with OTP input + new password would go here or on a separate ResetPassword page
    // For simplicity, stopping at "OTP Sent" or would need state to toggle form

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Forgot Password</h2>
                {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full">Send Reset OTP</Button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPassword;
