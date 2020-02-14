'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var isEscapeEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  // Возвращает случайный элемент массива
  var getRandomElem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var moveElemToStartOfArray = function (index, arr) {
    arr.splice(0, 0, arr.splice(index, 1).join(''));
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    getRandomElem: getRandomElem,
    moveElemToStartOfArray: moveElemToStartOfArray
  };
})();
