class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = Array.from({ length: N }, (_, k) => k + 1);
const queue = new Queue();

for (let i = 0; i < N; i++) queue.push(arr[i]);

while (queue.size() > 1) {
  queue.pop();
  const value = queue.front();
  queue.pop();
  queue.push(value);
}

console.log(queue.front());
