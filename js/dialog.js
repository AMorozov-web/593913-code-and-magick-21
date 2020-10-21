'use strict';

(() => {
  const setupWizardForm = document.querySelector(`.setup-wizard-form`);
  const userNameInput = setupWizardForm.querySelector(`input[name="username"]`);
  const userSetup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = userSetup.querySelector(`.setup-close`);

  const openPopup = () => {
    userSetup.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
    setupWizardForm.addEventListener(`click`, window.colors.colorizeWizard);
    userNameInput.addEventListener(`change`, window.userNameValidation);
  };

  const closePopup = () => {
    userSetup.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
    setupWizardForm.removeEventListener(`click`, window.colors.colorizeWizard);
    userNameInput.removeEventListener(`change`, window.userNameValidation);
  };

  const onPopupEscPress = (evt) => {
    if (document.activeElement !== userNameInput && evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

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
})();
