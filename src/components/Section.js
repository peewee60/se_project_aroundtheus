export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._data = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
