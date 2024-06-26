//// Configuration Object ////
const configObj = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit-inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

//// Form Validation ////
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    // If NOT (!), show the error element
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    // If it's valid, hide the error element
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    // hasInvalidInput returns true

    return !inputElement.validity.valid;
  });
};

const enableButton = (button, inactiveButtonClass) => {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // If at least one input is invalid
  if (hasInvalidInput(inputList, inactiveButtonClass)) {
    // make the button inactive
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    // otherwise, make it active
    enableButton(buttonElement, inactiveButtonClass);
  }
};

const setInputEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  // Make an array of the input fields inside the form
  const inputList = [...formElement.querySelectorAll(inputSelector)]; // use spread operator to convert nodes list into an array
  // Find form submit button
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // Disable submit button on page load if fields are empty
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  // Iterate over the array
  inputList.forEach((inputElement) => {
    // add the input event handler to each field
    inputElement.addEventListener("input", () => {
      // Call checkInputValidity() inside the callback
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );

      // Call toggleButtonState() passing and array of inputs and a button
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (obj) => {
  const formSelector = obj.formSelector;
  const inputSelector = obj.inputSelector;
  const submitButtonSelector = obj.submitButtonSelector;
  const inactiveButtonClass = obj.inactiveButtonClass;
  const inputErrorClass = obj.inputErrorClass;
  const errorClass = obj.errorClass;

  // find all forms and make an array
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Iterate over array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // cancel default behavior for each form
      evt.preventDefault();
    });

    // call setInputEventListeners() on each form
    setInputEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

////  Enable Form Validation ///
enableValidation(configObj);
