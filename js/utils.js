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
  // Запускает перетаскивание элемента, указнного в параметре elem при клике на элемент, указанный в параметре handler
  var dragNdropInit = function (handler, elem) {
    handler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var dragged = false;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        elem.style.top = (elem.offsetTop - shift.y) + 'px';
        elem.style.left = (elem.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            handler.removeEventListener('click', onClickPreventDefault);
          };
          handler.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  // Сбрасывает инлайн стили top и left у элемента
  var positionReset = function (elem) {
    elem.style.removeProperty('top');
    elem.style.removeProperty('left');
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
    moveElemToStartOfArray: moveElemToStartOfArray,
    dragNdropInit: dragNdropInit,
    positionReset: positionReset
  };
})();
