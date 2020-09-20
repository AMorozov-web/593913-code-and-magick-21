'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const X_INDENT = 20;
const Y_INDENT = 20;
const GAP = 10;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const MAX_BAR_HEIGHT = 150;
const BASE_TEXT_COLOR = `#000`;
const BASE_CLOUD_COLOR = `#fff`;
const BASE_BAR_COLOR = `rgba(255, 0, 0, 1)`;
const SHADOW_COLOR = `rgba(0, 0, 0, 0.3)`;
const BASE_FONT = `16px PT Mono`;
const FIRST_WIN_STRING = `Ура вы победили!`;
const SECOND_WIN_STRING = `Список результатов:`;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getBarColor = function (name) {
  return (name === `Вы`) ? BASE_BAR_COLOR : `hsl(240, ${Math.floor(Math.random() * 100)}%, 50%)`;
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, BASE_CLOUD_COLOR);

  ctx.fillStyle = BASE_TEXT_COLOR;
  ctx.font = BASE_FONT;
  ctx.fillText(FIRST_WIN_STRING, CLOUD_X + X_INDENT, CLOUD_Y + Y_INDENT + GAP);
  ctx.fillText(SECOND_WIN_STRING, CLOUD_X + X_INDENT, CLOUD_Y + Y_INDENT + GAP * 3);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    const currentOffsetX = X_INDENT * 2 + (BAR_GAP + BAR_WIDTH) * i;

    ctx.fillStyle = BASE_TEXT_COLOR;
    ctx.fillText(players[i], CLOUD_X + currentOffsetX, CLOUD_Y + CLOUD_HEIGHT - Y_INDENT);
    ctx.fillText(
        Math.floor(times[i]),
        CLOUD_X + currentOffsetX,
        CLOUD_Y + CLOUD_HEIGHT - Y_INDENT * 2 - (MAX_BAR_HEIGHT * times[i] / maxTime) - GAP
    );

    ctx.fillStyle = getBarColor(players[i]);

    ctx.fillRect(
        CLOUD_X + currentOffsetX,
        CLOUD_Y + CLOUD_HEIGHT - Y_INDENT * 2,
        BAR_WIDTH,
        -(MAX_BAR_HEIGHT * times[i] / maxTime)
    );
  }
};
