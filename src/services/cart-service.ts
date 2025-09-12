import { singleton, observable } from 'aurelia';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

@singleton()
export class CartService {
  @observable() items: CartItem[] = [];

  get count() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  add(item: CartItem, qty: number = 1) {
    const found = this.items.find(i => i.id === item.id);
    if (found) {
      found.qty += qty;
    } else {
      this.items.push({ ...item, qty });
    }
  }

  clear() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }
}
