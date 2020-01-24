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

  var cloudInnerX = CLOUD_POSITION_X + CLOUD_PADDING;
  var cloudInnerY = CLOUD_POSITION_Y + CLOUD_PADDING;

  // Объдиняем массивы names и times,
  // чтобы получить единый объект с результатами
  var results = {};
  names.forEach(function (name, i) {
    results[name] = times[i];
  });

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
  // Рамка гистограммы
  createStrokeRect(
      ctx,
      cloudInnerX,
      cloudInnerY + 2 * LINE_HEIGHT,
      CLOUD_WIDTH - 2 * CLOUD_PADDING,
      CLOUD_HEIGHT - 2 * CLOUD_PADDING - 2 * LINE_HEIGHT,
      '#000'
  );
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
