const blessed = require('blessed');

const Dirs = Object.freeze({
  RIGHT: 1,
  LEFT: 2,
  UP: 3,
  DOWN: 4
});

class Node {
  constructor(left, top, dir) {
    this.box = blessed.box({
      left: left,
      top: top,
      width: 1,
      height: 1,
      bg: 'green' 
    });
    this.dir = dir;
  }

  move(prevDir = this.dir) {
    switch(this.dir) {
      case Dirs.RIGHT:
        this.box.left += 2;
        break;
      case Dirs.LEFT:
        this.box.left -= 2;
        break;
      case Dirs.UP:
        this.box.top -= 1;
        break;
      case Dirs.DOWN:
        this.box.top += 1;
        break;
    }
    this.dir = prevDir;
  }

}

class Snake {
  constructor(left, top) {
    this.head = new Node(left, top, Dirs.DOWN);
    this.body = [];
  }

  update(egg) {
    let prevDir = this.head.move();
    this.body.forEach(node => {
      prevDir = node.move(prevDir);
    });
    if (egg) {
      this.body.push(egg);
    }
  }
  
  turn(dir) {
    this.head.dir = Dirs[dir.toUpperCase()];
  }

  grow() {
    const last = this.body.length > 0 ? this.body[this.body.length - 1] : this.head;
    
    const egg = new Node(last.box.left, last.box.right, last.dir);
    this.update(egg);
    return egg.box;
  }
  
}

module.exports = Snake;


