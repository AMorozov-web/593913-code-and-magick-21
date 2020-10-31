'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/code-and-magick/data`;
  const SEND_URL = `https://21.javascript.pages.academy/code-and-magick`;

  const StatusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 10000;

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, LOAD_URL);
    xhr.send();
  };

  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.open(`POST`, SEND_URL);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload,
  };
})();
