export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._descriptionElement = document.querySelector(
      profileDescriptionSelector
    );
    this._name = this._nameElement.textContent;
    this._description = this._descriptionElement.textContent;
  }

  getUserInfo() {
    // return object containing information about the user
    return {
      name: this._nameElement.innerText,
      description: this._descriptionElement.innerText,
    };
  }

  setUserInfo({ name, description }) {
    // take new user data and add it to the page
    this._nameElement.innerText = name;
    this._descriptionElement.innerText = description;
  }
}
