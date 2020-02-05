'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var POPUP = document.querySelector('.js-setup-toggle');

var CLOSE_POPUP_BTN = POPUP.querySelector('.setup-close');
var OPEN_POPUP_BTN = document.querySelector('.setup-open');
var SAVE_POPUP_BTN = POPUP.querySelector('.setup-submit');

var WIZARD_COAT = document.querySelector('.wizard-coat');
var WIZARD_EYES = document.querySelector('.wizard-eyes');
// var FIREBALL = document.querySelector('.setup-fireball-wrap');

// Требуемое кол-во героев
var HEROES_COUNT = 4;

// Все имена
var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
// Все фамилии
var surNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
// Все цвета мантии (rgb)
var coatColors = [
  '101, 137, 164',
  '241, 43, 107',
  '146, 100, 161',
  '56, 159, 117',
  '215, 210, 55',
  '0, 0, 0'
];
// Все цвета глаз
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Возвращает случайный элемент массива
var getRandomElem = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var changeSvgColor = function (item, color) {
  item.style.fill = color;
};

function Hero() {
  this.fullName = getRandomElem(firstNames) + ' ' + getRandomElem(surNames);
  this.coatColor = getRandomElem(coatColors);
  this.eyesColor = getRandomElem(eyesColors);
}

// Создаём массив и добавлям в него требуемое кол-во героев
var heroes = [];
for (var i = 0; i < HEROES_COUNT; i++) {
  heroes.push(new Hero());
}

// Генерируем вёрстку
// Берём шаблон
var template = document.getElementById('similar-wizard-template').content.querySelector('.js-wizard-html-wrap');
// Создаём контейнер для вёрстки
var fragment = document.createDocumentFragment();
// Проходим по массиву, копируем вёрстку из шаблона, изменяем её, вставляем в фрагмент
heroes.forEach(function (hero) {
  var wizardHtml = template.cloneNode(true);

  wizardHtml.querySelector('.js-wizard-coat').setAttribute('fill', 'rgb(' + hero.coatColor + ')');
  wizardHtml.querySelector('.js-wizard-eyes').setAttribute('fill', hero.eyesColor);
  wizardHtml.querySelector('.js-wizard-full-name').textContent = hero.fullName;

  fragment.appendChild(wizardHtml);
});

// Находим необходимый узел и вставялем в него фрагмент со всей вёрсткой
document.querySelector('.js-insert-wizards').appendChild(fragment);

// Находим главный контейнер и показываем его
document.querySelector('.js-similar-wizards-container').classList.remove('hidden');

var openPopup = function () {
  POPUP.classList.remove('hidden');
  document.addEventListener('keyup', onPopupEscPress);
  POPUP.querySelector('.setup-user-name').addEventListener('keyup', function (evt) {
    evt.stopPropagation();
  });
};

var closePopup = function () {
  POPUP.classList.add('hidden');
  document.removeEventListener('keyup', onPopupEscPress);
  document.removeEventListener('keyup', onEnterInputPress);
  document.removeEventListener('keyup', onEnterClosePress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var onEnterInputPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    evt.stopPropagation();
    openPopup();
  }
};

var onEnterClosePress = function (evt) {
  if (evt.key === ENTER_KEY) {
    evt.stopPropagation();
    closePopup();
  }
};

CLOSE_POPUP_BTN.addEventListener('click', function () {
  closePopup();
});

OPEN_POPUP_BTN.addEventListener('click', function () {
  openPopup();
});

OPEN_POPUP_BTN.querySelector('.setup-open-icon').addEventListener('keyup', onEnterInputPress);

CLOSE_POPUP_BTN.addEventListener('keyup', onEnterClosePress);

WIZARD_COAT.addEventListener('click', function (evt) {
  changeSvgColor(evt.currentTarget, 'rgb(' + getRandomElem(coatColors) + ')');
});

WIZARD_EYES.addEventListener('click', function (evt) {
  changeSvgColor(evt.currentTarget, getRandomElem(eyesColors));
});


