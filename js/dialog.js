'use strict';

(() => {
  const setupWizardForm = document.querySelector(`.setup-wizard-form`);
  const userNameInput = setupWizardForm.querySelector(`input[name="username"]`);
  const userSetup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = userSetup.querySelector(`.setup-close`);
  const dialogHandle = userSetup.querySelector(`.upload`);

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

  dialogHandle.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      userSetup.style.top = (userSetup.offsetTop - shift.y) + `px`;
      userSetup.style.left = (userSetup.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
