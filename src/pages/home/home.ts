import { customElement } from 'aurelia';


@customElement('home')
export class Home {
	page = 1;
	pageSize = 10;
	products = [];
	filteredProducts = [];
	constructor() {
		console.log('Home component loaded');
	}
	async attached() {
		const response = await fetch('/src/data/productos.json');
		this.products = await response.json();
		this.filteredProducts = this.products;
		console.log(this.products);
	}
	get pagedItems() {
		const start = (this.page - 1) * this.pageSize;
		return this.filteredProducts.slice(start, start + this.pageSize);
	}
}
