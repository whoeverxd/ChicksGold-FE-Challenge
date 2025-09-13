
import { customElement, bindable, inject, IEventAggregator, IDisposable } from 'aurelia';
import { CartService } from '../../services/cart-service';
import { CURRENCY_CHANGED, CurrencyService } from '../../services/currency-service';
import './product-card.css';

@customElement('product-card')
@inject(CartService, CurrencyService, IEventAggregator)
export class ProductCard {
  @bindable product: any;
  qty = 1;
  currency = 'USD';
  private sub?: IDisposable;

  constructor(private cartService: CartService, private currencyService: CurrencyService, private ea: IEventAggregator) {}

  binding() {
    this.currency = this.currencyService.currency;
    this.sub = this.ea.subscribe(CURRENCY_CHANGED, (p: { currency: string }) => {
      this.currency = p.currency;
    });
  }

  detaching() {
    this.sub?.dispose();
  }

  get currencySymbol(): string {
    switch (this.currency) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'AUD': return 'A$';
      case 'BRL': return 'R$';
      case 'ARS': return 'ARS$';
      case 'CLP': return 'CLP$';
      case 'COP': return 'COP$';
      case 'MXN': return 'MX$';
      default: return '$'; // USD
    }
  }


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
