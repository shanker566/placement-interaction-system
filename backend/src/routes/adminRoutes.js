const express = require('express');
const router = express.Router();
const {
    getSystemStats,
    approveEmployer
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/stats', protect, authorize('admin'), getSystemStats);
router.put('/approve-employer/:id', protect, authorize('admin'), approveEmployer);

module.exports = router;
