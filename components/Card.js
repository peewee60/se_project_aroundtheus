export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _handleLikeButton(button) {
    button.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _setEventListeners() {
    // like button listener
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton(cardLikeButton);
      });

    // delete button listener
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard(evt);
      });

    // set event listener for image click
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  getView = () => {
    // copy card template
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    // get image element and set attributes
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    // get title element and set attributes
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardTitleElement.textContent = this._name;

    // set event listeners
    this._setEventListeners(this._cardElement);

    // return the card
    return this._cardElement;
  };
}
