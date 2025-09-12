import { customElement, IEventAggregator, IDisposable, inject } from 'aurelia';
import { CartService } from '../../services/cart-service';

import { CartIcon } from './cart-icon';
import { CurrencySelector } from './currency-selector';
import { CategoryNavigation } from './category-navigation';

@customElement('app-header')
@inject(CartService, IEventAggregator)
export class AppHeader {
  public static dependencies = [CartIcon, CurrencySelector, CategoryNavigation];
  cartCount = 0;
  private sub?: IDisposable;

  constructor(private cart: CartService, private ea: IEventAggregator) {}

  binding() {

    this.cartCount = this.cart.count;

    this.sub = this.ea.subscribe('cart:changed', (p: { count: number }) => {
      this.cartCount = p.count ?? 0;
      console.log('Cart updated, new count:', this.cartCount);
    });
  }

  detaching() {
    this.sub?.dispose();
  }
}