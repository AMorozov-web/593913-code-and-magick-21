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
    const rgbColorArr = numbersFromString(rgbColor);
    const hexColor = [];

    rgbColorArr.forEach((elem) => {
      hexColor.push(intToHex(elem));
    });

    return `#${hexColor.join(``)}`;
  };

  const randomElementFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.util = {
    hexFromRGB,
    randomElementFromArr,
  };
})();
