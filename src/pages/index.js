// Import CSS
import "../styles/index.css";

// Import Images
import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/jacques_cousteau.jpg";
import editIcon from "../images/edit_icon.svg";
import plusIcon from "../images/plus_icon.svg";

// Import Modules
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  cardTemplate,
  validationConfig,
  formValidators,
  profileNameSelector,
  profileDescriptionSelector,
  gallerySelector,
} from "../utils/constants.js";

//// DOM Elements ////
const headerLogo = document.querySelector(".header__logo");
headerLogo.src = logoSrc;

const profileAvatar = document.querySelector(".profile__avatar");
profileAvatar.src = avatarSrc;

//// Buttons ////
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditIcon = profileEditButton.querySelector(".profile__edit-icon");
profileEditIcon.src = editIcon;

const addCardButton = document.querySelector(".profile__add-button");
const addCardIcon = addCardButton.querySelector(".profile__add-icon");
addCardIcon.src = plusIcon;

//// Functions ////
function openImageModal(data) {
  imgagePopup.open(data);
}

function createCard(data) {
  const cardElement = new Card(data, cardTemplate, openImageModal);

  return cardElement.getView();
}

function fillProfileForm() {
  const userInfo = user.getUserInfo();
  profileNameInput.value = userInfo.name;
  profileDescriptionInput.value = userInfo.description;
}

// Button Handlers
function openEditProfileModal() {
  fillProfileForm();
  formValidators[profileForm.getAttribute("id")].resetValidation();

  profilePopup.open();
}

function openAddCardModal() {
  addCardPopup.open();
}

// Button Event Listeners
// profile edit button click
profileEditButton.addEventListener("click", () => {
  openEditProfileModal();
});

// add card button click
addCardButton.addEventListener("click", () => {
  openAddCardModal();
});

//// Forms ////
const profileForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];

// //// Form Input Fields ////
const profileNameInput = profileForm.querySelector(".modal__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".modal__input_type_description"
);
const newCardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const newCardUrlInput = addCardForm.querySelector(".modal__input_type_url");

//// Form Submit Handlers ////
// profile form submission handler
function handleProfileFormSubmit(evt) {
  // prevent default submit behavior
  evt.preventDefault();

  // get the values of input field froms the value property
  // of the corresponding input element
  // insert new values into the textContent property of the
  // corresponding profile elements

  console.log(profileNameInput.value);
  console.log(profileDescriptionInput.value);

  user.setUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  });

  // close popup
  profilePopup.close();
  // closeModal(editProfileModal);
}

// Add card form submission handler
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const titleInputValue = newCardTitleInput.value;
  const urlInputValue = newCardUrlInput.value;

  // create new card
  const newCard = createCard(
    {
      name: titleInputValue,
      link: urlInputValue,
    },
    openImageModal
  );

  // Add new card to begining of card gallery
  cards.addItem(newCard);

  addCardPopup.close();
  // addCardForm.reset();
  formValidators[addCardForm.getAttribute("id")].toggleButtonState();
}

//// Render initial cards ////
const cards = new Section(
  { items: initialCards, renderer: createCard },
  gallerySelector
);
cards.renderItems();

//// Instantiate UserInfo ////
const user = new UserInfo({ profileNameSelector, profileDescriptionSelector });
// console.log(user);

//// Popups ////
// Instantiate popups
const imgagePopup = new PopupWithImage({ popupSelector: "#image-modal" });

const profilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: handleProfileFormSubmit,
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

// console.log(addCardPopup._popupElement.classList);

// set popup event listeners
imgagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

////  Enable Form Validation ///
const enableValidation = (validationConfig) => {
  // find all forms and make an array
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  // Iterate over array of forms
  formList.forEach((formElement) => {
    // create validator
    const validator = new FormValidator(validationConfig, formElement);
    // get the id of current form element
    const formName = formElement.getAttribute("id");

    // store validator using the `id` of the form
    formValidators[formName] = validator;
    // Enable validator
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
