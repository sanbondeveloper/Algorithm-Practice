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
const [N, M, G, R] = str.split(' ').map(Number);
const board = arr.map((row) => row.split(' ').map(Number));
const candi = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 2) {
      candi.push([i, j]);
    }
  }
}
const len = candi.length;
const visited = Array(len).fill(false);
const Gr = [];
const Re = [];
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let answer = 0;

const bfs = () => {
  let result = 0;
  const queue = new Queue();
  const temp = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => ({ color: -1, time: -1 }))
  );

  for (const v of Gr) {
    const [x, y] = candi[v];
    temp[x][y] = { color: 0, time: 0 };
    queue.insert([x, y]);
  }

  for (const v of Re) {
    const [x, y] = candi[v];
    temp[x][y] = { color: 1, time: 0 };
    queue.insert([x, y]);
  }

  while (!queue.isEmpty()) {
    const [x, y] = queue.peekFront();
    queue.remove();
    const { color, time } = temp[x][y];

    if (color === 3) continue;

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (board[nx][ny] === 0) continue;
      if (temp[nx][ny].color === -1) {
        temp[nx][ny] = { color, time: time + 1 };
        queue.insert([nx, ny]);
      } else if (temp[nx][ny].color !== 3) {
        if (temp[nx][ny].color !== color && temp[nx][ny].time === time + 1) {
          temp[nx][ny].color = 3;
          result += 1;
        }
      }
    }
  }

  return result;
};

const go = (idx, cnt, g, r) => {
  if (cnt > len) return;
  if (g > G) return;
  if (r > R) return;
  if (g === G && r === R) {
    answer = Math.max(answer, bfs());
    return;
  }

  for (let i = idx; i < len; i++) {
    // if (visited[i]) continue;
    // visited[i] = true;
    Gr.push(i);
    go(i + 1, cnt + 1, g + 1, r);
    Gr.pop();
    Re.push(i);
    go(i + 1, cnt + 1, g, r + 1);
    Re.pop();
    // visited[i] = false;
  }
};

go(0, 0, 0, 0);
console.log(answer);
