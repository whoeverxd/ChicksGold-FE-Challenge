import { customElement } from 'aurelia';

@customElement('app-footer')
export class AppFooter {
    year = new Date().getFullYear();
}