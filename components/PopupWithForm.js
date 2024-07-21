import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // Collect data from all the input fields and return it as an object.
    // This data should then be passed to the submission handler as an argument.
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._data = {};

    this._inputs.forEach((input) => {
      data[input.id] = input.value;
    });

    return this._data;
  }

  setEventListeners() {
    // add submit listener
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
    // call parents setEventListeners method
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
