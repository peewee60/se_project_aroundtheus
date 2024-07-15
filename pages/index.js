import Card from "../components/Card.js";

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
const cardTemplate = "#card-template";

//// DOM Elements ////
const content = document.querySelector(".page__content");
const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");
const cardGallery = content.querySelector(".gallery__cards");
const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const imageModal = document.querySelector("#image-modal");
const imageModalPicture = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector(".modal__title");

//// Forms ////
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

//// Buttons and Inputs ////
const modalCloseButtons = document.querySelectorAll(".modal__close-button");
const profileEditButton = content.querySelector(".profile__edit-button");
const addCardButton = content.querySelector(".profile__add-button");

//// Functions ////
const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    // find active modal
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
};

const handleOutsideClick = (evt) => {
  // find active modal
  const activeModal = document.querySelector(".modal_opened");

  if (evt.target === activeModal) {
    closeModal(activeModal);
  }
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");

  // Add event listener to close modal on press of "ESC" key
  document.addEventListener("keydown", handleEscapeKey);

  // Add event listener to close modal the overlay is clicked
  window.addEventListener("click", handleOutsideClick);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  // Remove event listener to close modal on press of "ESC" key
  document.removeEventListener("keydown", handleEscapeKey);

  // Remove event listener to close modal when the overlay is clicked
  window.removeEventListener("click", handleOutsideClick);
};

function fillProfileForm() {
  profileNameInput.value = content.querySelector(".profile__name").innerText;
  profileDescriptionInput.value = content.querySelector(
    ".profile__description"
  ).innerText;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function openImageModal(data) {
  imageModalPicture.src = data["link"];
  imageModalPicture.alt = data["name"];
  imageModalTitle.textContent = data["name"];

  openModal(imageModal);
}

///// Event Handlers ////
// modal close buttons
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.parentElement.parentElement;
    closeModal(modal);
  });
});

// profile edit button click
profileEditButton.addEventListener("click", () => {
  openEditProfileModal();
});

// add card button click
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
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

  closeModal(editProfileModal);
}

const disableButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};

// Add card form submission handler
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const titleInputValue = newCardTitleInput.value;
  const urlInputValue = newCardUrlInput.value;

  // create new card
  const newCard = new Card(
    {
      name: titleInputValue,
      link: urlInputValue,
    },
    cardTemplate,
    openImageModal
  );

  // Add new card to begining of card gallery
  cardGallery.prepend(newCard.getView());

  closeModal(addCardModal);
  addCardFormElement.reset();
  disableButton(evt.submitter, "modal__submit-inactive");
}

//// Render initial cards ////
initialCards.forEach((card) => {
  const newCard = new Card(card, cardTemplate, openImageModal);
  cardGallery.append(newCard.getView());
});
