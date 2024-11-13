class AltDepo {
    // AltDepo sınıfının constructor fonksiyonu, ana depo ve stok miktarını alır
    constructor(anaDepo, stock) {
        this.anaDepo = anaDepo;  // Alt deponun bağlı olduğu ana depo
        this.stock = stock;  // Alt deponun mevcut stoğu
    }

    // Ana depodan ek stok talep etme fonksiyonu
    requestStock(amount) {
        // Eğer alt depodaki mevcut stok talep edilen miktardan azsa, ana depodan ek stok istenir
        if (this.stock < amount) {
            const additionalStock = this.anaDepo.provideStock(amount - this.stock);
            this.stock += additionalStock;  // Alınan ek stok, alt depoya eklenir
        }
    }

    // Marketin ihtiyacını karşılamak için stok sağlama fonksiyonu
    supplyMarket(amount) {
        this.requestStock(amount);  // Gerekirse ana depodan ek stok talep eder

        // Alt depoda yeterli stok varsa, belirtilen miktar sağlanır
        if (this.stock >= amount) {
            this.stock -= amount;  // Alt depodaki stok, talep edilen miktar kadar azaltılır
            return amount;  // Sağlanan stok miktarı döndürülür
        }
        return 0;  // Alt depoda yeterli stok yoksa 0 döndürülür
    }

    // Alt depoya yeni stok ekleme fonksiyonu
    addStock(amount) {
        if (amount > 0) {
            this.stock += amount;  // Alt depoya belirtilen miktar kadar stok eklenir
            return amount;  // Eklenen stok miktarını döndürür
        }
        return 0;  // Geçersiz miktar durumunda 0 döndürülür
    }
}

module.exports = AltDepo;  // AltDepo sınıfını dışa aktarıyoruz
