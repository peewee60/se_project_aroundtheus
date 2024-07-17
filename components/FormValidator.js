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

  _showInputError(inputElement) {
    console.log(`Showing error on ${inputElement.id}`);
    console.log(inputElement);

    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    console.log(`Logging Error Element: ${errorElement}`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    console.log(`Hiding error on ${inputElement.id}`);
    console.log(inputElement);

    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._formElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    console.log("Checking input validity");
    console.log(inputElement);
    console.log(inputElement.validity.valid);

    if (!inputElement.validity.valid) {
      // If NOT (!) valid, show the error element
      this._showInputError(inputElement);
    } else {
      // If it's valid, hide the error element
      this._hideInputError(inputElement);
    }
  }

  _setInputEventListeners() {
    // Disable submit button on page load if fields are empty
    this.toggleButtonState();

    // Iterate over the array
    this._inputList.forEach((inputElement) => {
      //  console.log(inputElement.id);

      // add the input event handler to each field
      inputElement.addEventListener("input", () => {
        // Call checkInputValidity() inside the callback
        this._checkInputValidity(inputElement);

        // Call toggleButtonState() passing and array of inputs and a button
        this.toggleButtonState();
      });
    });
  }

  toggleButtonState() {
    // If at least one input is invalid
    if (this._hasInvalidInput()) {
      // make the button inactive
      this._disableButton();
    } else {
      // otherwise, make it active
      this._enableButton();
    }
  }

  resetValidation() {
    this.toggleButtonState(); // toggle the submit button

    // loop through input elements
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // clear error messages for input field
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
