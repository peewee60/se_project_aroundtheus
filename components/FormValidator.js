export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    // Make an array of the input fields inside the form
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ]; // use spread operator to convert nodes list into an array

    // Find form submit button
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // If the field is invalid, the callback will return true.
      // The method will then stop, and hasInvalidInput() function will return true
      // hasInvalidInput returns true

      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    // If at least one input is invalid
    if (this._hasInvalidInput()) {
      // make the button inactive
      this._disableButton();
    } else {
      // otherwise, make it active
      this._enableButton();
    }
  }

  _showInputError() {
    console.log(this._currentInputElement);

    this._errorElement = this._formElement.querySelector(
      `.${this._currentInputElement.id}-error`
    );
    this._currentInputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError() {
    console.log(this._currentInputElement);

    this._errorElement = this._formElement.querySelector(
      `.${this._currentInputElement.id}-error`
    );
    this._currentInputElement.classList.remove(this._inputErrorClass);
    this._formElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(evt) {
    this._currentInputElement = evt.target;
    console.log("Checking input validity");

    // if (!this._inputElement.validity.valid)
    console.log(evt);
    if (!this._currentInputElement.validity.valid) {
      // If NOT (!), show the error element
      console.log(`Showing error on ${this._inputElement.id}`);
      this._showInputError();
    } else {
      // If it's valid, hide the error element
      console.log(`Hiding error on ${this._inputElement.id}`);
      this._hideInputError();
    }
  }

  _setInputEventListeners() {
    // Disable submit button on page load if fields are empty
    this._toggleButtonState();

    // Iterate over the array
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;

      // add the input event handler to each field
      this._inputElement.addEventListener("input", (evt) => {
        // Call checkInputValidity() inside the callback
        this._checkInputValidity(evt);

        // Call _toggleButtonState() passing and array of inputs and a button
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState(); // toggle the submit button

    // clear error messages for each input field
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      // cancel default behavior for each form
      evt.preventDefault();
    });

    // call setInputEventListeners() on each form
    this._setInputEventListeners();
  }
}
