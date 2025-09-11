

import { AppHeader } from './components/header/app-header';
import { AppFooter } from './components/footer/app-footer';
import { PaymentMethods } from './components/payment-methods/payment-methods';
import { Pagination } from './components/pagination/pagination';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';


import { route } from '@aurelia/router';

@route({
  routes: [
    { path: '', component: Home, title: 'Home' },
    { path: 'cart', component: Cart, title: 'Cart' },
  ]
})
export class MyApp {
  static dependencies = [AppHeader, AppFooter, PaymentMethods, Pagination, Home, Cart];
}
