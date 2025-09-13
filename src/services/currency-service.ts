import { IEventAggregator, inject } from 'aurelia';

export const CURRENCY_CHANGED = 'currency:changed';

@inject(IEventAggregator)
export class CurrencyService {
  public currency: string = 'USD';

  constructor(private ea: IEventAggregator) {
    const saved = localStorage.getItem('selectedCurrency');
    if (saved) this.currency = saved;
  }

  setCurrency(code: string) {
    if (!code || code === this.currency) return;
    this.currency = code;
    try { localStorage.setItem('selectedCurrency', code); } catch {}
    this.ea.publish(CURRENCY_CHANGED, { currency: code });
  }
}
