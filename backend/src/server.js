const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load env vars FIRST (VERY IMPORTANT)
dotenv.config();

// Import configs after dotenv
const connectDB = require('./config/db');
const connectCloudinary = require('./config/cloudStorage');

// Import middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Connect to Cloudinary ONLY if configured
if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
) {
    connectCloudinary();
    console.log("Cloudinary Connected");
}

// Middleware
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads (if using local uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/placement', require('./routes/placementRoutes'));

// Health Check Route
app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Placement Portal API is running...',
        status: 'OK',
        environment: process.env.NODE_ENV
    });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../../', 'frontend', 'dist', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

// Error Handling Middleware (MUST stay at the bottom)
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

// Log registered routes for debugging
const listRoutes = () => {
    try {
        const routes = [];
        if (!app._router || !app._router.stack) return console.log('No router stack available');
        app._router.stack.forEach((middleware) => {
            if (middleware.route && middleware.route.path) {
                routes.push(middleware.route.path);
            } else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
                // middleware.regexp contains the mount path regex
                const mountPath = middleware.regexp && middleware.regexp.source ? middleware.regexp.source : '';
                middleware.handle.stack.forEach((handler) => {
                    const route = handler.route;
                    if (route && route.path) {
                        routes.push((mountPath || '') + route.path);
                    }
                });
            }
        });
        console.log('Registered routes:', routes.filter(Boolean));
    } catch (e) {
        console.error('Failed to list routes', e);
    }
};

listRoutes();

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
