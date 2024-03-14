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
