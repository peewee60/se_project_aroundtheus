import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super({ popupSelector });
    this._handleSubmit = submitHandler;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._data = {};
    this._submitButton = this._popupForm.querySelector(".modal__submit");
    this._submiButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    // Collect data from all the input fields and return it as an object.
    // This data should then be passed to the submission handler as an argument.
    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    });

    return this._data;
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      // if isLoading is true
      // change button text to "Submitting..."
      this.setButtonText(loadingText);
    } else {
      // else change the text back to "Submit"
      this.setButtonText(this._submiButtonText);
    }
  }

  setInputValues(data) {
    console.log(`Set Input Values: data`);
    console.log(data);

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

      this.renderLoading(true);

      const data = this._getInputValues();

      console.log(data);
      this._handleSubmit(data);
      // .then(() => {
      //   // close popup and reset form
      //   this.close();
      //   this.reset();
      // })
      // .finally(() => {
      //   this.renderLoading(false);
      // });
    });

    // call parents setEventListeners method
    super.setEventListeners();
  }

  reset() {
    this._popupForm.reset();
  }
}
