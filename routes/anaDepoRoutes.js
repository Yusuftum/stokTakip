const express = require('express');
const router = express.Router();
const AnaDepo = require('../models/anaDepo');
const { protect } = require('../controllers/adminController');

// Ana depo örneği
const anaDepo = new AnaDepo(200);  // 200 birim stoklu ana depo

// Ana depo stok durumunu döndürme
router.get('/stock', protect, (req, res) => {
    res.json({ stock: anaDepo.stock });
});

// Ana depodan ürün sağlama (provideStock)
router.post('/provide-stock', protect, (req, res) => {
    const { amount } = req.body;
    if (amount && amount > 0) {
        const providedAmount = anaDepo.provideStock(amount);
        if (providedAmount > 0) {
            res.send(`${providedAmount} birim ürün sağlandı. Güncel stok: ${anaDepo.stock}`);
        } else {
            res.status(400).send("Yeterli stok yok.");
        }
    } else {
        res.status(400).send("Geçersiz miktar. Pozitif bir sayı girin.");
    }
});

module.exports = router;
