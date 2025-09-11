import { customElement, bindable } from 'aurelia';
import './element-list.css';

@customElement('element-list')
export class ElementList {
    @bindable items = [];
    @bindable page = 1;
    @bindable pageSize = 10;
    @bindable total = 0;
}
