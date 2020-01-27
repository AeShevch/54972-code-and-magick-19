'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Константы
  var CLOUD_POSITION_X = 100;
  var CLOUD_POSITION_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var SHADOW_OFFSET = 10;
  var LINE_HEIGHT = 18;
  var CLOUD_PADDING = 25;
  var COLUMN_WIDTH = 40;
  var COLUMN_INDENT = 50;
  var MAIN_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
  var HISTOGRAM_PADDING = 15;
  var MAIN_TEXT_COLOR = '#000';

  var CLOUD_INNER_X = CLOUD_POSITION_X + CLOUD_PADDING;
  var CLOUD_INNER_Y = CLOUD_POSITION_Y + CLOUD_PADDING;

  // Гистограмма времён участников
  // Координаты и размеры контейнера
  var LINES_COUNT_IN_CLOUD = 2;
  var PADDINGS_COUNT_IN_CLOUD = 2;

  var HISTOGRAM_WRAP_X = CLOUD_INNER_X;
  var HISTOGRAM_WRAP_Y = CLOUD_INNER_Y + LINES_COUNT_IN_CLOUD * LINE_HEIGHT;
  var HISTOGRAM_WIDTH = CLOUD_WIDTH - PADDINGS_COUNT_IN_CLOUD * CLOUD_PADDING;
  var HISTOGRAM_HEIGHT = CLOUD_HEIGHT - PADDINGS_COUNT_IN_CLOUD * CLOUD_PADDING - LINES_COUNT_IN_CLOUD * LINE_HEIGHT;

  var LINES_COUNT_IN_HISTOGRAM = 3;
  var PADDINGS_COUNT_IN_HISTOGRAM = 2;

  var HISTOGRAM_INNER_Y = HISTOGRAM_WRAP_Y + HISTOGRAM_PADDING;
  var HISTOGRAM_INNER_X = HISTOGRAM_WRAP_X + HISTOGRAM_PADDING;
  var HISTOGRAM_INNER_HEIGHT = HISTOGRAM_HEIGHT - PADDINGS_COUNT_IN_HISTOGRAM * HISTOGRAM_PADDING;

  // Начинаем рисовать
  // Тень
  createFillRect(
      ctx,
      CLOUD_POSITION_X + SHADOW_OFFSET,
      CLOUD_POSITION_Y + SHADOW_OFFSET,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      'rgba(0, 0, 0, 0.7)'
  );

  // Облако
  createFillRect(
      ctx,
      CLOUD_POSITION_X,
      CLOUD_POSITION_Y,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      '#fff'
  );

  // Пишем заголовки

  ctx.font = '16px PT Mono';
  ctx.fillStyle = MAIN_TEXT_COLOR;
  ctx.textBaseline = 'hanging';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_INNER_X,
      CLOUD_INNER_Y
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_INNER_X,
      CLOUD_INNER_Y + LINE_HEIGHT
  );


  // Рамка гистограммы
  createStrokeRect(
      ctx,
      HISTOGRAM_WRAP_X,
      HISTOGRAM_WRAP_Y,
      HISTOGRAM_WIDTH,
      HISTOGRAM_HEIGHT,
      MAIN_TEXT_COLOR
  );

  // Узнаём индекс имени игрока в массиве names
  var userIndex = names.indexOf('Вы');

  // Перемещаем имя и результат в начало массивов
  moveElemToStartOfArray(userIndex, names);
  moveElemToStartOfArray(userIndex, times);

  // Сортируем результаты по убыванию, чтобы найти максимальное значение
  var sortedTimes = times.slice().sort(function (a, b) {
    return b - a;
  });
  // Берём максимальное значение за 100% и высчитываем 1%
  var onePercent = parseInt(sortedTimes[0], 10).toFixed(1) / 100;

  names.forEach(function (name, i) {
    // Высота колонки это максимальная высота, умноженная на процент данного значения результата от максимального
    var columnHeight = HISTOGRAM_INNER_HEIGHT * (times[i] / onePercent) / 100;
    // Позиция по X это координата левой границы контейнера + отступ и ширина колонки в количестве равном порядковому номеру колонки
    var columnPosX = HISTOGRAM_INNER_X + i * (COLUMN_INDENT + COLUMN_WIDTH);
    // Позиция по Y это верхняя граница контейнера + его высота и минус высота колонки
    var columnPosY = HISTOGRAM_INNER_Y + HISTOGRAM_INNER_HEIGHT - columnHeight;

    // Позиция бара по Y это верхняя граница колонки + высота текста с количеством секунд
    var resultBarPosY = columnPosY + LINE_HEIGHT;
    // Высота бара это высота колонки минус высота трёх строк текста - с именем, количеством секунд, и дополнительным отступом
    var resultBarHeight = columnHeight - LINES_COUNT_IN_HISTOGRAM * LINE_HEIGHT;

    // Позиция по Y строки с именем равна позиции бара + его высота и + высота строки для отступа
    var nameTextPosY = resultBarPosY + resultBarHeight + LINE_HEIGHT;

    // Цвет бара синий с рандомной насыщенностью
    var columnColor = 'hsl(240, 100%,' + Math.random() * 100 + '%)';
    // А для юзера красный
    if (name === 'Вы') {
      columnColor = MAIN_COLUMN_COLOR;
    }

    ctx.beginPath();

    // Строка с количеством секунд
    ctx.fillStyle = MAIN_TEXT_COLOR;
    ctx.fillText(
        Math.round(times[i]).toString(),
        columnPosX,
        columnPosY
    );

    // Бар результата
    createFillRect(
        ctx,
        columnPosX,
        resultBarPosY,
        COLUMN_WIDTH,
        resultBarHeight,
        columnColor
    );

    // Строка с именем игрока
    ctx.fillStyle = MAIN_TEXT_COLOR;
    ctx.fillText(
        name,
        columnPosX,
        nameTextPosY
    );

    ctx.closePath();
  });

};

var createFillRect = function (ctx, posX, posY, width, height, color) {
  ctx.beginPath();
  ctx.rect(
      posX,
      posY,
      width,
      height
  );
  ctx.fillStyle = color;
  ctx.fill();
};

var createStrokeRect = function (ctx, posX, posY, width, height, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.strokeRect(
      posX,
      posY,
      width,
      height
  );
};

var moveElemToStartOfArray = function (index, arr) {
  arr.splice(0, 0, arr.splice(index, 1).join(''));
};
