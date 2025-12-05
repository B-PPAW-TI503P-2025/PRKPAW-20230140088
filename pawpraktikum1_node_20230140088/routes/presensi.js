const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
// Import middleware autentikasi yang benar
const { authenticateToken } = require('../middleware/permissionMiddleware'); 

// Terapkan authenticateToken untuk semua rute presensi yang membutuhkan user ID
router.post('/check-in', [authenticateToken, presensiController.upload.single('image')], presensiController.CheckIn);
router.post('/check-in', authenticateToken, presensiController.CheckIn);
router.post('/check-out', authenticateToken, presensiController.CheckOut);

// NOTE: Jika rute DELETE dan PUT ini hanya untuk admin, perlu ditambahkan isAdmin
router.delete('/:id', authenticateToken, presensiController.deletePresensi);
router.put('/:id', authenticateToken, presensiController.updatePresensi);

module.exports = router;