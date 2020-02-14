'use strict';
(function () {
  // КОНСТАНТЫ
  // Ссылки на узлы, используемые в модуле
  var POPUP = document.querySelector('.js-setup-toggle');
  var CLOSE_POPUP_BTN = POPUP.querySelector('.setup-close');
  var OPEN_POPUP_BTN = document.querySelector('.setup-open');

  // ФУНКЦИИ
  // Открывает попап
  var _openPopup = function () {
    POPUP.classList.remove('hidden');
    document.addEventListener('keyup', _onPopupEscPress);
    CLOSE_POPUP_BTN.addEventListener('keyup', _onEnterClosePress);
    POPUP.querySelector('.setup-user-name').addEventListener('keyup', function (evt) {
      evt.stopPropagation();
    });
  };
  // Закрывает попап
  var _closePopup = function () {
    POPUP.classList.add('hidden');
    document.removeEventListener('keyup', _onPopupEscPress);
    document.removeEventListener('keyup', _onEnterClosePress);
  };

  // ХЭНДЛЕРЫ
  // Нажатие клавиши Esc, если открыт попап
  var _onPopupEscPress = function (evt) {
    window.utils.isEscapeEvent(evt, _closePopup);
  };
  // Нажатие кливаши Enter при фокусе на аватаре пользовател
  var _onEnterInputPress = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      evt.stopPropagation();
      _openPopup();
    });
  };
  // Нажатие кливаши Enter при фокусе на кнопке закрытия попапа
  var _onEnterClosePress = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      evt.stopPropagation();
      _closePopup();
    });
  };

  // Запускает модуль
  var init = function () {
    CLOSE_POPUP_BTN.addEventListener('click', _closePopup);
    OPEN_POPUP_BTN.addEventListener('click', _openPopup);
    OPEN_POPUP_BTN.querySelector('.setup-open-icon').addEventListener('keyup', _onEnterInputPress);
  };

  init();

})();
