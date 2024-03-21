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
const board = [...input].map((row) => row.split(''));
const combX = Array(25).fill(null);
const combY = Array(25).fill(null);
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;

for (let i = 0; i < 25; i++) {
  combX[i] = Math.floor(i / 5);
  combY[i] = i % 5;
}

const bfs = (comb) => {
  const queue = new Queue();
  const visited = Array(7).fill(false);
  queue.insert(comb[0]);
  visited[0] = true;
  let cnt = 1;
  let sCnt = 0;

  while (!queue.isEmpty()) {
    const now = queue.peekFront();
    queue.remove();
    if (board[combX[now]][combY[now]] === 'S') sCnt += 1;

    for (let k = 0; k < 4; k++) {
      for (let next = 1; next < 7; next++) {
        if (
          !visited[next] &&
          combX[now] + dir[k][0] === combX[comb[next]] &&
          combY[now] + dir[k][1] === combY[comb[next]]
        ) {
          visited[next] = true;
          queue.insert(comb[next]);
          cnt += 1;
        }
      }
    }
  }

  if (cnt === 7 && sCnt >= 4) answer += 1;
};

const combination = (comb, idx, depth, left) => {
  if (left === 0) {
    bfs(comb);
    return;
  }

  if (depth === 25) return;

  comb[idx] = depth;
  combination(comb, idx + 1, depth + 1, left - 1);
  combination(comb, idx, depth + 1, left);
};

combination(Array(7).fill(null), 0, 0, 7);
console.log(answer);
