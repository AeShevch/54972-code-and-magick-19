'use strict';

// Показываем блок с настройками
document.querySelector('.js-setup-toggle').classList.remove('hidden');

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

function Hero() {
  this.fullName = this.getRandomElem(firstNames) + ' ' + this.getRandomElem(surNames);
  this.coatColor = this.getRandomElem(coatColors);
  this.eyesColor = this.getRandomElem(eyesColors);
}

// Возвращает случайный элемент массива
Hero.prototype.getRandomElem = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

// Требуемое кол-во героев
var HEROES_COUNT = 4;

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


