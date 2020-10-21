'use strict';

(() => {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;
  const setupWizardForm = document.querySelector(`.setup-wizard-form`);
  const userNameInput = setupWizardForm.querySelector(`input[name="username"]`);

  window.userNameValidation = (evt) => {
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
})();
