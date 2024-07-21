export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    // this.setEventListeners();
  }

  close() {
    //closes popup
    this._popupElement.classList.remove("modal_opened");

    // Remove event listener to close modal on press of "ESC" key
    document.removeEventListener("keydown", this._handleEscapeClose);

    // Remove event listener to close modal when the overlay is clicked
    window.removeEventListener("click", this._handleOutsideClick);
  }

  _handleEscapeClose(evt) {
    // console.log(evt);
    console.log(this);

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

    // Add event listener to close modal on press of "ESC" key
    document.addEventListener("keydown", this._handleEscapeClose.bind(this));

    // listener to close modal when the overlay is clicked
    window.addEventListener("click", this._handleOutsideClick.bind(this));
  }
}
