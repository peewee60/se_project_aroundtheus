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

//  Variables for .page, .page__content
const page = document.querySelector(".page");
const content = document.querySelector(".page__content");
// Modals
const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
// Card template amd gallery
const cardTemplate = content.querySelector("#card-template").content;
const cardGallery = content.querySelector(".gallery__cards");

//////// Render cards ////////
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
const profileEditButton = content.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);
// Create variables for the profile name and description inputs
const profileNameInput = editProfileModal.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = editProfileModal.querySelector(
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
  editProfileModal.classList.add("modal_opened");
}

// Fuction to close edit profile modal
function closeEditProfileModal() {
  // Close modal
  editProfileModal.classList.remove("modal_opened");
}

// Event listenter for profile edit button click
profileEditButton.addEventListener("click", function () {
  openEditProfileModal();
});

// Event listener for modal close button click
editProfileCloseButton.addEventListener("click", function () {
  closeEditProfileModal();
});

// find the form in the DOM
const profileFormElement = editProfileModal.querySelector(".modal__form");

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

//////// Add card modal ////////

// Create variables for ".modal__close-button" and ".modal__submit-button"
const addCardButton = content.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const addCardSubmitButton = addCardModal.querySelector(".modal__submit-button");

// Create variables for the card title and url inputs
const newCardTitleInput = addCardModal.querySelector(
  ".modal__input_type_title"
);
const newCardUrlInput = addCardModal.querySelector(".modal__input_type_url");

// Fuction to open add card modal
function openAddCardModal() {
  addCardModal.classList.add("modal_opened");
}

// Fuction to close add card modal
function closeAddCardModal() {
  addCardModal.classList.remove("modal_opened");
}

// Event listenter for profile edit button click
addCardButton.addEventListener("click", function () {
  openAddCardModal();
});

// Event listener for modal close button click
addCardCloseButton.addEventListener("click", function () {
  closeAddCardModal();
});

// find the form in the DOM
const addCardFormElement = addCardModal.querySelector(".modal__form");

// find the form fields in the DOM
const titleInput = addCardModal.querySelector(".modal__input_type_title");
const urlInput = addCardModal.querySelector(".modal__input_type_url");

// the form submission handler. Note that its name
// starts with a verb and concisely describes what it does
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const titleInputValue = titleInput.value;
  const urlInputValue = urlInput.value;

  // create new card data
  const newCard = {
    name: titleInputValue,
    link: urlInputValue,
  };

  // Add new card to begining of card gallery
  cardGallery.prepend(getCardElement(newCard));

  closeAddCardModal();
}

// connect the handler to the form:
// it will watch the submit event
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
