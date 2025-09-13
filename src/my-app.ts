

import { AppHeader } from './components/header/app-header';
import { AppFooter } from './components/footer/app-footer';
import { PaymentMethods } from './components/payment-methods/payment-methods';
import { ToastNotifications } from './components/toast/toast-notifications';
import { Pagination } from './components/pagination/pagination';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { LoginPage } from './pages/login/login';
import { CartService } from './services/cart-service';
import { CurrencyService } from './services/currency-service';


import { route } from '@aurelia/router';

@route({
  routes: [
    { path: '', component: Home, title: 'Home' },
    { path: 'cart', component: Cart, title: 'Cart' },
    { path: 'login', component: LoginPage, title: 'Sign in' },
  ]
})
export class MyApp {
  static dependencies = [AppHeader, AppFooter, PaymentMethods, Pagination, Home, Cart, LoginPage, CartService, CurrencyService, ToastNotifications];
  constructor(private cartService: CartService) {}
  get cartCount() {
    return this.cartService.count;
  }
}
