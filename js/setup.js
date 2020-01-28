'use strict';

document.querySelector('.js-setup-toggle').classList.remove('hidden');

function Hero() {
  Object.defineProperties(this, {
    'name': {
      get() {
        return this.getRandomElem(this.firstNames) + ' ' + this.getRandomElem(this.surNames);
      }
    },
    'coatColor': {
      get() {
        return this.getRandomElem(this.coatColors);
      }
    },
    'eyesColor': {
      get() {
        return this.getRandomElem(this.eyesColors);
      }
    }
  });
}

// Добавляем в прототип информацию и методы, необходимые для создания объекта
// Все имена
Hero.prototype.firstNames = [
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
Hero.prototype.surNames = [
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
Hero.prototype.coatColors = [
  '101, 137, 164',
  '241, 43, 107',
  '146, 100, 161',
  '56, 159, 117',
  '215, 210, 55',
  '0, 0, 0'
];
// Все цвета глаз
Hero.prototype.eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
// Возвращает стандартный элемент массива
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



