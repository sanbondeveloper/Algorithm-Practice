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

const N = +input[0];
const board = input.slice(1).map((row) => row.split(' ').map(Number));
let startX, startY;
let shark = 2;
const dir = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 9) {
      startX = i;
      startY = j;
      board[i][j] = 0;
    }
  }
}

const bfs = () => {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  let time = Infinity;
  let eat = false;
  queue.insert([startX, startY, 0]);
  visited[startX][startY] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.peekFront();
    queue.remove();

    if (board[x][y] > 0 && board[x][y] < shark && cnt === time) {
      if (startX > x || (startX === x && startY > y)) {
        startX = x;
        startY = y;
        continue;
      }
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (board[nx][ny] > shark || visited[nx][ny]) continue;
      visited[nx][ny] = true;

      if (board[nx][ny] > 0 && board[nx][ny] < shark && !eat) {
        eat = true;
        startX = nx;
        startY = ny;
        time = cnt + 1;
        answer += time;
      } else {
        queue.insert([nx, ny, cnt + 1]);
      }
    }
  }

  return eat;
};

let count = 0;
while (true) {
  if (bfs()) {
    count += 1;
    board[startX][startY] = 0;
    if (count === shark) {
      shark += 1;
      count = 0;
    }
  } else {
    break;
  }
}

console.log(answer);
