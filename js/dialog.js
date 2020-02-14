'use strict';
(function () {
  var POPUP = document.querySelector('.js-setup-toggle');
  var CLOSE_POPUP_BTN = POPUP.querySelector('.setup-close');
  var OPEN_POPUP_BTN = document.querySelector('.setup-open');

  var openPopup = function () {
    POPUP.classList.remove('hidden');
    document.addEventListener('keyup', onPopupEscPress);
    CLOSE_POPUP_BTN.addEventListener('keyup', onEnterClosePress);
    POPUP.querySelector('.setup-user-name').addEventListener('keyup', function (evt) {
      evt.stopPropagation();
    });
  };

  var closePopup = function () {
    POPUP.classList.add('hidden');
    document.removeEventListener('keyup', onPopupEscPress);
    document.removeEventListener('keyup', onEnterClosePress);
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscapeEvent(evt, closePopup);
  };

  var onEnterInputPress = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      evt.stopPropagation();
      openPopup();
    });
  };

  var onEnterClosePress = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      evt.stopPropagation();
      closePopup();
    });
  };

  // Открытие/закрытие попапа
  CLOSE_POPUP_BTN.addEventListener('click', closePopup);
  OPEN_POPUP_BTN.addEventListener('click', openPopup);
  OPEN_POPUP_BTN.querySelector('.setup-open-icon').addEventListener('keyup', onEnterInputPress);

})();
