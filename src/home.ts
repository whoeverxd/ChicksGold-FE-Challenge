import { customElement } from 'aurelia';

@customElement('home')
export class Home {
	constructor() {
		console.log('Home component loaded');
	}
}
