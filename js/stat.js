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

  // Объдиняем массивы names и times,
  // чтобы получить единый объект с результатами
  var results = {};
  names.forEach(function (name, i) {
    results[name] = times[i];
  });

  // Начинаем рисовать
  // Тень
  ctx.beginPath();
  ctx.rect(
      CLOUD_POSITION_X + SHADOW_OFFSET,
      CLOUD_POSITION_Y + SHADOW_OFFSET,
      CLOUD_WIDTH, CLOUD_HEIGHT
  );
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fill();

  // Облако
  ctx.beginPath();
  ctx.rect(
      CLOUD_POSITION_X,
      CLOUD_POSITION_Y,
      CLOUD_WIDTH,
      CLOUD_HEIGHT
  );
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Текст
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_POSITION_X + CLOUD_PADDING,
      CLOUD_POSITION_Y + CLOUD_PADDING
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_POSITION_X + CLOUD_PADDING,
      CLOUD_POSITION_Y + CLOUD_PADDING + LINE_HEIGHT
  );

  // Гистограмма времён участников
  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.strokeRect(
      CLOUD_POSITION_X + CLOUD_PADDING,
      CLOUD_POSITION_Y + CLOUD_PADDING + 2 * LINE_HEIGHT,
      CLOUD_WIDTH - 2 * CLOUD_PADDING,
      CLOUD_HEIGHT - 2 * CLOUD_PADDING - 2 * LINE_HEIGHT
  );

  // TODO Refactor: повыносить в константы все повторяющиеся значения
  // Сделать функцию создания прямоуголников
};
