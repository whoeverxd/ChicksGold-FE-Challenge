import { customElement, IEventAggregator, IDisposable, inject } from 'aurelia';
import './toast-notifications.css';

interface Toast {
  id: number;
  message: string;
  timeout: number;
  state: 'enter' | 'visible' | 'leave';
}

@customElement('toast-notifications')
@inject(IEventAggregator)
export class ToastNotifications {
  toasts: Toast[] = [];
  private sub?: IDisposable;
  private nextId = 1;

  constructor(private ea: IEventAggregator) {}

  attached() {
    // Listen for cart:added events
    this.sub = this.ea.subscribe('cart:added', (p: { item: any; qty: number }) => {
      const name = p?.item?.name ?? 'Item';
      const qty = p?.qty ?? 1;
      this.show(`${qty} × ${name} added to cart`);
    });
  }

  detaching() {
    this.sub?.dispose();
  }

  show(message: string, timeout = 2500) {
    const id = this.nextId++;
    const toast: Toast = { id, message, timeout, state: 'enter' };
    this.toasts.push(toast);

    // enter animation, then visible, then auto-dismiss
    setTimeout(() => (toast.state = 'visible'));
    const hideAt = setTimeout(() => this.dismiss(toast), timeout);

    // Safety: remove timer if user closes manually
    (toast as any)._timer = hideAt;
  }

  dismiss(t: Toast) {
    if ((t as any)._timer) clearTimeout((t as any)._timer);
    t.state = 'leave';
    setTimeout(() => {
      this.toasts = this.toasts.filter(x => x.id !== t.id);
    }, 180);
  }
}
