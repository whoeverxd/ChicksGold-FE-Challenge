
import { customElement, bindable, inject } from 'aurelia';
import { CartService } from '../../services/cart-service';
import './product-card.css';

@customElement('product-card')
@inject(CartService)
export class ProductCard {
  @bindable product: any;
  qty = 1;

  constructor(private cartService: CartService) {}

  increaseQty() {
    this.qty++;
  }

  decreaseQty() {
    if (this.qty > 1) this.qty--;
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.add({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      qty: this.qty
    }, this.qty);
  }
}
