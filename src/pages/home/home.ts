import { customElement } from 'aurelia';

@customElement('home')
export class Home {
	page = 1;
	pageSize = 10;
	products = [];
	filteredProducts = [];
	sort = 'Featured';

	// Toolbar filter state
	games = [];
	priceOptions = ['< $50', '$50 - $100', '$100+'];
	typeOptions = ['Gold', 'Item', 'Account'];
	selectedGame = 'All';
	selectedPrice = 'All';
	selectedType = 'All';
	search = '';

	constructor() {
		console.log('Home component loaded');
	}

	async attached() {
		const response = await fetch('/src/data/productos.json');
		this.products = await response.json();
		this.filteredProducts = this.products;
		// Populate games from products
		this.games = Array.from(new Set(this.products.map(p => p.game?.name))).filter(Boolean);
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

	onFiltersChange = (filters: any) => {
		this.selectedGame = filters.game;
		this.selectedPrice = filters.price;
		this.selectedType = filters.type;
		this.search = filters.search;
		this.applyFilters();
	};

	applyFilters() {
		let result = this.products;
		if (this.selectedGame && this.selectedGame !== 'All') {
			result = result.filter(p => p.game?.name === this.selectedGame);
		}
		if (this.selectedType && this.selectedType !== 'All') {
			result = result.filter(p => (p.type || 'Gold') === this.selectedType);
		}
		if (this.selectedPrice && this.selectedPrice !== 'All') {
			if (this.selectedPrice === '< $50') result = result.filter(p => p.precio < 50);
			else if (this.selectedPrice === '$50 - $100') result = result.filter(p => p.precio >= 50 && p.precio <= 100);
			else if (this.selectedPrice === '$100+') result = result.filter(p => p.precio > 100);
		}
		if (this.search) {
			const s = this.search.toLowerCase();
			result = result.filter(p => p.nombre.toLowerCase().includes(s) || p.descripcion.toLowerCase().includes(s));
		}
		this.filteredProducts = result;
		this.applySort();
		this.page = 1;
	}

	applySort() {
		if (this.sort === 'Price: Low to High') {
			this.filteredProducts = [...this.filteredProducts].sort((a, b) => a.precio - b.precio);
		} else if (this.sort === 'Price: High to Low') {
			this.filteredProducts = [...this.filteredProducts].sort((a, b) => b.precio - a.precio);
		} else if (this.sort === 'Stock') {
			this.filteredProducts = [...this.filteredProducts].sort((a, b) => b.stock - a.stock);
		} else if (this.sort === 'Name') {
			this.filteredProducts = [...this.filteredProducts].sort((a, b) => a.nombre.localeCompare(b.nombre));
		}
		// else keep as is (Featured)
	}
}
