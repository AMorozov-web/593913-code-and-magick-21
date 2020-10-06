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
const userSetup = document.querySelector(`.setup`);
const similarListElement = userSetup.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);

const getRandomIndex = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getWizards = function (count) {
  const randomWizards = [];

  for (let i = 0; i < count; i++) {
    randomWizards.push({
      name: `${getRandomIndex(WIZARD_NAMES)} ${getRandomIndex(WIZARD_SURNAMES)}`,
      coatColor: `${getRandomIndex(WIZARD_COAT_COLORS)}`,
      eyesColor: `${getRandomIndex(WIZARD_EYES_COLORS)}`
    });
  }

  return randomWizards;
};

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const setupFireball = document.querySelector(`.setup-fireball-wrap`);
const setupWizard = document.querySelector(`.setup-wizard-wrap`);

const changeFireballColor = function () {
  setupFireball.style.backgroundColor = getRandomIndex(FIREBALL_COLORS);
};

const changeWizardsLook = function (evt) {
  const clickTarget = evt.target.className.baseVal;
  switch (clickTarget) {
    case `wizard-coat`: evt.target.style.fill = getRandomIndex(WIZARD_COAT_COLORS);
      break;
    case `wizard-eyes`: evt.target.style.fill = getRandomIndex(WIZARD_EYES_COLORS);
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
};

const closePopup = function () {
  userSetup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
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
