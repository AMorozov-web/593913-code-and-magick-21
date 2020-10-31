'use strict';

(() => {
  const MAX_WIZARDS_COUNT = 4;
  const userSetup = document.querySelector(`.setup`);
  const form = userSetup.querySelector(`.setup-wizard-form`);
  const similarListElement = userSetup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content.querySelector(`.setup-similar-item`);

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const successHandler = (wizards) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(window.util.randomElementFromArr(wizards)));
    }

    similarListElement.appendChild(fragment);

    userSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertBefore(node, userSetup);
  };

  window.backend.load(successHandler, errorHandler);

  const submitHandler = (evt) => {
    window.backend.upload(new FormData(form), () => {
      const message = document.createElement(`div`);
      message.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #00AE68;`;
      message.style.position = `absolute`;
      message.style.left = 0;
      message.style.right = 0;
      message.style.fontSize = `30px`;
      message.textContent = `Данные успешно отправлены`;

      userSetup.classList.add(`hidden`);
      document.body.insertAdjacentElement(`afterbegin`, message);
    });
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);
})();
