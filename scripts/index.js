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

//// Wrappers ////
const page = document.querySelector(".page");
const content = document.querySelector(".page__content");
const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");
const cardTemplate = content.querySelector("#card-template").content;
const cardGallery = content.querySelector(".gallery__cards");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");

//// Buttons and other DOM nodes ////
const profileEditButton = content.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);
const addCardButton = content.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const addCardSubmitButton = addCardModal.querySelector(".modal__submit-button");

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

//// Functions ////
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data["link"];
  cardImage.alt = data["name"];
  cardTitle.textContent = data["name"];

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

function toggleLikeButton(button) {
  button.classList.toggle("card__like-button_active");
}

function addLikeButtonListener(button) {
  button.addEventListener("click", () => {
    toggleLikeButton(button);
  });
}

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

  // create event listener for new cards like button
  const newCard = cardGallery.querySelector(".card");
  const cardLikeButton = newCard.querySelector(".card__like-button");
  addLikeButtonListener(cardLikeButton);

  toggleModal(addCardModal);
}

///// Event Handlers ////
// profile edit button click
profileEditButton.addEventListener("click", () => {
  openEditProfileModal();
});

// profile modal close button click
editProfileCloseButton.addEventListener("click", () => {
  toggleModal(editProfileModal);
});

// profile form submit event
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// add card button click
addCardButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});

// add card modal close button click
addCardCloseButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});

// add card form submit event
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//// Render initial cards ////
initialCards.forEach((card) => {
  cardGallery.append(getCardElement(card));
});

// Select all card like buttons after cards have been rendered
const cardLikeButton = content.querySelectorAll(".card__like-button");
// add click listener to each like button
cardLikeButton.forEach((likeButton) => {
  addLikeButtonListener(likeButton);
});
