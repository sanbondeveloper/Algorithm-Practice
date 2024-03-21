class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.front == null && this.rear === null;
  }
  insert(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) this.front = newNode;
    else this.rear.next = newNode;

    this.rear = newNode;
    this.length += 1;
  }

  remove() {
    if (this.isEmpty()) return;
    this.front = this.front.next;

    if (!this.front) this.rear = null;
    this.length -= 1;
  }

  peekFront() {
    if (this.isEmpty()) return -404;
    return this.front.data;
  }

  display() {
    if (this.isEmpty()) return;
    let curr = this.front;
    process.stdout.write('(FRONT) ');

    while (curr != this.rear) {
      process.stdout.write(`${curr.data} ---> `);
      curr = curr.next;
    }
    process.stdout.write(`${this.rear.data} (REAR)\n`);
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [str, ...arr] = input;
const [R, C] = str.split(' ').map(Number);
const board = arr.map((row) => row.split(''));
const swans = [];
const meltQueue = new Queue();
const swanQueue = new Queue();
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === 'L') {
      swans.push([i, j]);
    }

    if (board[i][j] !== 'X') {
      meltQueue.insert([i, j]);
    }
  }
}

const canMeet = () => {
  const nextQueue = new Queue();

  while (!swanQueue.isEmpty()) {
    const [x, y] = swanQueue.peekFront();
    swanQueue.remove();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (visited[nx][ny]) continue;

      visited[nx][ny] = true;
      if (nx === swans[1][0] && ny === swans[1][1]) return true;
      else if (board[nx][ny] === 'X') nextQueue.insert([nx, ny]);
      else swanQueue.insert([nx, ny]);
    }
  }

  while (!nextQueue.isEmpty()) {
    swanQueue.insert(nextQueue.peekFront());
    nextQueue.remove();
  }

  return false;
};

const melt = () => {
  const len = meltQueue.size();

  for (let i = 0; i < len; i++) {
    const [x, y] = meltQueue.peekFront();
    meltQueue.remove();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (board[nx][ny] === 'X') {
        board[nx][ny] = '.';
        meltQueue.insert([nx, ny]);
      }
    }
  }
};

swanQueue.insert(swans[0]);
visited[swans[0][0]][swans[0][1]] = true;
let answer = 0;

while (!canMeet()) {
  melt();
  answer += 1;
}

console.log(answer);
