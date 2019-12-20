const blessed = require('blessed');
const screen = blessed.screen();

const view = blessed.box({
  left: 0,
  top: 0,
  width: screen.width,
  height: screen.height,
  tags: true,
});

screen.append(view);

const Snake = require('./snake');
let snake = new Snake(0, 0);

view.append(snake.head.box);

const text = require('./data');
const Buffer = require('./buffer');
const buffer = new Buffer(screen.width, screen.height);

const lines = text.split('\n');
let added = 0;
let line = 0;
//
//setInterval(() => {
//  if (Math.random() < .4) {
//    if (!buffer.hasNext()) {
//      buffer.addLine(lines[(line++ % lines.length)]);
//    }
//    if (buffer.filledScreen()) {
//      view.deleteTop();
//    }
//    view.pushLine(buffer.next());
//    added += added < screen.height ? 1 : 0;
//
//    screen.render();
//  }
//}, 50);
//
setInterval(() => {
  snake.update();
  screen.render();
}, 100);

screen.key(['escape', 'C-c'], (ch, key) => {
  return process.exit(0);
});

screen.key(['right', 'left', 'up', 'down'], (ch, key) => {
  snake.turn(key.name);
  screen.render();
});

screen.key('enter', (ch, key) => {
  view.append(snake.grow());
});

view.focus();

screen.render();

