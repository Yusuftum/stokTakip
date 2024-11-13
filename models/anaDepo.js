class AnaDepo {
    // AnaDepo sınıfının constructor fonksiyonu, başlangıç stok miktarını alır
    constructor(stock) {
        this.stock = stock;  // Ana deponun mevcut stok miktarı
    }

    // Stok sağlama fonksiyonu
    provideStock(amount) {
        // Eğer ana depoda yeterli stok varsa, talep edilen miktar kadar stok sağlar
        if (this.stock >= amount) {
            this.stock -= amount;  // Sağlanan miktar kadar stok düşürülür
            return amount;  // Sağlanan miktar geri döndürülür
        }
        return 0;  // Ana depoda yeterli stok yoksa 0 döndürülür
    }
}

module.exports = AnaDepo;  // AnaDepo sınıfını dışa aktarıyoruz
