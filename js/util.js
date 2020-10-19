'use strict';

(function () {

  window.util = {
    isEscEvent: (evt, action) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: (evt, action) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        action();
      }
    }
  };
})();
