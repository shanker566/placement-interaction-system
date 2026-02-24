const express = require('express');
const router = express.Router();
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
    .get(getJobs)
    .post(protect, authorize('employer', 'admin'), createJob);

router.route('/myjobs')
    .get(protect, authorize('employer'), getMyJobs);

router.route('/:id')
    .get(getJobById)
    .put(protect, authorize('employer', 'admin'), updateJob)
    .delete(protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;
