import { customElement, bindable } from 'aurelia';
import './toolbar.css';

@customElement('toolbar')
export class Toolbar {
  @bindable games = [];
  @bindable priceOptions = [];
  @bindable typeOptions = [];
  @bindable selectedGame = '';
  @bindable selectedPrice = '';
  @bindable selectedType = '';
  @bindable search = '';
  @bindable filtersChange: (filters: any) => void;

  isGameOpen = false;
  isPriceOpen = false;
  isTypeOpen = false;

  selectGame(game: string) {
    this.selectedGame = game;
    this.isGameOpen = false;
    this.emitChange();
  }
  selectPrice(price: string) {
    this.selectedPrice = price;
    this.isPriceOpen = false;
    this.emitChange();
  }
  selectType(type: string) {
    this.selectedType = type;
    this.isTypeOpen = false;
    this.emitChange();
  }
  onSearch() {
    this.emitChange();
  }
  emitChange() {
    if (this.filtersChange) {
      this.filtersChange({
        game: this.selectedGame,
        price: this.selectedPrice,
        type: this.selectedType,
        search: this.search
      });
    }
  }
}
