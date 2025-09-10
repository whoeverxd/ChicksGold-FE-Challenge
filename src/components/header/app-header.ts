import { customElement } from 'aurelia';

@customElement('app-header')
export class AppHeader {
    title = "Mi Proyecto Aurelia";

    onLogoClick() {
        window.location.href = '/';
    }
}