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

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getBarColor = function () {
  return `hsl(240, ` + Math.floor(Math.random() * Math.floor(100)) + `%, 50%)`;
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + X_INDENT,
      CLOUD_Y + Y_INDENT + GAP
  );
  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + X_INDENT,
      CLOUD_Y + Y_INDENT + GAP * 3
  );

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    ctx.fillText(
        players[i],
        CLOUD_X + X_INDENT * 2 + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - Y_INDENT
    );

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = getBarColor();
    }

    ctx.fillRect(
        CLOUD_X + X_INDENT * 2 + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - Y_INDENT * 2,
        BAR_WIDTH,
        -(MAX_BAR_HEIGHT * times[i] / maxTime)
    );

    ctx.fillStyle = `#000`;

    ctx.fillText(
        Math.floor(times[i]),
        CLOUD_X + X_INDENT * 2 + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - Y_INDENT * 2 - (MAX_BAR_HEIGHT * times[i] / maxTime) - GAP
    );
  }
};
