// [16236/아기 상어](https://www.acmicpc.net/problem/16236)

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

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const board = input.slice(1).map((row) => row.split(' ').map(Number));
let posX, posY;
let answer = 0;
let size = 2;
let count = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 9) {
      posX = i;
      posY = j;
      board[i][j] = 0;
    }
  }
}

function bfs() {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  let time;
  let eat = false;
  queue.insert([posX, posY, 0]);
  visited[posX][posY] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.peekFront();
    queue.remove();

    if (board[x][y] > 0 && board[x][y] < size && time === cnt) {
      if (posX > x || (posX === x && posY > y)) {
        posX = x;
        posY = y;
        continue;
      }
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (visited[nx][ny] || board[nx][ny] > size) continue;

      if (board[nx][ny] > 0 && board[nx][ny] < size && !eat) {
        eat = true;
        time = cnt + 1;
        posX = nx;
        posY = ny;
        answer += time;
      } else {
        queue.insert([nx, ny, cnt + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  return eat;
}

while (true) {
  if (bfs()) {
    count += 1;
    board[posX][posY] = 0;

    if (count === size) {
      count = 0;
      size += 1;
    }
  } else {
    break;
  }
}

console.log(answer);
