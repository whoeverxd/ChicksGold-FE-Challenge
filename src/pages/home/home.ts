import { customElement } from 'aurelia';

@customElement('home')

export class Home {
	page = 1;
	pageSize = 10;
	products = [];
	filteredProducts = [];
	sort = 'Featured';
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
		// Dynamically set typeOptions from products
		this.typeOptions = Array.from(new Set(this.products.map(p => p.type))).filter(Boolean);
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
			result = result.filter(p => p.gameId == this.selectedGame);
		}
		if (this.selectedType && this.selectedType !== 'All') {
			result = result.filter(p => p.type === this.selectedType);
		}
		if (this.selectedPrice && this.selectedPrice !== 'All') {
			if (this.selectedPrice === '< $50') result = result.filter(p => p.precio < 50);
			else if (this.selectedPrice === '$50 - $100') result = result.filter(p => p.precio >= 50 && p.precio <= 100);
			else if (this.selectedPrice === '$100+') result = result.filter(p => p.precio > 100);
		}
			if (this.search) {
				const words = this.search.toLowerCase().split(/\s+/).filter(Boolean);
				result = result.filter(p => {
					const nombre = p.nombre.toLowerCase();
					const descripcion = p.descripcion.toLowerCase();
					return words.some(word => nombre.includes(word) || descripcion.includes(word));
				});
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
	onPageChange = (newPage: number) => {
		this.page = newPage;
	}
}
