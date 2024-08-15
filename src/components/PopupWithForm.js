import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super({ popupSelector });
    this._handleSubmit = submitHandler;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._data = {};
    this._submitButton = this._popupForm.querySelector(".modal__submit");
  }

  _getInputValues() {
    // Collect data from all the input fields and return it as an object.
    // This data should then be passed to the submission handler as an argument.
    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    });

    return this._data;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      // if isLoading is true
      // change button text to "Submitting..."
      this._submitButton.textContent = "Submitting...";
    } else {
      // else change the text back to "Submit"
      this._submitButton.textContent = "Save";
    }
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
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
    this._popupForm.addEventListener("submit", (evt) => {
      // prevent default submit behavior
      evt.preventDefault();

      this._renderLoading(true);

      const data = this._getInputValues();

      this._handleSubmit(data)
        .then(() => {
          // close popup and reset form
          this.close();
          this.reset();
        })
        .finally(() => {
          this._renderLoading(false);
        });
    });

    // call parents setEventListeners method
    super.setEventListeners();
  }

  reset() {
    this._popupForm.reset();
  }
}
