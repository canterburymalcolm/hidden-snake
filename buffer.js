class Buffer {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.line = null;
    this.queue = [];
    this.lines = [];
    this.max = 100;
    this.added = 0;
  }

  hasNext() {
    return this.queue.length > 0;
  }

  next() {
    this.added++;
    const next = this.queue.shift() || '';

    this.lines.push(next);
    if (this.lines.length > this.max) {
      this.lines.splice(0, 20);
    }

    return next;
  }

  addLine(line) {
    while (line.length >= this.width) {
      const first = line.slice(0, this.width)
      line = line.slice(this.width);
      
      this.queue.push(first);
    }
    this.queue.push(line);
  }

  filledScreen() {
    return this.added >= this.height;
  }
}

module.exports = Buffer;
