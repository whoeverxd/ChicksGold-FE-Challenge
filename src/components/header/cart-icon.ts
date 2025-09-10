import { customElement, bindable } from 'aurelia';
import template from './cart-icon.html';

@customElement({ name: 'cart-icon', template })
export class CartIcon {
    @bindable items: number = 0;

    onCartClick() {
        window.location.href = '/cart.html';
    }
}
