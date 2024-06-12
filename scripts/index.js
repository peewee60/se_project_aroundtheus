//// initial data ////
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//// DOM Elements ////
const page = document.querySelector(".page");
const content = document.querySelector(".page__content");
const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");
const cardTemplate = content.querySelector("#card-template").content;
const cardGallery = content.querySelector(".gallery__cards");
const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const imageModal = document.querySelector("#image-modal");
const imageModalPicture = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector(".modal__title");

//// Forms ////
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

//// Inputs ///
const profileFormInputs = profileFormElement.querySelectorAll(".modal__input");
const addCardFormInputs = addCardFormElement.querySelectorAll(".modal__input");

//// Buttons and Inputs ////
const profileEditButton = content.querySelector(".profile__edit-button");
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);

const addCardButton = content.querySelector(".profile__add-button");
const addCardSubmitButton = addCardModal.querySelector(".modal__submit-button");
const modalCloseButtons = document.querySelectorAll(".modal__close-button");

//// Functions ////
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  profileFormError.classList.remove("modal__input-error_active");
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

const setEventListeners = (formElement) => {
  // Make an array of the input fields inside the form
  const inputList = Array.from(formElement.querySelectorAll(".modal_input"));

  // Iterate over the array
  inputList.forEach((inputElement) => {
    // add the input event handler to each field
    inputElement.addEventListener("input", () => {
      // Call checkInputValidity() inside the callback
      checkInputValidity(formElement, inputElement);
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

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data["link"];
  cardImage.alt = data["name"];
  cardTitle.textContent = data["name"];

  cardLikeButton.addEventListener("click", () => {
    toggleLikeButton(cardLikeButton);
  });

  cardDeleteButton.addEventListener("click", () => {
    const card = cardDeleteButton.parentElement;
    deleteCard(card);
  });

  cardImage.addEventListener("click", () => {
    openImageModal(data);
  });

  return cardElement;
}

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

function fillProfileForm() {
  profileNameInput.value = content.querySelector(".profile__name").innerText;
  profileDescriptionInput.value = content.querySelector(
    ".profile__description"
  ).innerText;
}

function openEditProfileModal() {
  fillProfileForm();
  toggleModal(editProfileModal);
}

function openImageModal(data) {
  imageModalPicture.src = data["link"];
  imageModalPicture.alt = data["name"];
  imageModalTitle.textContent = data["name"];

  toggleModal(imageModal);
}

function toggleLikeButton(button) {
  button.classList.toggle("card__like-button_active");
}

function deleteCard(card) {
  card.remove();
}

///// Event Handlers ////
// modal close buttons
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.parentElement.parentElement;
    toggleModal(modal);
  });
});

// profile edit button click
profileEditButton.addEventListener("click", () => {
  openEditProfileModal();
});

// add card button click
addCardButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});

//// Form data ////
const profileNameInput = profileFormElement.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const newCardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const newCardUrlInput = addCardFormElement.querySelector(
  ".modal__input_type_url"
);

//// Form submit listeners ////
// profile form submit event
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// add card form submit event
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//// Form handlers ////
// profile form submission handler
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const nameInputValue = profileNameInput.value;
  const descriptionInputValue = profileDescriptionInput.value;

  // insert new values into the textContent property of the
  // corresponding profile elements
  profileName.textContent = nameInputValue;
  profileDescription.textContent = descriptionInputValue;

  toggleModal(editProfileModal);
}

// Add card form submission handler
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const titleInputValue = newCardTitleInput.value;
  const urlInputValue = newCardUrlInput.value;

  // create new card data
  const newCardData = {
    name: titleInputValue,
    link: urlInputValue,
  };

  // Add new card to begining of card gallery
  cardGallery.prepend(getCardElement(newCardData));

  toggleModal(addCardModal);
  addCardFormElement.reset();
}

//// Render initial cards ////
initialCards.forEach((card) => {
  cardGallery.append(getCardElement(card));
});

////  Enable Form Validation ///
enableValidation();
