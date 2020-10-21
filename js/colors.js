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

  window.colors = {
    coatColors: [
      `rgb(101, 137, 164)`,
      `rgb(241, 43, 107)`,
      `rgb(146, 100, 161)`,
      `rgb(56, 159, 117)`,
      `rgb(215, 210, 55)`,
      `rgb(0, 0, 0)`,
    ],

    eyesColors: [
      `black`,
      `red`,
      `blue`,
      `yellow`,
      `green`,
    ],

    colorizeWizard: (evt) => {
      switch (evt.target) {
        case wizardCoat:
          let coatColor = window.util.randomElementFromArr(WIZARD_COAT_COLORS);
          if (coatColor === evt.target.style.fill) {
            coatColor = window.util.nextArrElement(WIZARD_COAT_COLORS, coatColor);
          }
          evt.target.style.fill = coatColor;
          coatColorInput.value = coatColor;
          break;
        case wizardEyes:
          let eyesColor = window.util.randomElementFromArr(WIZARD_EYES_COLORS);
          if (eyesColor === evt.target.style.fill) {
            eyesColor = window.util.nextArrElement(WIZARD_EYES_COLORS, eyesColor);
          }
          evt.target.style.fill = eyesColor;
          eyesColorInput.value = eyesColor;
          break;
        case wizardFireball:
          const currentFireballColor = getComputedStyle(setupFireball).backgroundColor;
          let fireballColor = window.util.randomElementFromArr(FIREBALL_COLORS);
          if (fireballColor === window.util.hexFromRGB(currentFireballColor)) {
            fireballColor = window.util.nextArrElement(FIREBALL_COLORS, fireballColor);
          }
          setupFireball.style.backgroundColor = fireballColor;
          fireballColorInput.value = fireballColor;
          break;
        default: break;
      }
    },
  };
})();
