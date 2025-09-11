
import { AppHeader } from './components/header/app-header';
import { AppFooter } from './components/footer/app-footer';
import { CartIcon } from './components/header/cart-icon';
import { CurrencySelector } from './components/header/currency-selector';
import { CategoryNavigation } from './components/header/category-navigation';
import { PaymentMethods } from './components/payment-methods/payment-methods';
export class MyApp {
  public static dependencies = [AppHeader, AppFooter, CartIcon, CurrencySelector, CategoryNavigation, PaymentMethods]; 
}
