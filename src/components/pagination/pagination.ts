import { customElement, bindable } from 'aurelia';
import './pagination.css';

@customElement('pagination')
export class Pagination {
  @bindable page = 1;
  @bindable pageSize = 10;
  @bindable total = 0;
  @bindable pageChange: (page: number) => void;

  get totalPages() {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get pages() {
    // Lógica simple: mostrar todas las páginas si son pocas, o recortar con ... si son muchas
    const total = this.totalPages;
    const current = this.page;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages = [];
    pages.push(1);
    if (current > 4) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 3) pages.push('...');
    pages.push(total);
    return pages;
  }

  changePage(p: number | string) {
    if (typeof p !== 'number' || p < 1 || p > this.totalPages || p === this.page) return;
    this.pageChange?.(p);
  }
}
