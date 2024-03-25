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

// Create variables for .page, .page__content, and .modal
const page = document.querySelector(".page");
const content = document.querySelector(".page__content");
const modal = document.querySelector(".modal");

//////// Render cards ////////
const cardTemplate = content.querySelector("#card-template").content;
const cardGallery = content.querySelector(".gallery__cards");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data["link"];
  cardImage.alt = data["name"];
  cardTitle.textContent = data["name"];

  return cardElement;
}

initialCards.forEach((card) => {
  cardGallery.append(getCardElement(card));
});

//////// Edit profile modal ////////

// Create variables for ".profile__edit-button", ".modal__close-button"
// and ".modal__submit-button"
const profileEditButton = document.querySelector(".profile__edit-button");
const modalCloseButton = document.querySelector(".modal__close-button");
const modalSubmitButton = document.querySelector(".modal__submit-button");
// Create variables for the profile name and description inputs
const profileNameInput = modal.querySelector(".modal__input_type_name");
const profileDescriptionInput = modal.querySelector(
  ".modal__input_type_description"
);

// Fuction for setting values of profile form fields
function fillProfileForm() {
  profileNameInput.value = content.querySelector(".profile__name").innerText;
  profileDescriptionInput.value = content.querySelector(
    ".profile__description"
  ).innerText;
}

// Fuction to open edit profile modal
function openEditProfileModal() {
  fillProfileForm();
  // Open the modal
  page.querySelector(".modal").classList.add("modal_opened");
}

// Fuction to close edit profile modal
function closeEditProfileModal() {
  // Close modal
  page.querySelector(".modal").classList.remove("modal_opened");
}

// Event listenter for profile edit button click
profileEditButton.addEventListener("click", function () {
  openEditProfileModal();
});

// Event listener for modal close button click
modalCloseButton.addEventListener("click", function () {
  closeEditProfileModal();
});

// find the form in the DOM
const profileFormElement = modal.querySelector(".modal__form");

// find the form fields in the DOM
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const descriptionInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);

// find the profile elements in the DOM
const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");

// the form submission handler. Note that its name
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const nameInputValue = nameInput.value;
  const descriptionInputValue = descriptionInput.value;

  // insert new values into the textContent property of the
  // corresponding profile elements
  profileName.textContent = nameInputValue;
  profileDescription.textContent = descriptionInputValue;

  closeEditProfileModal();
}

// connect the handler to the form:
// it will watch the submit event
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
