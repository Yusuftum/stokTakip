const Admin = require('../models/admin');  // Admin modelini import et

// Admin kaydını yapan fonksiyon
exports.registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    // Verilerin eksik olup olmadığını kontrol et
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // E-posta daha önce kaydedilmiş mi kontrol et
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Yeni admin kaydını oluştur
        const admin = new Admin({ username, email, password });
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
