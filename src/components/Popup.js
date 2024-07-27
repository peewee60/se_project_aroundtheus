export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");

    // Add event listener to close modal on press of "ESC" key
    document.addEventListener("keydown", this._handleEscapeClose);

    // listener to close modal when the overlay is clicked
    window.addEventListener("click", this._handleOutsideClick);
  }

  close() {
    //closes popup
    this._popupElement.classList.remove("modal_opened");
    // document.querySelector(".modal__opened").classList.remove("modal_opened");

    // Remove event listener to close modal on press of "ESC" key
    document.removeEventListener("keydown", this._handleEscapeClose);

    // Remove event listener to close modal when the overlay is clicked
    window.removeEventListener("click", this._handleOutsideClick);
  }

  _handleEscapeClose(evt) {
    // listens for escape button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOutsideClick(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners
    // listener for click on popup close button
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
