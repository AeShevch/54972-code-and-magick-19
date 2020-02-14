'use strict';
(function () {
  // КОНСТАНТЫ

  // ТЕКСТ
  // Цвет текста
  var MAIN_TEXT_COLOR = '#000';
  // Высота строки текста
  var LINE_HEIGHT = 18;

  // ПОПАП
  // Расположение и размеры, а также внутренний отступ попапа с результатами
  var CLOUD_POSITION_X = 100;
  var CLOUD_POSITION_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_PADDING = 25;
  // Внутренняя область попапа
  var CLOUD_INNER_X = CLOUD_POSITION_X + CLOUD_PADDING;
  var CLOUD_INNER_Y = CLOUD_POSITION_Y + CLOUD_PADDING;
  // Отступ тени по x и y
  var SHADOW_OFFSET = 10;

  // ВНЕШНИЙ КОНТЕЙНЕР ГИСТОГРАММЫ
  // Необходимо определить оставшееся свободное место в попапе для блока с гистограммой и его координаты
  // В попапе две строки текста
  var LINES_COUNT_IN_CLOUD = 2;
  // И два падинга слева и два справа
  var PADDINGS_COUNT_IN_CLOUD = 2;
  // Координата контейнера по X
  var HISTOGRAM_WRAP_X = CLOUD_INNER_X;
  // Координата контейнера по Y (Координата внутреннего блока попапа +2 строки текста)
  var HISTOGRAM_WRAP_Y = CLOUD_INNER_Y + LINES_COUNT_IN_CLOUD * LINE_HEIGHT;
  // Ширина контейнера (Ширина попапа минус два падинга)
  var HISTOGRAM_WIDTH = CLOUD_WIDTH - PADDINGS_COUNT_IN_CLOUD * CLOUD_PADDING;
  // Высота контейнера (Высота попапа минус два падинга - минус две строки текста)
  var HISTOGRAM_HEIGHT = CLOUD_HEIGHT - PADDINGS_COUNT_IN_CLOUD * CLOUD_PADDING - LINES_COUNT_IN_CLOUD * LINE_HEIGHT;

  // ВНУТРЕННИЙ КОНТЕЙНЕР ГИСТОГРАММЫ
  // Внутренний отступ контейнера
  var HISTOGRAM_PADDING = 15;
  // Координаты контейнера по x и y (Координаты внешнего контейнера +2 паддинга)
  var HISTOGRAM_INNER_Y = HISTOGRAM_WRAP_Y + HISTOGRAM_PADDING;
  var HISTOGRAM_INNER_X = HISTOGRAM_WRAP_X + HISTOGRAM_PADDING;
  // В контейнере два паддинга
  var PADDINGS_COUNT_IN_HISTOGRAM = 2;
  // Высота контейнера (Высота внешнего контейнера -2 паддинга)
  var HISTOGRAM_INNER_HEIGHT = HISTOGRAM_HEIGHT - PADDINGS_COUNT_IN_HISTOGRAM * HISTOGRAM_PADDING;
  // Количество строк в конейнера (2 строки текста + 1 для отступа)
  // Необходимо для расчёта высоты колонок
  var LINES_COUNT_IN_HISTOGRAM = 3;
  // Ширина колонок с результатами
  var COLUMN_WIDTH = 40;
  // Отступы между колонками
  var COLUMN_INDENT = 50;
  // Цвет колонки текущего пользователя
  var MAIN_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

  // ФУНКЦИИ
  // Находит значения соответствующие пользователю в массивах времён и результатов и переносит их в начало
  var moveUserToStart = function (names, times) {
    // Узнаём индекс имени игрока в массиве names
    var userIndex = names.indexOf('Вы');

    // Перемещаем имя и результат в начало массивов
    window.utils.moveElemToStartOfArray(userIndex, names);
    window.utils.moveElemToStartOfArray(userIndex, times);
  };
  // Получает значение одного процента максимального размера колонки гистограммы для того,
  // чтобы можно было расчитать размеры других колонок
  var getOnePercentValueOfMaxColumnWidth = function (times) {
    // Сортируем результаты по убыванию, чтобы найти максимальное значение
    var sortedTimes = times.slice().sort(function (a, b) {
      return b - a;
    });
    // Берём максимальное значение за 100% и высчитываем 1%
    return parseInt(sortedTimes[0], 10).toFixed(1) / 100;
  };
  // Рисует гистограмму
  var createHistogramColumns = function (names, times, ctx) {
    names.forEach(function (name, i) {
      // Высота колонки это максимальная высота, умноженная на процент данного значения результата от максимального
      var columnHeight = HISTOGRAM_INNER_HEIGHT * (times[i] / getOnePercentValueOfMaxColumnWidth(times)) / 100;
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
  // Рисует залитый прямоугольник
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
  // Рисует рамку
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

  // ИНТЕРФЕЙС МОДУЛЯ
  window.renderStatistics = function (ctx, names, times) {
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

    moveUserToStart(names, times);
    createHistogramColumns(names, times, ctx)
  };
})();
