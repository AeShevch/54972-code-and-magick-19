'use strict';

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
  Object.defineProperties(this, {
    'name': {
      get() {
        return this.getRandomElem(firstNames) + ' ' + this.getRandomElem(surNames);
      }
    },
    'coatColor': {
      get() {
        return this.getRandomElem(coatColors);
      }
    },
    'eyesColor': {
      get() {
        return this.getRandomElem(eyesColors);
      }
    }
  });
}

// Возвращает случайный элемент массива
Hero.prototype.getRandomElem = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var HEROES_COUNT = 4;
var heroes = [];

for (var i = 0; i < HEROES_COUNT; i++) {
  heroes.push(new Hero());
}

console.log(heroes);



