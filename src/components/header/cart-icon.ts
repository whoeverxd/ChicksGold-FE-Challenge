
import { customElement, bindable } from 'aurelia';
import template from './cart-icon.html';
import './cart-icon.css';

@customElement('cart-icon')
export class CartIcon {
    @bindable count = 0;
}
