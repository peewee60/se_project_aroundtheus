export default class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    avatarSelector,
  }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._descriptionElement = document.querySelector(
      profileDescriptionSelector
    );
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    // return object containing information about the user
    return {
      name: this._nameElement.innerText,
      about: this._descriptionElement.innerText,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.innerText = name ? name : this._nameElement.innerText;
    this._descriptionElement.innerText = about
      ? about
      : this._descriptionElement.innerText;
    this._avatarElement.src = avatar ? avatar : this._avatarElement.src;
  }
}
