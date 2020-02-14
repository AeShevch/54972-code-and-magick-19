'use strict';
(function () {
  // КОНСТАНТЫ
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  // ФУНКЦИИ
  // Возвращает случайный элемент массива
  var getRandomElem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  // Перемещает элемент в начала массива, принимает параметрам индекс нужного элемента и массив
  var moveElemToStartOfArray = function (index, arr) {
    arr.splice(0, 0, arr.splice(index, 1).join(''));
  };

  // ХЭНДЛЕРЫ
  // Хэндлер на нажатие клавиши Esc, принимает параметрами эвент и функцию, которую необходимо выполнить
  var isEscapeEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };
  // Хэндлер на нажатие клавиши Enter, принимает параметрами эвент и функцию, которую необходимо выполнить
  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  // ИНТЕРФЕЙС МОДУЛЯ
  window.utils = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    getRandomElem: getRandomElem,
    moveElemToStartOfArray: moveElemToStartOfArray
  };
})();
