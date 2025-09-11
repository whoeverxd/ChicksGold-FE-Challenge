import { customElement, bindable } from 'aurelia';
import template from './category-navigation.html';

export interface Category {
  name: string;
  isOpen?: boolean;
  // Puedes agregar subcategorías, links, etc.
}

@customElement({ name: 'category-navigation', template })
export class CategoryNavigation {
  @bindable categories: Category[] = [
    { name: 'CURRENCY' },
    { name: 'ITEMS' },
    { name: 'ACCOUNTS' },
    { name: 'SERVICES' },
    { name: 'SWAP' },
    { name: 'SELL' },

  ];

  open(cat: Category) {
    this.categories.forEach(c => c.isOpen = false);
    cat.isOpen = true;
  }
  close(cat: Category) {
    cat.isOpen = false;
  }
}
