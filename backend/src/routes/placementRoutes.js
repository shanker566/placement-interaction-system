const express = require('express');
const router = express.Router();
const {
    getPlacementAnalytics,
    getPlacementRecords
} = require('../controllers/placementController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Check if only placement_officer or also admin? Assuming strict role
router.get('/analytics', protect, authorize('placement_officer', 'admin'), getPlacementAnalytics);
router.get('/records', protect, authorize('placement_officer', 'admin'), getPlacementRecords);

module.exports = router;
