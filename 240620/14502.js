class Queue {
  constructor() {
    this.dat = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.dat[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.dat[this.head];
  }

  rear() {
    return this.dat[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = Array.from({ length: N }, () => Array(M).fill(null));
for (let i = 1; i <= N; i++) {
  const temp = input[i].split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    map[i - 1][j] = temp[j];
  }
}
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;

function bfs() {
  const copy = Array.from({ length: N }, () => Array(M).fill(null));
  const queue = new Queue();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      copy[i][j] = map[i][j];
      if (copy[i][j] === 2) queue.push([i, j]);
    }
  }

  while (!queue.isEmpty()) {
    const [x, y] = queue.front();
    queue.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (copy[nx][ny] !== 0) continue;

      copy[nx][ny] = 2;
      queue.push([nx, ny]);
    }
  }

  answer = Math.max(answer, [].concat(...copy).filter((el) => el === 0).length);
}

function dfs(cnt) {
  if (cnt === 3) {
    bfs();
    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] !== 0) continue;

      map[i][j] = 1;
      dfs(cnt + 1);
      map[i][j] = 0;
    }
  }
}

dfs(0);
console.log(answer);
