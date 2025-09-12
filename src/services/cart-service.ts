import { singleton, IEventAggregator } from 'aurelia';

export interface CartItem {
  id: string;
  qty?: number;
}

@singleton()
export class CartService {
  static inject = [IEventAggregator];
  private items: CartItem[] = [];

  constructor(private ea: IEventAggregator) {}

  get count(): number {
    // Suma todas las cantidades de los items
    return this.items.reduce((total, item) => total + (item.qty ?? 1), 0);
  }

  getItems(): CartItem[] {
    return this.items;
  }

  add(item: CartItem, qty = 1): void {
    const existing = this.items.find(x => x.id === item.id);
    if (existing) {
      existing.qty = (existing.qty ?? 1) + qty;
    } else {
      this.items.push({ ...item, qty });
    }
    this.notify();
  }

  remove(id: string, qty = 1): void {
    const idx = this.items.findIndex(x => x.id === id);
    if (idx > -1) {
      const it = this.items[idx];
      const newQty = (it.qty ?? 1) - qty;
      if (newQty > 0) it.qty = newQty;
      else this.items.splice(idx, 1);
      this.notify();
    }
  }

  clear(): void {
    this.items = [];
    this.notify();
  }

  private notify(): void {
    this.ea.publish('cart:changed', { count: this.count, items: this.items });
  }
}