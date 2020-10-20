'use strict';

(() => {
  window.util = {
    numbersFromString: (splitString) => {
      const separator = `, `;
      const fragmentsFromString = splitString.split(separator);
      const numbersArr = [];

      fragmentsFromString.forEach((elem) => {
        numbersArr.push(parseInt(elem.match(/\d+/), 10));
      });

      return numbersArr;
    },

    intToHex: (number) => {
      const hex = number.toString(16);

      return (hex.length === 1) ? `0${hex}` : `${hex}`;
    },

    hexFromRGB: (rgbColor) => {
      const rgbColorArr = window.util.numbersFromString(rgbColor);
      const hexColor = [];

      rgbColorArr.forEach((elem) => {
        hexColor.push(window.util.intToHex(elem));
      });

      return `#${hexColor.join(``)}`;
    },

    randomElementFromArr: (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    nextArrElement: (arr, elem = arr[0]) => {
      const elementIndex = arr.indexOf(elem);
      let nextElementIndex = elementIndex + 1;
      if (nextElementIndex === arr.length) {
        nextElementIndex = 0;
      }

      return arr[nextElementIndex];
    },
  };
})();
