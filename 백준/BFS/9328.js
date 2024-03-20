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
const T = +input[0];
let index = 1;
let count = 0;
let board, key, visited, H, W, answer;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const arr = [];

const bfs = (i, j) => {
  const queue = new Queue();
  const Door = Array.from({ length: 26 }, () => new Queue());
  queue.insert([i, j]);
  visited[i][j] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.peekFront();
    queue.remove();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx > H + 1 || ny > W + 1) continue;
      if (board[nx][ny] === '*' || visited[nx][ny]) continue;
      visited[nx][ny] = true;

      if (
        'A'.charCodeAt() <= board[nx][ny].charCodeAt() &&
        board[nx][ny].charCodeAt() <= 'Z'.charCodeAt()
      ) {
        if (key[board[nx][ny].charCodeAt() - 'A'.charCodeAt()]) {
          queue.insert([nx, ny]);
        } else {
          // console.log(
          //   count,
          //   board[nx][ny].charCodeAt() - 'A'.charCodeAt(),
          //   'in'
          // );
          Door[board[nx][ny].charCodeAt() - 'A'.charCodeAt()].insert([nx, ny]);
        }
      } else if (
        'a'.charCodeAt() <= board[nx][ny].charCodeAt() &&
        board[nx][ny].charCodeAt() <= 'z'.charCodeAt()
      ) {
        queue.insert([nx, ny]);
        if (key[board[nx][ny].charCodeAt() - 'a'.charCodeAt()]) continue;

        key[board[nx][ny].charCodeAt() - 'a'.charCodeAt()] = true;
        // console.log(
        //   count,
        //   board[nx][ny].charCodeAt() - 'a'.charCodeAt(),
        //   'out'
        // );
        while (!Door[board[nx][ny].charCodeAt() - 'a'.charCodeAt()].isEmpty()) {
          queue.insert(
            Door[board[nx][ny].charCodeAt() - 'a'.charCodeAt()].peekFront()
          );
          Door[board[nx][ny].charCodeAt() - 'a'.charCodeAt()].remove();
        }
      } else {
        queue.insert([nx, ny]);

        if (board[nx][ny] === '$') {
          answer += 1;
        }
      }
    }
  }
};

while (true) {
  if (count === T) break;

  [H, W] = input[index].split(' ').map(Number);
  board = Array.from({ length: H + 2 }, () =>
    Array.from({ length: W + 2 }, () => '.')
  );
  key = Array(26).fill(false);
  visited = Array.from({ length: H + 2 }, () =>
    Array.from({ length: W + 2 }, () => false)
  );
  answer = 0;
  index += 1;
  for (let i = index; i < index + H; i++) {
    for (let j = 0; j < W; j++) {
      board[i - index + 1][j + 1] = input[i][j];
    }
  }
  const keyString = input[index + H];
  if (keyString !== '0') {
    for (const k of keyString.split('')) {
      key[k.charCodeAt() - 'a'.charCodeAt()] = true;
    }
  }

  bfs(0, 0);
  arr.push(answer);

  count += 1;
  index += H + 1;
}

console.log(arr.join('\n'));
