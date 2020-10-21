'use strict';

(() => {
  const numbersFromString = (splitString) => {
    const separator = `, `;
    const fragmentsFromString = splitString.split(separator);
    const numbersArr = [];

    fragmentsFromString.forEach((elem) => {
      numbersArr.push(parseInt(elem.match(/\d+/), 10));
    });

    return numbersArr;
  };

  const intToHex = (number) => {
    const hex = number.toString(16);

    return (hex.length === 1) ? `0${hex}` : `${hex}`;
  };

  const hexFromRGB = (rgbColor) => {
    const rgbColorArr = window.util.numbersFromString(rgbColor);
    const hexColor = [];

    rgbColorArr.forEach((elem) => {
      hexColor.push(window.util.intToHex(elem));
    });

    return `#${hexColor.join(``)}`;
  };

  const randomElementFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const nextArrElement = (arr, elem = arr[0]) => {
    const elementIndex = arr.indexOf(elem);
    let nextElementIndex = elementIndex + 1;
    if (nextElementIndex === arr.length) {
      nextElementIndex = 0;
    }

    return arr[nextElementIndex];
  };

  window.util = {
    numbersFromString,
    intToHex,
    hexFromRGB,
    randomElementFromArr,
    nextArrElement,
  };
})();
