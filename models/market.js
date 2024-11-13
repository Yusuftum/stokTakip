class Market {
    // Market sınıfının constructor fonksiyonu, markete ait alt depo ve stok bilgilerini alır
    constructor(altDepo, stock) {
        this.altDepo = altDepo;  // Marketin bağlı olduğu alt depo
        this.stock = stock;  // Marketin mevcut stoğu
    }

    // Ürün satışı fonksiyonu
    sellProduct(amount) {
        if (this.stock >= amount) {
            // Market stoğunda yeterli miktar varsa direkt azaltıyoruz
            this.stock -= amount;
            return amount;
        } else {
            // Yeterli değilse alt depodan gerekli miktarı alıyoruz
            const additionalStock = this.altDepo.supplyMarket(amount - this.stock);
            if (additionalStock > 0) {
                this.stock += additionalStock - amount;  // Gelen stoktan satış miktarını düş
                return amount;
            }
            return 0;  // Alt depoda da yeterli stok yoksa 0 döndür
        }
    }

    // Market stoğuna yeni ürün ekleme fonksiyonu
    addStock(amount) {
        // Alt depodan ürün talep edilmesi
        const stockFromAltDepo = this.altDepo.supplyMarket(amount);

        // Eğer alt depodan ürün sağlanabiliyorsa, market stoğu artırılır
        if (stockFromAltDepo > 0) {
            this.stock += stockFromAltDepo;  // Market stoğuna eklenen miktar eklenir
            return stockFromAltDepo;  // Eklenen stok miktarını geri döndürür
        }

        return 0;  // Alt depoda yeterli stok yoksa, ekleme yapılmaz
    }
}

module.exports = Market;
