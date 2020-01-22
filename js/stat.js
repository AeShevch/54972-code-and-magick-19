'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Константы
  var CLOUD_POSITION_X = 100;
  var CLOUD_POSITION_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var SHADOW_OFFSET = 10;

  // Объдиняем массивы names и times,
  // чтобы получить единый объект с результатами
  var results = {};
  names.forEach(function (name, i) {
    results[name] = times[i];
  });

  // Начинаем рисовать
  // Тень
  ctx.beginPath();
  ctx.rect(CLOUD_POSITION_X + SHADOW_OFFSET, CLOUD_POSITION_Y + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = '#000';
  ctx.fill();

  // Облако
  ctx.beginPath();
  ctx.rect(CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fill();

};
