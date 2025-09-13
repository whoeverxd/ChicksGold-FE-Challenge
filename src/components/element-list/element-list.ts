import { customElement, bindable } from 'aurelia';
import './element-list.css';
import filterIconUrl from '../../assets/icons/filter.svg?url';

@customElement('element-list')
export class ElementList {
    @bindable items = [];
    @bindable page = 1;
    @bindable pageSize = 10;
    @bindable total = 0;
    @bindable sortChange: (sort: string) => void;
    @bindable pageChange: (page: number) => void;

    isSortOpen = false;
    selectedSort = 'Featured';
    sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Stock', 'Name'];
    filterIconUrl = filterIconUrl;

    selectSort(option: string) {
        this.selectedSort = option;
        this.isSortOpen = false;
        if (this.sortChange) {
            this.sortChange(option);
        }
    }

    onPageChange = (page: number) => {
        if (this.pageChange) {
            this.pageChange(page);
        }
    }
}
