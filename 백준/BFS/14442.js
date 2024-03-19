class Node {
  constructor(x, y, w, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.c = c;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    if (this.length === 0) return true;
    else return false;
  }

  push(x, y, w, c) {
    let node = new Node(x, y, w, c);
    if (this.length === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  popleft() {
    let item = this.head;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return item;
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [str, ...arr] = input;
const [N, M, K] = str.split(' ').map(Number);
const board = arr.map((row) => row.split('').map(Number));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const queue = new Deque();
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array.from({ length: K + 1 }, () => Infinity))
);

const bfs = () => {
  queue.push(0, 0, 0, 1);
  visited[0][0][0] = 1;

  while (!queue.isEmpty()) {
    const { x, y, w, c } = queue.popleft();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

      if (board[nx][ny] === 0 && visited[nx][ny][w] === Infinity) {
        visited[nx][ny][w] = visited[x][y][w] + 1;
        queue.push(nx, ny, w, c + 1);
      }

      if (board[nx][ny] === 1 && w < K && visited[nx][ny][w + 1] === Infinity) {
        visited[nx][ny][w + 1] = visited[x][y][w] + 1;
        queue.push(nx, ny, w + 1, c + 1);
      }
    }
  }
};

bfs();
const answer = Math.min(...visited[N - 1][M - 1]);
console.log(answer === Infinity ? -1 : answer);
