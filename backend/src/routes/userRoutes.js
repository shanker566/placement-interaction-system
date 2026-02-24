const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/roleMiddleware'); // Wait, protect is in authMiddleware
const { protect: authProtect } = require('../middleware/authMiddleware');

router.route('/profile')
    .get(authProtect, getUserProfile)
    .put(authProtect, updateUserProfile);

router.route('/')
    .get(authProtect, authorize('admin', 'placement_officer'), getAllUsers);

router.route('/:id')
    .delete(authProtect, authorize('admin'), deleteUser);

module.exports = router;
