import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const { verifyOTP } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOTP(email, otp);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed');
        }
    };

    if (!email) {
        return <div className="text-center p-10">Invalid access. Please register first.</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Verify Email</h2>
                <p className="text-center text-gray-600 mb-6">Enter the 6-digit code sent to {email}</p>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <Input
                        label="OTP Code"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        placeholder="123456"
                        className="text-center tracking-widest text-xl"
                    />
                    <Button type="submit" className="w-full">Verify</Button>
                </form>
            </Card>
        </div>
    );
};

export default VerifyOTP;
