
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

  onQtyInput(event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    if (!isNaN(val) && val > 0) {
      this.qty = val;
    } else {
      this.qty = 1;
    }
  }

  addToCart() {
    if (!this.product) return;
    const qty = Number.isFinite(this.qty) && this.qty > 0 ? this.qty : 1;
    this.cartService.add({
      id: this.product.id,
      name: this.product.nombre,
      price: this.product.precio,
      image: this.product.imagen,
      qty
    }, qty);
  }
}
