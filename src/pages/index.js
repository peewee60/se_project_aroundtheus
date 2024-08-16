// Import CSS
import "../styles/index.css";

// Import Images
import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/jacques_cousteau.jpg";
import editIcon from "../images/edit_icon.svg";
import avatarIcon from "../images/edit_avatar.svg";
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
  baseUrl,
  token,
  avatarSelector,
} from "../utils/constants.js";
import Api from "../components/Api.js";

//// DOM Elements ////
const headerLogo = document.querySelector(".header__logo");
headerLogo.src = logoSrc;
const profileAvatarWrapper = document.querySelector(".profile__avatar-wrapper");
const profileAvatar = document.querySelector(avatarSelector);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//// Forms ////
const profileForm = document.forms["edit-profile-form"];
const addCardForm = document.forms["add-card-form"];

//// Buttons ////
const editAvatarIcon = document.querySelector(".profile__avatar-edit-icon");
editAvatarIcon.src = avatarIcon;

// Edit Profile Button
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditIcon = profileEditButton.querySelector(".profile__edit-icon");
profileEditIcon.src = editIcon;

// Add Card Button
const addCardButton = document.querySelector(".profile__add-button");
const addCardIcon = addCardButton.querySelector(".profile__add-icon");
addCardIcon.src = plusIcon;

//// Popups ////
// Instantiate popups
const imgagePopup = new PopupWithImage({ popupSelector: "#image-modal" });

const profilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  submitHandler: handleProfileFormSubmit,
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  submitHandler: handleAddCardFormSubmit,
});

const deleteCardPopup = new PopupWithForm({
  popupSelector: "#delete-card-modal",
  submitHandler: handleCardDelete,
});

const editAvatarPopup = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  submitHandler: handleAvatarFormSubmit,
});

// set popup event listeners
imgagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

//// Instantiate API ////
const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

//// Instantiate UserInfo ////
const user = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
  avatarSelector,
});

api
  .getUserInfo()
  .then((result) => {
    // process the result
    user.setUserInfo({
      name: result.name,
      description: result.about,
      avatar: result.avatar,
    });
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//// Render initial cards ////
const cardsSection = new Section(
  { items: [], renderer: createCard },
  gallerySelector
);

api
  .getInitialCards()
  .then((result) => {
    if (result.length === 0) {
      // If no cards are in the database
      // add initialCards to server
      initialCards.forEach((card) => {
        api.addNewCard(card);
      });
    }

    result.forEach((item) => {
      // create new card
      const newCard = createCard(item, openImageModal);
      // Add new card to begining of card gallery
      cardsSection.addItem(newCard);
    });

    cardsSection.renderItems();
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//// Functions ////
function fillProfileForm() {
  const userInfo = user.getUserInfo();
  profilePopup.setInputValues(userInfo);
}

function openEditAvatarModal() {
  editAvatarPopup.open();
}

function openEditProfileModal() {
  fillProfileForm();
  formValidators[profileForm.getAttribute("id")].resetValidation();

  profilePopup.open();
}

function openImageModal(data) {
  imgagePopup.open(data);
}

function openAddCardModal() {
  addCardPopup.open();
}

function createCard(data) {
  const cardElement = new Card(
    data,
    cardTemplate,
    openImageModal,
    openDeleteModal,
    handleLikeButton
  );

  return cardElement.getView();
}

function openDeleteModal(currentCardId, currentCardElement) {
  deleteCardPopup.open();
  deleteCardPopup.currentCardId = currentCardId;
  deleteCardPopup.currentCardElement = currentCardElement;
}

function handleCardDelete() {
  return api
    .deleteCard(deleteCardPopup.currentCardId)
    .then(deleteCardPopup.currentCardElement.remove())
    .catch((err) => {
      console.error("Delete Card Error:", err);
    });
}

function handleLikeButton(cardId, isLiked) {
  console.log(cardId);
  console.log(isLiked);

  if (!isLiked) {
    return api
      .addLike(cardId)
      .then(() => true)
      .catch((err) => {
        console.error("Like Button Error:", err);
        return false;
      });
  } else {
    return api
      .removeLike(cardId)
      .then(() => false)
      .catch((err) => {
        console.error("Like Button Error:", err);
        return true;
      });
  }
}

//// Button Event Listeners ////
// avatar image click
profileAvatarWrapper.addEventListener("click", openEditAvatarModal);

// profile edit button click
profileEditButton.addEventListener("click", openEditProfileModal);

// add card button click
addCardButton.addEventListener("click", openAddCardModal);

//// Form Submit Handlers ////
// Avatar form submission handler
function handleAvatarFormSubmit(data) {
  return api
    .updateUserAvatar(data)
    .then((profileAvatar.src = data.link))
    .catch((err) => {
      console.error(err); // log the error to the console
    });
}

// profile form submission handler
function handleProfileFormSubmit(data) {
  // change propert name of description to about
  const updatedData = { name: data.name, about: data.description };

  // Update user data on server
  return api
    .updateUserInfo(updatedData)
    .then((res) => {
      // insert new values into the textContent property of the
      // corresponding profile elements
      user.setUserInfo({
        name: res.name,
        description: res.about,
      });
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    });
}

// Add card form submission handler
function handleAddCardFormSubmit(data) {
  // add new card to server
  return api
    .addNewCard(data)
    .then((cardData) => {
      // create new card with the data returned from server
      const newCard = createCard(cardData);

      // Add new card to begining of card gallery
      cardsSection.addItem(newCard);

      addCardPopup.close();
      addCardPopup.reset();
      formValidators[addCardForm.getAttribute("id")].toggleButtonState();
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    });
}

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
