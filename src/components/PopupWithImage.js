import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._imageCaption = this._popupElement.querySelector(".modal__title");
  }

  open({ name, link, caption }) {
    // set the image's src and alt
    this._imageElement.src = link;
    this._imageElement.alt = name;
    // set the caption's text content
    if (caption === undefined) {
      this._imageCaption.textContent = name;
    } else {
      this._imageCaption.textContent = caption;
    }

    super.open();
  }
}
