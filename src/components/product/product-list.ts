import { customElement, bindable } from 'aurelia';
import './product-list.css';

@customElement('product-list')
export class ProductList {
  @bindable products: any[] = [];
}
