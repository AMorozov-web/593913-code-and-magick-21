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

const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

const getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

const wizards = [
  {
    name: `${WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)]} ${WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)]}`,
    coatColor: `${WIZARD_COATCOLORS[getRandomIndex(WIZARD_COATCOLORS)]}`,
    eyesColor: `${WIZARD_EYESCOLORS[getRandomIndex(WIZARD_EYESCOLORS)]}`
  },
  {
    name: `${WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)]} ${WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)]}`,
    coatColor: `${WIZARD_COATCOLORS[getRandomIndex(WIZARD_COATCOLORS)]}`,
    eyesColor: `${WIZARD_EYESCOLORS[getRandomIndex(WIZARD_EYESCOLORS)]}`
  },
  {
    name: `${WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)]} ${WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)]}`,
    coatColor: `${WIZARD_COATCOLORS[getRandomIndex(WIZARD_COATCOLORS)]}`,
    eyesColor: `${WIZARD_EYESCOLORS[getRandomIndex(WIZARD_EYESCOLORS)]}`
  },
  {
    name: `${WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)]} ${WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)]}`,
    coatColor: `${WIZARD_COATCOLORS[getRandomIndex(WIZARD_COATCOLORS)]}`,
    eyesColor: `${WIZARD_EYESCOLORS[getRandomIndex(WIZARD_EYESCOLORS)]}`
  }
];

const renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let fragment = document.createDocumentFragment();

for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
