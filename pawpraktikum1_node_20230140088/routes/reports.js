const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
// Import middleware autentikasi yang benar
const { authenticateToken, isAdmin } = require('../middleware/permissionMiddleware');

// Gunakan authenticateToken (dari JWT) diikuti oleh isAdmin
router.get('/daily', [authenticateToken, isAdmin], reportController.getDailyReport);

module.exports = router;