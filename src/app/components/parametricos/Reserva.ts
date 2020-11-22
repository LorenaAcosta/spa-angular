export class ReservaService {
    items = [];

    addToCart(product) {
        this.items.push(product);
      }

      getItems() {
        return this.items;
      }

      clearCart() {
        this.items = [];
        return this.items;
      }
  }