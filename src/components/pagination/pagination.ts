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
    // Mostrar todas si son pocas, o usar extremos y elipsis si son muchas.
    const total = this.totalPages;
    const current = this.page;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Cerca del inicio: 1 2 3 4 ... total
    if (current <= 4) {
      const start = [1, 2, 3, 4].filter(n => n <= total);
      return [...start, '...', total];
    }

    // Cerca del final: 1 ... total-3 total-2 total-1 total
    if (current >= total - 3) {
      const tail = [total - 3, total - 2, total - 1, total].filter(n => n >= 1);
      return [1, '...', ...tail];
    }

    // En medio: 1 ... current-1 current current+1 ... total
    return [1, '...', current - 1, current, current + 1, '...', total];
  }

  changePage(p: number | string) {
    if (typeof p !== 'number' || p < 1 || p > this.totalPages || p === this.page) return;
    this.pageChange?.(p);
  }
}
