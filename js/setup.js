'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var POPUP = document.querySelector('.js-setup-toggle');
var CLOSE_POPUP_BTN = POPUP.querySelector('.setup-close');
var OPEN_POPUP_BTN = document.querySelector('.setup-open');

var WIZARD_COAT = document.querySelector('.wizard-coat');
var WIZARD_EYES = document.querySelector('.wizard-eyes');
var FIREBALL = document.querySelector('.setup-fireball-wrap');

var WIZARD_TEMPLATE = document.getElementById('similar-wizard-template').content.querySelector('.js-wizard-html-wrap');

// Требуемое кол-во героев
var HEROES_COUNT = 4;

// Все имена
var FIRST_NAMES = [
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
var SUR_NAMES = [
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
var COAT_COLORS = [
  '101, 137, 164',
  '241, 43, 107',
  '146, 100, 161',
  '56, 159, 117',
  '215, 210, 55',
  '0, 0, 0'
];
// Все цвета глаз
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
// Все цвета фаербола
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

function Hero() {
  this.fullName = getRandomElem(FIRST_NAMES) + ' ' + getRandomElem(SUR_NAMES);
  this.coatColor = getRandomElem(COAT_COLORS);
  this.eyesColor = getRandomElem(EYES_COLORS);
}

// Возвращает случайный элемент массива
var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var changeElementColor = function (item, color, inputName, type) {
  if (inputName) {
    document.querySelector('[name="' + inputName + '"]').value = color;
  }
  if (type === 'background') {
    item.style.backgroundColor = color;
  } else {
    item.style.fill = color;
  }
};

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

// Создаём массив и добавлям в него требуемое кол-во героев
var heroes = [];
for (var i = 0; i < HEROES_COUNT; i++) {
  heroes.push(new Hero());
}

// Генерируем вёрстку
// Создаём контейнер для вёрстки
var fragment = document.createDocumentFragment();
// Проходим по массиву, копируем вёрстку из шаблона, изменяем её, вставляем в фрагмент
heroes.forEach(function (hero) {
  var wizardHtml = WIZARD_TEMPLATE.cloneNode(true);

  changeElementColor(
      wizardHtml.querySelector('.js-wizard-coat'),
      'rgb(' + hero.coatColor + ')',
      false,
      'fill'
  );
  changeElementColor(
      wizardHtml.querySelector('.js-wizard-eyes'),
      hero.eyesColor,
      false,
      'fill'
  );

  wizardHtml.querySelector('.js-wizard-full-name').textContent = hero.fullName;

  fragment.appendChild(wizardHtml);
});

// Находим необходимый узел и вставялем в него фрагмент со всей вёрсткой
document.querySelector('.js-insert-wizards').appendChild(fragment);

// Находим главный контейнер и показываем его
document.querySelector('.js-similar-wizards-container').classList.remove('hidden');

// Открытие/закрытие попапа
CLOSE_POPUP_BTN.addEventListener('click', closePopup);
OPEN_POPUP_BTN.addEventListener('click', openPopup);
OPEN_POPUP_BTN.querySelector('.setup-open-icon').addEventListener('keyup', onEnterInputPress);

// Изменение цвета мантии
WIZARD_COAT.addEventListener('click', function (evt) {
  changeElementColor(
      evt.currentTarget,
      'rgb(' + getRandomElem(COAT_COLORS) + ')',
      'coat-color'
  );
});
// Изменение цвета глаз
WIZARD_EYES.addEventListener('click', function (evt) {
  changeElementColor(
      evt.currentTarget,
      getRandomElem(EYES_COLORS),
      'eyes-color'
  );
});
// Изменение цвета фаербола
FIREBALL.addEventListener('click', function (evt) {
  changeElementColor(
      evt.currentTarget,
      getRandomElem(FIREBALL_COLORS),
      'eyes-color',
      'background'
  );
});
