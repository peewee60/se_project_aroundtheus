export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeButton
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
    this._likeButtonSelector = ".card__like-button";
    this._likeButtonActive = "card__like-button_active";
    this._deleteButtonSelector = ".card__delete-button";
  }

  _setEventListeners() {
    // like button listener
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this._id, this._isLiked)
        .then((isLiked) => {
          this._isLiked = isLiked;
          if (this._isLiked) {
            this._likeButton.classList.add(this._likeButtonActive);
          } else {
            this._likeButton.classList.remove(this._likeButtonActive);
          }
        })
        .catch((err) => {
          console.error("Like Button Error:", err);
        });
    });

    // delete button listener
    this._deleteButton.addEventListener("click", (evt) => {
      this._handleDeleteCard(this._id, this._cardElement);
      // this._cardElement.remove();
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

    // set like button status
    if (this._isLiked) {
      this._likeButton.classList.add(this._likeButtonActive);
    }

    // set event listeners
    this._setEventListeners();

    // return the card
    return this._cardElement;
  }
}
