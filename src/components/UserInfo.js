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
      description: this._descriptionElement.innerText,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, description, avatar }) {
    this._nameElement.innerText = name;
    this._descriptionElement.innerText = description;
    this._avatarElement.src = avatar ? avatar : this._avatarElement.src;
  }
}
