export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._data = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._data.forEach((item) => {
      document
        .querySelector(this._containerSelector)
        .append(this._renderer(item));
    });
  }

  addItem(element) {
    document.querySelector(this._containerSelector).prepend(element);
  }
}
