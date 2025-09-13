import { customElement, bindable } from 'aurelia';

const template = `<template>
  <ul class="main-categories-list">
    <li repeat.for="cat of categories" class="main-category-item">
  <button class="main-category-btn" class.bind="cat.isOpen ? 'open' : ''" type="button" click.trigger="cat.isOpen = !cat.isOpen">
        <span>\${cat.name}</span>
        <svg class="main-category-arrow" aria-expanded.bind="cat.isOpen" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div if.bind="cat.isOpen" class="main-category-dropdown">
        <div class="main-category-dropdown-content">
          <!-- Aquí puedes renderizar subcategorías, links, etc. -->
          <span class="dropdown-placeholder">Contenido de \${cat.name}</span>
        </div>
      </div>
    </li>
  </ul>
</template>`;

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
