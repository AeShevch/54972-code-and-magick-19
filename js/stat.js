'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Константы
  var CLOUD_POSITION_X = 100;
  var CLOUD_POSITION_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var SHADOW_OFFSET = 10;
  var LINE_HEIGHT = 23;
  var CLOUD_PADDING = 25;
  var COLUMN_WIDTH = 40;
  var COLUMN_INDENT = 50;
  var MAIN_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
  var HISTOGRAM_PADDING = 15;
  var MAIN_TEXT_COLOR = '#000';

  var CLOUD_INNER_X = CLOUD_POSITION_X + CLOUD_PADDING;
  var CLOUD_INNER_Y = CLOUD_POSITION_Y + CLOUD_PADDING;

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

  // Гистограмма времён участников
  // Координаты и размеры контейнера
  var histogramWrapX = CLOUD_INNER_X;
  var histogramWrapY = CLOUD_INNER_Y + 2 * LINE_HEIGHT;
  var histogramWidth = CLOUD_WIDTH - 2 * CLOUD_PADDING;
  var histogramHeight = CLOUD_HEIGHT - 2 * CLOUD_PADDING - 2 * LINE_HEIGHT;

  var HISTOGRAM_INNER_Y = histogramWrapY + HISTOGRAM_PADDING;
  var HISTOGRAM_INNER_X = histogramWrapX + HISTOGRAM_PADDING;
  var HISTOGRAM_INNER_HEIGHT = histogramHeight - 2 * HISTOGRAM_PADDING;

  // Рамка гистограммы
  createStrokeRect(
      ctx,
      histogramWrapX,
      histogramWrapY,
      histogramWidth,
      histogramHeight,
      MAIN_TEXT_COLOR
  );

  // Сортируем результаты по убыванию, чтобы найти максимальное значение
  var sortedTimes = times.slice().sort(function (a, b) {
    return b - a;
  });
  // Берём максимальное значение за 100% и высчитываем 1%
  var onePercent = sortedTimes[0].toFixed(1) / 100;

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
    var resultBarHeight = columnHeight - 3 * LINE_HEIGHT;

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
