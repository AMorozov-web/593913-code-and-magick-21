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

const WIZARD_COATCOLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const WIZARD_EYESCOLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const WIZARDS = [];
const WIZARDS_COUNT = 4;
const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

const getRandomIndex = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getWizards = function (count) {
  for (let i = 0; i < count; i++) {
    WIZARDS[i] = {};
    WIZARDS[i].name = `${getRandomIndex(WIZARD_NAMES)} ${getRandomIndex(WIZARD_SURNAMES)}`;
    WIZARDS[i].coatColor = `${getRandomIndex(WIZARD_COATCOLORS)}`;
    WIZARDS[i].eyesColor = `${getRandomIndex(WIZARD_EYESCOLORS)}`;
  }
};

const renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

getWizards(WIZARDS_COUNT);

let fragment = document.createDocumentFragment();

for (let i = 0; i < WIZARDS.length; i++) {
  fragment.appendChild(renderWizard(WIZARDS[i]));
}

similarListElement.appendChild(fragment);

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
