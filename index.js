const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Route dosyalarını dahil et
const anaDepoRoutes = require('./routes/anaDepoRoutes');
const altDepoRoutes = require('./routes/altDepoRoutes');
const marketRoutes = require('./routes/marketRoutes');
const adminRoutes = require('./routes/adminRoutes');

// MongoDB bağlantısı
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('Veritabanına bağlandı'))
    .catch((error) => console.error('Bağlantı hatası:', error));

// Middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route'ları tanımla
app.use('/api/ana-depo', anaDepoRoutes);
app.use('/api/alt-depo', altDepoRoutes);
app.use('/api/market', marketRoutes); // Market routes dahil edildi
app.use('/api/admin', adminRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Uygulama ${PORT} portunda çalışıyor`));
