'use strict';

(() => {
  const WIZARD_COAT_COLORS = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`,
  ];

  const WIZARD_EYES_COLORS = [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`,
  ];

  const FIREBALL_COLORS = [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`,
  ];

  const setupWizardForm = document.querySelector(`.setup-wizard-form`);
  const setupFireball = setupWizardForm.querySelector(`.setup-fireball-wrap`);
  const wizardFireball = setupWizardForm.querySelector(`.setup-fireball`);
  const wizardCoat = setupWizardForm.querySelector(`.wizard-coat`);
  const wizardEyes = setupWizardForm.querySelector(`.wizard-eyes`);
  const fireballColorInput = setupWizardForm.querySelector(`input[name="fireball-color"]`);
  const coatColorInput = setupWizardForm.querySelector(`input[name="coat-color"]`);
  const eyesColorInput = setupWizardForm.querySelector(`input[name="eyes-color"]`);

  const getNewColor = (elem, colors) => {
    let currentColor;

    if (elem.tagName.toLowerCase() === `div`) {
      currentColor = window.util.hexFromRGB(getComputedStyle(elem).backgroundColor);
    } else {
      currentColor = elem.style.fill;
    }

    let newColor = window.util.randomElementFromArr(colors);

    while (currentColor === newColor) {
      newColor = window.util.randomElementFromArr(colors);
    }

    return newColor;
  };

  const colorizeWizard = (evt) => {
    switch (evt.target) {
      case wizardCoat:
        const coatColor = getNewColor(evt.target, WIZARD_COAT_COLORS);
        evt.target.style.fill = coatColor;
        coatColorInput.value = coatColor;
        break;
      case wizardEyes:
        const eyesColor = getNewColor(evt.target, WIZARD_EYES_COLORS);
        evt.target.style.fill = eyesColor;
        eyesColorInput.value = eyesColor;
        break;
      case wizardFireball:
        let fireballColor = getNewColor(setupFireball, FIREBALL_COLORS);
        setupFireball.style.backgroundColor = fireballColor;
        fireballColorInput.value = fireballColor;
        break;
      default: break;
    }
  };

  window.colors = {
    WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS,
    colorizeWizard,
  };
})();
