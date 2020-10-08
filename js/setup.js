'use strict';

const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const WIZARD_COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const WIZARD_EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const WIZARDS_COUNT = 4;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const setupWizardForm = document.querySelector(`.setup-wizard-form`);
const setupFireball = setupWizardForm.querySelector(`.setup-fireball-wrap`);
const wizardFireball = setupWizardForm.querySelector(`.setup-fireball`);
const wizardCoat = setupWizardForm.querySelector(`.wizard-coat`);
const wizardEyes = setupWizardForm.querySelector(`.wizard-eyes`);
const userNameInput = setupWizardForm.querySelector(`input[name="username"]`);
const fireballColorInput = setupWizardForm.querySelector(`input[name="fireball-color"]`);
const coatColorInput = setupWizardForm.querySelector(`input[name="coat-color"]`);
const eyesColorInput = setupWizardForm.querySelector(`input[name="eyes-color"]`);
const userSetup = document.querySelector(`.setup`);
const similarListElement = userSetup.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getNextArrElement = (arr, elem = arr[0]) => {
  const elementIndex = arr.indexOf(elem);
  let nextElementIndex = elementIndex + 1;
  if (nextElementIndex === arr.length) {
    nextElementIndex = 0;
  }

  return arr[nextElementIndex];
};

const getWizards = (count) => {
  const randomWizards = [];

  for (let i = 0; i < count; i++) {
    randomWizards.push({
      name: `${getRandomElement(WIZARD_NAMES)} ${getRandomElement(WIZARD_SURNAMES)}`,
      coatColor: `${getRandomElement(WIZARD_COAT_COLORS)}`,
      eyesColor: `${getRandomElement(WIZARD_EYES_COLORS)}`
    });
  }

  return randomWizards;
};

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const onWizardChangeColors = function (evt) {
  switch (evt.target) {
    case wizardCoat:
      let coatColor = getRandomElement(WIZARD_COAT_COLORS);
      if (coatColor === evt.target.style.fill) {
        coatColor = getNextArrElement(coatColor, WIZARD_COAT_COLORS);
      }
      evt.target.style.fill = coatColor;
      coatColorInput.value = coatColor;
      break;
    case wizardEyes:
      let eyesColor = getRandomElement(WIZARD_EYES_COLORS);
      if (eyesColor === evt.target.style.fill) {
        eyesColor = getNextArrElement(eyesColor, WIZARD_EYES_COLORS);
      }
      evt.target.style.fill = eyesColor;
      eyesColorInput.value = eyesColor;
      break;
    case wizardFireball:
      let fireballColor = getRandomElement(FIREBALL_COLORS);
      if (fireballColor === getComputedStyle(setupFireball).backgroundColor) {
        fireballColor = getNextArrElement(fireballColor, FIREBALL_COLORS);
      }
      setupFireball.style.backgroundColor = fireballColor;
      fireballColorInput.value = fireballColor;
      break;
    default: break;
  }
};

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  userSetup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  setupWizardForm.addEventListener(`click`, onWizardChangeColors);
  userNameInput.addEventListener(`input`, validateUserName);
};

const closePopup = function () {
  userSetup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  setupWizardForm.removeEventListener(`click`, onWizardChangeColors);
  userNameInput.removeEventListener(`input`, validateUserName);
};


const validateUserName = function () {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
};

const wizards = getWizards(WIZARDS_COUNT);
const fragment = document.createDocumentFragment();

for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userSetup.querySelector(`.setup-close`);

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function () {
  openPopup();
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function () {
  closePopup();
});

userSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
