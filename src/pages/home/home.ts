import { customElement } from 'aurelia';


@customElement('home')

export class Home {
	page = 1;
	pageSize = 10;
	products = [];
	filteredProducts = [];
	sort = 'Featured';
	games = [];

	constructor() {
		console.log('Home component loaded');
	}

		async attached() {
			const response = await fetch('/src/data/productos.json');
			this.products = await response.json();
			this.filteredProducts = this.products;
			try {
				const gamesResponse = await fetch('/src/data/juegos.json');
				this.games = await gamesResponse.json();
				console.log('Games loaded:', this.games);
			} catch (e) {
				console.error('Error loading games:', e);
			}
			console.log(this.products);
		}

	get pagedItems() {
		const start = (this.page - 1) * this.pageSize;
		return this.filteredProducts.slice(start, start + this.pageSize);
	}

	onSortChange = (sort: string) => {
		this.sort = sort;
		this.applySort();
	};

	applySort() {
		if (this.sort === 'Price: Low to High') {
			this.filteredProducts = [...this.products].sort((a, b) => a.precio - b.precio);
		} else if (this.sort === 'Price: High to Low') {
			this.filteredProducts = [...this.products].sort((a, b) => b.precio - a.precio);
		} else if (this.sort === 'Stock') {
			this.filteredProducts = [...this.products].sort((a, b) => b.stock - a.stock);
		} else if (this.sort === 'Name') {
			this.filteredProducts = [...this.products].sort((a, b) => a.nombre.localeCompare(b.nombre));
		} else {
			this.filteredProducts = this.products;
		}
		this.page = 1;
	}
	onPageChange = (newPage: number) => {
		this.page = newPage;
	}  
}
