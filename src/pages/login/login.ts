import { customElement } from 'aurelia';
import './login.css';
import template from './login.html?raw';

@customElement({ name: 'login-page', template })
export class LoginPage {
  email = '';
  password = '';
  isLoading = false;
  error = '';

  async signIn(e: Event) {
    e.preventDefault();
    this.error = '';
    this.isLoading = true;
    try {
      // Fake delay to simulate API
      await new Promise(r => setTimeout(r, 600));
      if (!this.email || !this.password) {
        throw new Error('Please enter email and password');
      }
      // TODO: Integrate with real auth
      alert(`Signed in as ${this.email}`);
    } catch (err: any) {
      this.error = err?.message ?? 'Error signing in';
    } finally {
      this.isLoading = false;
    }
  }
}
