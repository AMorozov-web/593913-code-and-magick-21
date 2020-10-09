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

const getNumbersFromString = (splitString) => {
  const separator = `, `;
  const fragmentsFromString = splitString.split(separator);
  const numbersArr = [];

  fragmentsFromString.forEach((elem) => {
    numbersArr.push(parseInt(elem.match(/\d+/), 10));
  });

  return numbersArr;
};

const convertIntToHex = (number) => {
  const hex = number.toString(16);

  return (hex.length === 1) ? `0${hex}` : `${hex}`;
};

const getHexFromRGB = (rgbColor) => {
  const rgbColorArr = getNumbersFromString(rgbColor);
  const hexColor = [];

  rgbColorArr.forEach((elem) => {
    hexColor.push(convertIntToHex(elem));
  });

  return `#${hexColor.join(``)}`;
};

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

const onWizardClick = (evt) => {
  switch (evt.target) {
    case wizardCoat:
      let coatColor = getRandomElement(WIZARD_COAT_COLORS);
      if (coatColor === evt.target.style.fill) {
        coatColor = getNextArrElement(WIZARD_COAT_COLORS, coatColor);
      }
      evt.target.style.fill = coatColor;
      coatColorInput.value = coatColor;
      break;
    case wizardEyes:
      let eyesColor = getRandomElement(WIZARD_EYES_COLORS);
      if (eyesColor === evt.target.style.fill) {
        eyesColor = getNextArrElement(WIZARD_EYES_COLORS, eyesColor);
      }
      evt.target.style.fill = eyesColor;
      eyesColorInput.value = eyesColor;
      break;
    case wizardFireball:
      const currentFireballColor = getComputedStyle(setupFireball).backgroundColor;
      let fireballColor = getRandomElement(FIREBALL_COLORS);
      if (fireballColor === getHexFromRGB(currentFireballColor)) {
        fireballColor = getNextArrElement(FIREBALL_COLORS, fireballColor);
      }
      setupFireball.style.backgroundColor = fireballColor;
      fireballColorInput.value = fireballColor;
      break;
    default: break;
  }
};

const onPopupEscPress = (evt) => {
  if (document.activeElement !== userNameInput && evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const onInputChange = (evt) => {
  const valueLength = evt.target.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
};

const openPopup = () => {
  userSetup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  setupWizardForm.addEventListener(`click`, onWizardClick);
  userNameInput.addEventListener(`change`, onInputChange);
};

const closePopup = () => {
  userSetup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  setupWizardForm.removeEventListener(`click`, onWizardClick);
  userNameInput.removeEventListener(`change`, onInputChange);
};

const wizards = getWizards(WIZARDS_COUNT);
const fragment = document.createDocumentFragment();

wizards.forEach((elem) => {
  fragment.appendChild(renderWizard(elem));
});

similarListElement.appendChild(fragment);

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userSetup.querySelector(`.setup-close`);

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, () => {
  openPopup();
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, () => {
  closePopup();
});

userSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
