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
  var HISTOGRAM_PADDING = 20;

  var cloudInnerX = CLOUD_POSITION_X + CLOUD_PADDING;
  var cloudInnerY = CLOUD_POSITION_Y + CLOUD_PADDING;

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
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText(
      'Ура вы победили!',
      cloudInnerX,
      cloudInnerY
  );
  ctx.fillText(
      'Список результатов:',
      cloudInnerX,
      cloudInnerY + LINE_HEIGHT
  );

  // Гистограмма времён участников
  // Координаты и размеры контейнера
  var histogramWrapX = cloudInnerX;
  var histogramWrapY = cloudInnerY + 2 * LINE_HEIGHT;
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
      '#000'
  );

  // Сортируем результаты по убыванию, чтобы найти максимальное значение
  var sortedTimes = times.slice().sort(function (a, b) {
    return b - a;
  });
  // Берём максимальное значение за 100% и высчитываем 1%
  var onePercent = sortedTimes[0].toFixed(1) / 100;

  // TODO Refactor - прибраться, написать комментарии, понять зачем нужно каждый раз указывать цвет текста, понять где нужны переменные, а где константы
  // TODO Как отображать результаты игрока первым??
  // TODO Узнать у Захара можно ли оставить размер диаграммы резиновой

  names.forEach(function (name, i) {
    var columnHeight = HISTOGRAM_INNER_HEIGHT * (times[i] / onePercent) / 100;

    var columnPosX = HISTOGRAM_INNER_X + i * (COLUMN_INDENT + COLUMN_WIDTH);
    var columnPosY = HISTOGRAM_INNER_Y + HISTOGRAM_INNER_HEIGHT - columnHeight;

    var resultBarPosY = columnPosY + LINE_HEIGHT;
    var resultBarHeight = columnHeight - 2 * LINE_HEIGHT;

    var nameTextPosY = resultBarPosY + resultBarHeight + LINE_HEIGHT;

    var columnColor = 'hsl(240, 100%,' +  Math.random() * 100 + '%)';
    if (name === 'Вы') {
       columnColor = MAIN_COLUMN_COLOR;
    }

    ctx.beginPath();

    ctx.fillStyle = '#000';
    ctx.fillText(
      Math.round(times[i]).toString(),
      columnPosX,
      columnPosY
    );

    createFillRect(
      ctx,
      columnPosX,
      resultBarPosY,
      COLUMN_WIDTH,
      resultBarHeight,
      columnColor
    );

    ctx.fillStyle = '#000';
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
