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

const [str, ...arr] = input;
const [R, C] = str.split(' ').map(Number);
const board = arr.map((row) => row.split(''));
const queue_hog = new Queue();
const queue_water = new Queue();
const visited_hog = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);
const visited_water = Array.from({ length: R }, () =>
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
    if (board[i][j] === '*') {
      queue_water.push([i, j, 0]);
      visited_water[i][j] = true;
      board[i][j] = 0;
    } else if (board[i][j] === 'S') {
      queue_hog.push([i, j, 0]);
      visited_hog[i][j] = true;
    }
  }
}

const bfs_water = () => {
  while (!queue_water.isEmpty()) {
    const [x, y, time] = queue_water.front();
    queue_water.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (board[nx][ny] === 'D' || board[nx][ny] === 'X') continue;
      if (visited_water[nx][ny]) continue;

      queue_water.push([nx, ny, time + 1]);
      board[nx][ny] = time + 1;
      visited_water[nx][ny] = true;
    }
  }
};

const bfs_hog = () => {
  while (!queue_hog.isEmpty()) {
    const [x, y, time] = queue_hog.front();
    queue_hog.pop();

    if (board[x][y] === 'D') {
      return console.log(time);
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (board[nx][ny] === 'X' || visited_hog[nx][ny]) continue;
      if (board[nx][ny] !== '.' && board[nx][ny] <= time + 1) continue;

      queue_hog.push([nx, ny, time + 1]);
      visited_hog[nx][ny] = true;
    }
  }

  return console.log('KAKTUS');
};

bfs_water();
bfs_hog();
