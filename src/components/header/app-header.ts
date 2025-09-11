import { customElement } from 'aurelia';
import { CartIcon } from './cart-icon';
import { CurrencySelector } from './currency-selector';
import { CategoryNavigation } from './category-navigation';

@customElement('app-header')
export class AppHeader {
    public static dependencies = [CartIcon, CurrencySelector, CategoryNavigation];
    title = "Mi Proyecto Aurelia";

    onLogoClick() {
        window.location.href = '/';
    }
}