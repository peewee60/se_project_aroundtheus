export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._likeButtonSelector = ".card__like-button";
    this._likeButtonActive = "card__like-button_active";
    this._deleteButtonSelector = ".card__delete-button";
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle(this._likeButtonActive);
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    // like button listener
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // delete button listener
    this._deleteButton.addEventListener("click", (evt) => {
      this._handleDeleteCard();
    });

    // set event listener for image click
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _getTemplate() {
    // clone card template
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._getTemplate();

    // buttons
    this._likeButton = this._cardElement.querySelector(
      this._likeButtonSelector
    );
    this._deleteButton = this._cardElement.querySelector(
      this._deleteButtonSelector
    );

    // get image element and set attributes
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    // get title element and set attributes
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardTitleElement.textContent = this._name;

    // set event listeners
    this._setEventListeners();

    // return the card
    return this._cardElement;
  }
}
