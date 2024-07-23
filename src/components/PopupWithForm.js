import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super({ popupSelector });
    this._handleSubmit = submitHandler;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._data = {};
  }

  _getInputValues() {
    // Collect data from all the input fields and return it as an object.
    // This data should then be passed to the submission handler as an argument.
    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    });

    return this._data;
  }

  setInputValues(data) {
    // insert data into input fields
    this._inputList.forEach((input) => {
      // set value using name of input as key to match data
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    // add submit listener
    this._popupForm.addEventListener("submit", this._handleSubmit);
    // call parents setEventListeners method
    super.setEventListeners();
  }

  reset() {
    this._popupForm.reset();
  }
}
