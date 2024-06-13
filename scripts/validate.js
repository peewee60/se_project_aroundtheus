const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  formElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // If NOT (!), show the error element
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // If it's valid, hide the error element
    hideInputError(formElement, inputElement);
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

const disableButton = (button) => {
  button.classList.add("modal__submit-inactive");
  button.disabled = true;
};

const enableButton = (button) => {
  button.classList.remove("modal__submit-inactive");
  button.disabled = false;
};

const toggleButtonState = (inputList, buttonElement) => {
  // If at least one input is invalid
  if (hasInvalidInput(inputList)) {
    // make the button inactive
    disableButton(buttonElement);
  } else {
    // otherwise, make it active
    enableButton(buttonElement);
  }
};

const setInputEventListeners = (formElement) => {
  // Make an array of the input fields inside the form
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  // Find form submit button
  const buttonElement = formElement.querySelector(".modal__submit");

  // Disable submit button on page load if fields are empty
  toggleButtonState(inputList, buttonElement);

  // Iterate over the array
  inputList.forEach((inputElement) => {
    // add the input event handler to each field
    inputElement.addEventListener("input", () => {
      // Call checkInputValidity() inside the callback
      checkInputValidity(formElement, inputElement);

      // Call toggleButtonState() passing and array of inputs and a button
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // find all forms and make an array
  const formList = Array.from(document.querySelectorAll(".modal__form"));

  // Iterate over array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // cancel default behavior for each form
      evt.preventDefault();
    });

    // call setInputEventListeners() on each form
    setInputEventListeners(formElement);
  });
};

////  Enable Form Validation ///
enableValidation();
