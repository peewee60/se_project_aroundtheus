let initialCards = [
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
let cardTemplate = content.querySelector("#card-template").content;
let cardGallery = content.querySelector(".gallery__cards");

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);

  console.log(data["link"]);
  console.log(data["name"]);
  console.log(data["name"]);

  cardElement.querySelector(".card__image").src = data["link"];
  cardElement.querySelector(".card__image").alt = data["name"];
  cardElement.querySelector(".card__title").textContent = data["name"];

  return cardElement;
}

for (card of initialCards) {
  cardGallery.append(getCardElement(card));
}

//////// Edit profile modal ////////

// Create variables for ".profile__edit-button", ".modal__close-button"
// and ".modal__submit-button"
const profileEditButton = document.querySelector(".profile__edit-button");
const modalCloseButton = document.querySelector(".modal__close-button");
const modalSubmitButton = document.querySelector(".modal__submit-button");

// Event listenter for profile edit button click
profileEditButton.addEventListener("click", function () {
  // Create variables for the profile name and description inputs
  let profileNameInput = modal.querySelector(".modal__input_type_name");
  let profileDescriptionInput = modal.querySelector(
    ".modal__input_type_description"
  );
  // Set the value of the profile name and description inputs to the current
  // profile name and description
  profileNameInput.value = content.querySelector(".profile__name").innerText;
  profileDescriptionInput.value = content.querySelector(
    ".profile__description"
  ).innerText;
  // Open the modal
  page.querySelector(".modal").classList.add("modal_opened");
});

// Event listener for modal close button click
modalCloseButton.addEventListener("click", function () {
  // Close modal
  page.querySelector(".modal").classList.remove("modal_opened");
});

// // Event listener for modal profile submit button click
// modalSubmitButton.addEventListener("click", function () {
//   // Create variables for profile name and description HTML
//   let profileNameHTML = content.querySelector(".profile__name");
//   let profileDescriptionHTML = content.querySelector(".profile__description");

//   // Create variables for the profile name and description inputs
//   let profileNameInput = modal.querySelector(".modal__input_type_name");
//   let profileDescriptionInput = modal.querySelector(
//     ".modal__input_type_description"
//   );

//   // Set the value of the profile name and description inputs to the current
//   // profile name and description
//   profileNameHTML.innerText = profileNameInput.value;
//   profileDescriptionHTML.innerText = profileDescriptionInput.value;

//   // Close modal
//   page.querySelector(".modal").classList.remove("modal_opened");
// });

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
  let nameInputValue = nameInput.value;
  let descriptionInputValue = descriptionInput.value;

  // insert new values into the textContent property of the
  // corresponding profile elements
  profileName.textContent = nameInputValue;
  profileDescription.textContent = descriptionInputValue;
}

// connect the handler to the form:
// it will watch the submit event
profileFormElement.addEventListener("submit", handleProfileFormSubmit);