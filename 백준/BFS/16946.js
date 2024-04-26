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

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split('').map(Number));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const area = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => -1)
);
let group_idx = 0;
const counter = [];
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
const answer = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
);

function bfs(x, y) {
  const queue = new Queue();
  queue.insert([x, y]);
  let cnt = 1;
  area[x][y] = group_idx;
  visited[x][y] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.peekFront();
    queue.remove();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 1 || visited[nx][ny]) continue;

      visited[nx][ny] = true;
      area[nx][ny] = group_idx;
      queue.insert([nx, ny]);
      cnt += 1;
    }
  }

  counter.push(cnt);
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1 || visited[i][j]) continue;

    bfs(i, j);
    group_idx += 1;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 0) continue;

    const set = new Set();

    for (let k = 0; k < 4; k++) {
      const nx = i + dir[k][0];
      const ny = j + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 1 || set.has(area[nx][ny])) continue;

      set.add(area[nx][ny]);
      answer[i][j] += counter[area[nx][ny]];
    }

    answer[i][j] += 1;
    answer[i][j] %= 10;
  }
}

console.log(answer.map((row) => row.join('')).join('\n'));
