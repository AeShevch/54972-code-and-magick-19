'use strict';
(function () {
  // КОНСТАНТЫ
  // Ссылки на настраиваемые элементы героя
  var WIZARD_COAT = document.querySelector('.wizard-coat');
  var WIZARD_EYES = document.querySelector('.wizard-eyes');
  var FIREBALL = document.querySelector('.setup-fireball-wrap');

  // Шаблон, используемый для генерации вёрстки похожих героев
  var WIZARD_TEMPLATE = document.getElementById('similar-wizard-template').content.querySelector('.js-wizard-html-wrap');

  // Требуемое кол-во героев в блоке «Похожие персонажи»
  var HEROES_COUNT = 4;

  // ДАННЫЕ ДЛЯ ГЕНЕРАЦИИ ГЕРОЕВ
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

  // ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ
  // Массив для записи героев
  var heroes = [];
  // Контейнер для вёрстки похожих героев
  var fragment = document.createDocumentFragment();

  // ФУНКЦИИ
  // Функция-конструктор героев
  function Hero() {
    this.fullName = window.utils.getRandomElem(FIRST_NAMES) + ' ' + window.utils.getRandomElem(SUR_NAMES);
    this.coatColor = window.utils.getRandomElem(COAT_COLORS);
    this.eyesColor = window.utils.getRandomElem(EYES_COLORS);
  }
  // Изменяет цвет элемента и добавляет значение цвета в указнный input
  var _changeElementColor = function (item, color, inputName, type) {
    if (inputName) {
      document.querySelector('[name="' + inputName + '"]').value = color;
    }
    if (type === 'background') {
      item.style.backgroundColor = color;
    } else {
      item.style.fill = color;
    }
  };
  // Заполняяет массив heroes, указанным в константе HEROES_COUNT количеством героев
  var _prepareHeroesData = function () {
    // Создаём  и добавлям в массив требуемое кол-во героев
    for (var i = 0; i < HEROES_COUNT; i++) {
      heroes.push(new Hero());
    }
  };
  // Генерирует вёрстку героев
  var _generateHeroesHtml = function () {
    // Проходим по массиву, копируем вёрстку из шаблона, изменяем её, вставляем в фрагмент
    heroes.forEach(function (hero) {
      var wizardHtml = WIZARD_TEMPLATE.cloneNode(true);

      _changeElementColor(
          wizardHtml.querySelector('.js-wizard-coat'),
          'rgb(' + hero.coatColor + ')',
          false,
          'fill'
      );
      _changeElementColor(
          wizardHtml.querySelector('.js-wizard-eyes'),
          hero.eyesColor,
          false,
          'fill'
      );

      wizardHtml.querySelector('.js-wizard-full-name').textContent = hero.fullName;

      fragment.appendChild(wizardHtml);
    });
  };
  // Вставляет вёрстку героев в блок «Похожие персонажи» и показывает его
  var _initSimilarWizards = function () {
    // Находим необходимый узел и вставялем в него фрагмент со всей вёрсткой
    document.querySelector('.js-insert-wizards').appendChild(fragment);
    // Находим главный контейнер и показываем его
    document.querySelector('.js-similar-wizards-container').classList.remove('hidden');
  };
  // Вешает хэндлеры
  var _setHandlers = function () {
    // Изменение цвета мантии
    WIZARD_COAT.addEventListener('click', function (evt) {
      _changeElementColor(
          evt.currentTarget,
          'rgb(' + window.utils.getRandomElem(COAT_COLORS) + ')',
          'coat-color'
      );
    });
    // Изменение цвета глаз
    WIZARD_EYES.addEventListener('click', function (evt) {
      _changeElementColor(
          evt.currentTarget,
          window.utils.getRandomElem(EYES_COLORS),
          'eyes-color'
      );
    });
    // Изменение цвета фаербола
    FIREBALL.addEventListener('click', function (evt) {
      _changeElementColor(
          evt.currentTarget,
          window.utils.getRandomElem(FIREBALL_COLORS),
          'fireball-color',
          'background'
      );
    });
  };

  // Запускает выполнение модуля
  var init = function () {
    _prepareHeroesData();
    _generateHeroesHtml();
    _initSimilarWizards();
    _setHandlers();
  };

  init();

})();
