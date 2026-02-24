import Home from '../pages/Home';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ui/ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import EmployerLayout from '../components/layout/EmployerLayout';
import useAuth from '../hooks/useAuth';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import VerifyOTP from '../pages/auth/VerifyOTP';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Dashboards
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import StudentDashboard from '../pages/dashboards/StudentDashboard';
import EmployerDashboard from '../pages/dashboards/EmployerDashboard';
import PlacementOfficerDashboard from '../pages/dashboards/PlacementOfficerDashboard';

// Student Pages
import JobListings from '../pages/student/JobListings';
import AppliedJobs from '../pages/student/AppliedJobs';
import StudentProfile from '../pages/student/StudentProfile';
import UploadResume from '../pages/student/UploadResume';

// Employer Pages
import PostJob from '../pages/employer/PostJob';
import EmployerJobs from '../pages/employer/EmployerJobs';
import Applicants from '../pages/employer/Applicants';

// Placement Officer Pages
import PlacementRecords from '../pages/placementOfficer/PlacementRecords';
import Reports from '../pages/placementOfficer/Reports';
import Analytics from '../pages/placementOfficer/Analytics';
import AllApplicants from '../pages/placementOfficer/AllApplicants';
import Terms from '../pages/Terms';

const AppRoutes = () => {
    const { user } = useAuth();

    // Helper to redirect to correct dashboard
    const DashboardRedirect = () => {
        if (!user) return <Navigate to="/login" />;
        if (user.role === 'admin') return <Navigate to="/dashboard/admin" />;
        if (user.role === 'employer') return <Navigate to="/employer/dashboard" />;
        if (user.role === 'placement_officer') return <Navigate to="/dashboard/placement" />;
        return <Navigate to="/dashboard/student" />;
    };

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard Routes - Protected */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardRedirect />} />
                <Route path="student" element={<StudentDashboard />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="placement" element={<PlacementOfficerDashboard />} />
            </Route>

            {/* Employer Dashboard & Routes - Separated Layout */}
            <Route element={<EmployerLayout />}>
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/employer/jobs" element={<EmployerJobs />} />
                    <Route path="/employer/applicants" element={<Applicants />} />
                    <Route path="/employer/applicants/:jobId" element={<Applicants />} />
                </Route>
            </Route>

            {/* Other routes that need generic layout */}
            <Route element={<DashboardLayout />}>
                {/* Student Routes */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                    <Route path="/jobs" element={<JobListings />} />
                    <Route path="/applications" element={<AppliedJobs />} />
                    <Route path="/profile" element={<StudentProfile />} />
                    <Route path="/upload-resume" element={<UploadResume />} />
                </Route>

                {/* Placement Officer Routes */}
                <Route element={<ProtectedRoute allowedRoles={['placement_officer', 'admin']} />}>
                    <Route path="/placement/records" element={<PlacementRecords />} />
                    <Route path="/placement/applications" element={<AllApplicants />} />
                    <Route path="/placement/analytics" element={<Analytics />} />
                    <Route path="/placement/reports" element={<Reports />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin/stats" element={<AdminDashboard />} />
                </Route>
            </Route>

            {/* Public pages */}
            <Route path="/terms" element={<Terms />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
