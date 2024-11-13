const express = require('express');
const router = express.Router();
const AnaDepo = require('../models/anaDepo');
const AltDepo = require('../models/altDepo');
const Market = require('../models/market');
const { protect } = require('../controllers/adminController');

// Ana depo, alt depo ve market örnekleri
const anaDepo = new AnaDepo(200);
const altDepo = new AltDepo(anaDepo, 50);
const market = new Market(altDepo, 10);  // 10 birim stoklu market

// Market stok durumunu döndürme
router.get('/stock', protect, (req, res) => {
    res.json({ stock: market.stock });
});

// Market stoğuna ürün ekleme
router.post('/add-stock', protect, (req, res) => {
    const { amount } = req.body;
    if (amount && amount > 0) {
        const addedStock = market.addStock(amount);
        res.send(`${addedStock} birim ürün markete eklendi güncel stok: ${market.stock}`);
    } else {
        res.status(400).send("Geçersiz miktar. Pozitif bir sayı girin.");
    }
});

// Marketten ürün çıkarma (satış yapma)
router.post('/sell', protect, (req, res) => {
    const { amount } = req.body;
    if (amount && amount > 0) {
        const soldAmount = market.sellProduct(amount);
        if (soldAmount > 0) {
            res.send(`${soldAmount} ürün satıldı ve stok durumu güncellendi. Güncel stok: ${market.stock}`);
        } else {
            res.status(400).send("Yeterli stok yok.");
        }
    } else {
        res.status(400).send("Geçersiz miktar. Pozitif bir sayı girin.");
    }
});

module.exports = router;
