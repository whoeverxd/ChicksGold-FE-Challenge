import { AppHeader } from './components/header/app-header';
import { AppFooter } from './components/footer/app-footer';

import { CartIcon } from './components/header/cart-icon';
import { CurrencySelector } from './components/header/currency-selector';

export class MyApp {
  public static dependencies = [AppHeader, AppFooter, CartIcon, CurrencySelector];
}
