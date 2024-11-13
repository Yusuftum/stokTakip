const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, protect } = require('../controllers/adminController');

// Admin kaydı
router.post('/register', registerAdmin);

// Admin girişi
router.post('/login', loginAdmin);

// Admin korumalı route örneği (Admin token'ı ile korunan bir endpoint)
router.get('/protected', protect, (req, res) => {
    res.json({ message: 'Bu route yalnızca adminler için.' });
});

module.exports = router;
