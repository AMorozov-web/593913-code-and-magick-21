'use strict';

(() => {
  const WIZARD_NAMES = [
    `Иван`,
    `Хуан Себастьян`,
    `Мария`,
    `Кристоф`,
    `Виктор`,
    `Юлия`,
    `Люпита`,
    `Вашингтон`,
  ];

  const WIZARD_SURNAMES = [
    `да Марья`,
    `Верон`,
    `Мирабелла`,
    `Вальц`,
    `Онопко`,
    `Топольницкая`,
    `Нионго`,
    `Ирвинг`,
  ];

  const WIZARDS_COUNT = 4;
  const userSetup = document.querySelector(`.setup`);
  const similarListElement = userSetup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content.querySelector(`.setup-similar-item`);

  const getWizards = (count) => {
    const randomWizards = [];

    for (let i = 0; i < count; i++) {
      randomWizards.push({
        name: `${window.util.randomElementFromArr(WIZARD_NAMES)} ${window.util.randomElementFromArr(WIZARD_SURNAMES)}`,
        coatColor: `${window.util.randomElementFromArr(window.colors.WIZARD_COAT_COLORS)}`,
        eyesColor: `${window.util.randomElementFromArr(window.colors.WIZARD_EYES_COLORS)}`
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

  const wizards = getWizards(WIZARDS_COUNT);
  const fragment = document.createDocumentFragment();

  wizards.forEach((elem) => {
    fragment.appendChild(renderWizard(elem));
  });

  similarListElement.appendChild(fragment);

  userSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
})();
