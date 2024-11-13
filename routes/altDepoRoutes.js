const express = require('express');
const router = express.Router();
const AnaDepo = require('../models/anaDepo');
const AltDepo = require('../models/altDepo');
const { protect } = require('../controllers/adminController');

// Ana depo ve alt depo örnekleri
const anaDepo = new AnaDepo(200);
const altDepo = new AltDepo(anaDepo, 50);  // 50 birim stoklu alt depo

// Alt depo stok durumunu döndürme
router.get('/stock', protect, (req, res) => {
    res.json({ stock: altDepo.stock });
});

// Alt depo stoğuna ürün ekleme
router.post('/add-stock', protect, (req, res) => {
    const { amount } = req.body;
    if (amount && amount > 0) {
        const addedStock = altDepo.addStock(amount);
        res.send(`${addedStock} birim ürün alt depoya eklendi. Güncel stok: ${altDepo.stock}`);
    } else {
        res.status(400).send("Geçersiz miktar. Pozitif bir sayı girin.");
    }
});

// Alt depodan ürün sağlama (supplyMarket)
router.post('/supply', protect, (req, res) => {
    const { amount } = req.body;
    if (amount && amount > 0) {
        const suppliedAmount = altDepo.supplyMarket(amount);
        if (suppliedAmount > 0) {
            res.send(`${suppliedAmount} ürün sağlandı. Güncel stok: ${altDepo.stock}`);
        } else {
            res.status(400).send("Yeterli stok yok.");
        }
    } else {
        res.status(400).send("Geçersiz miktar. Pozitif bir sayı girin.");
    }
});

module.exports = router;
