import { customElement, IEventAggregator, IDisposable, inject } from 'aurelia';
import { IRouter } from '@aurelia/router';
import { CartService } from '../../services/cart-service';

import { CartIcon } from './cart-icon';
import { CurrencySelector } from './currency-selector';
import { CategoryNavigation } from './category-navigation';
import './app-header.css';
import hamburgerPngUrl from '../../assets/icons/Hamburger_icon.png?url';
import logoSvgUrl from '../../assets/logo/chicks-logo-large.svg?url';

@customElement('app-header')
@inject(CartService, IEventAggregator, IRouter)
export class AppHeader {
  public static dependencies = [CartIcon, CurrencySelector, CategoryNavigation];
  cartCount = 0;
  private sub?: IDisposable;
  isMobileMenuOpen = false;
  logoUrl = logoSvgUrl;
  hamburgerUrl = hamburgerPngUrl;

  constructor(private cart: CartService, private ea: IEventAggregator, private router: IRouter) {}

  binding() {

    this.cartCount = this.cart.count;

    this.sub = this.ea.subscribe('cart:changed', (p: { count: number }) => {
      this.cartCount = p.count ?? 0;
      console.log('Cart updated, new count:', this.cartCount);
    });
  }

  detaching() {
    this.sub?.dispose();
    window.removeEventListener('keydown', this.onKeyDown);
    // Ensure scroll is re-enabled if detaching while open
    try { document.body.style.overflow = ''; } catch {}
  }

  // Mobile menu controls
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.updateBodyScroll();
  }
  private updateBodyScroll() {
    try {
      const body = document.body;
      if (!body) return;
      if (this.isMobileMenuOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    } catch {}
  }

  attached() {
    // Close drawer on Escape
    window.addEventListener('keydown', this.onKeyDown);
  }
  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  };

  // Explicit navigation to avoid any anchor attribute ambiguity
  goToLogin(e?: Event) {
    if (e) e.preventDefault();
    if (this.isMobileMenuOpen) this.closeMobileMenu();
    void this.router.load('/login');
  }
}