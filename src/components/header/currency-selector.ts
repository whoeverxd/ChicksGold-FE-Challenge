
import { customElement, inject } from 'aurelia';
import { CurrencyService } from '../../services/currency-service';

const template = `<template>
	<div class="currency-selector-wrapper">
		<button class="currency-btn" type="button" click.trigger="isOpen = !isOpen">
			<span class="currency-label">\${selectedCurrency}</span>
			<svg class="currency-arrow" aria-expanded.bind="isOpen" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</button>
		<div if.bind="isOpen" class="currency-popup">
			<ul>
				<li repeat.for="currency of currencies" class="currency-option" click.trigger="selectCurrency(currency)">
					\${currency}
				</li>
			</ul>
		</div>
	</div>
</template>`;

@customElement({ name: 'currency-selector', template })
@inject(CurrencyService)
export class CurrencySelector {
	isOpen = false;
	selectedCurrency = 'USD';
	currencies = ['USD', 'EUR', 'GBP', 'AUD', 'BRL', 'ARS', 'CLP', 'COP', 'MXN'];
	closeTimeout: any = null;

	constructor(private currencyService: CurrencyService) {
		const saved = localStorage.getItem('selectedCurrency');
		if (saved && this.currencies.includes(saved)) {
			this.selectedCurrency = saved;
			this.currencyService.setCurrency(saved);
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
		this.currencyService.setCurrency(currency);
		this.isOpen = false;
	}
}
