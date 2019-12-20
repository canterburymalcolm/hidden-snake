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
      width: 2,
      height: 1,
      bg: null
      //bg: 'green' 
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
    const store = this.dir;
    this.dir = prevDir;
    return store;
  }

}

class Snake {
  constructor(left, top, view) {
    this.head = new Node(left, top, Dirs.DOWN);
    this.body = [];
    this.eggs = [];
    this.fertility = 2;
  }

  update() {
    // Move each segment then pass down their direction
    // for the next update
    let prevDir = this.head.move();
    this.body.forEach(node => {
      prevDir = node.move(prevDir);
    });

    // Snakes have a gestation period of one tick
    if (this.eggs.length > 0) {
      this.body.push(this.eggs.shift());
    }
  }
  
  turn(dir) {
    this.head.dir = Dirs[dir.toUpperCase()];
  }

  grow(view) {
    const tail = this.body.length > 0 ? this.body[this.body.length - 1] : this.head;
    
    // copy the tail to be added after the next update
    for (let i = 0; i < this.fertility; i++) {
      const egg = new Node(tail.box.left, tail.box.top, tail.dir);
      this.eggs.push(egg);
      view.append(egg.box);
    }
  }

  intersects(left, top) {
    left += left % 2;
    return (left === this.head.box.left && top === this.head.box.top);
  }
  
}

module.exports = Snake;


