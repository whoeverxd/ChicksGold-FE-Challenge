import { customElement } from 'aurelia';
import './app-footer.css';

@customElement('app-footer')
export class AppFooter {
    year = new Date().getFullYear();
}