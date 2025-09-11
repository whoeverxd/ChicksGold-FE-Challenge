
import { customElement } from 'aurelia';
import template from './currency-selector.html';

@customElement({ name: 'currency-selector', template })
export class CurrencySelector {
	isOpen = false;
	selectedCurrency = 'USD';
	currencies = ['USD', 'EUR', 'GBP', 'AUD', 'BRL', 'ARS', 'CLP', 'COP', 'MXN'];
	closeTimeout: any = null;

	constructor() {
		const saved = localStorage.getItem('selectedCurrency');
		if (saved && this.currencies.includes(saved)) {
			this.selectedCurrency = saved;
		}
	}

	open() {
		if (this.closeTimeout) {
			clearTimeout(this.closeTimeout);
			this.closeTimeout = null;
		}
		this.isOpen = true;
	}
	close() {
		this.closeTimeout = setTimeout(() => {
			this.isOpen = false;
			this.closeTimeout = null;
		}, 200);
	}
	selectCurrency(currency: string) {
		this.selectedCurrency = currency;
		localStorage.setItem('selectedCurrency', currency);
		this.isOpen = false;
	}
}
