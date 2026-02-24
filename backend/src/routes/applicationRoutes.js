const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
    getAllApplications,
    getEmployerApplications
} = require('../controllers/applicationController');

console.log('[Applications Routes] module loaded');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/my')
    .get(protect, getMyApplications); // Student

// simple logger to help debug route hits
router.use((req, res, next) => {
    console.log(`[Applications Route] ${req.method} ${req.originalUrl}`);
    next();
});

// Unprotected debug ping so we can confirm the router is mounted
router.get('/ping', (req, res) => res.json({ ok: true, route: '/api/applications/ping' }));

// All applications - for placement officers and admins
router.route('/')
    .get(protect, authorize('placement_officer', 'admin'), getAllApplications);

// Applications for the logged-in employer's jobs
router.route('/employer')
    .get(protect, authorize('employer'), getEmployerApplications);

router.route('/:jobId')
    .post(protect, authorize('student'), upload.single('resume'), applyForJob);

router.route('/job/:jobId')
    .get(protect, authorize('employer', 'admin', 'placement_officer'), getJobApplications);

router.route('/:id/status')
    .put(protect, authorize('employer', 'placement_officer', 'admin'), updateApplicationStatus);

module.exports = router;
