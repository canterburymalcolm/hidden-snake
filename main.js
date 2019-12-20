const blessed = require('blessed');
const screen = blessed.screen();

const text = require('./data');
const Buffer = require('./buffer');
const buffer = new Buffer(screen.width, screen.height);

const view = blessed.box({
  left: 0,
  top: 0,
  width: screen.width,
  height: screen.height,
  tags: true,
});

const Snake = require('./snake');
const snake = new Snake(0, 0, view);

const cursor = blessed.box({
  left: 0,
  top: screen.height - 1,
  width: 1,
  height: 1,
  style: {
    //bg: '#839496',
    bg: 'white',
    transparent: true
  }
});

screen.append(view);

view.append(snake.head.box);
view.append(cursor);

const genCords = () => {
  return [
    Math.floor(Math.random() * (screen.width - 1)), 
    Math.floor(Math.random() * (screen.height - 1))
  ];
}

const lines = text.split('\n');
let added = 0;
let line = 0;

setInterval(() => {
  if (Math.random() < .4) {
    if (!buffer.hasNext()) {
      buffer.addLine(lines[(line++ % lines.length)]);
    }
    if (buffer.filledScreen()) {
      view.deleteTop();
    }
    view.pushLine(buffer.next());
    added += added < screen.height ? 1 : 0;

    screen.render();
  }
}, 50);

setInterval(() => {
  if (snake.intersects(cursor.left, cursor.top)) {
    [cursor.left, cursor.top] = genCords();
    snake.grow(view);
  }
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
  snake.grow(view);
  screen.render();
});

view.focus();

screen.render();

