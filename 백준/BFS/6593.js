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
let index = 0;
let visited;
let queue;
let board;
const dir = [
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
  [-1, 0, 0],
  [1, 0, 0],
];
const answer = [];

const bfs = (L, R, C) => {
  while (!queue.isEmpty()) {
    const [h, x, y, cnt] = queue.front();
    queue.pop();

    if (board[h][x][y] === 'E') {
      answer.push(`Escaped in ${cnt} minute(s).`);
      return;
    }

    for (let k = 0; k < 6; k++) {
      const nh = h + dir[k][0];
      const nx = x + dir[k][1];
      const ny = y + dir[k][2];

      if (nh < 0 || nx < 0 || ny < 0 || nh >= L || nx >= R || ny >= C) continue;
      if (board[nh][nx][ny] === '#' || visited[nh][nx][ny]) continue;

      queue.push([nh, nx, ny, cnt + 1]);
      visited[nh][nx][ny] = true;
    }
  }

  answer.push(`Trapped!`);
};

while (true) {
  const [L, R, C] = input[index].split(' ').map(Number);

  if (L === 0 && R === 0 && C === 0) break;
  let count = 0;
  visited = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array.from({ length: C }, () => false))
  );
  queue = new Queue();
  board = [];

  while (true) {
    if (count === L) break;

    const temp = Array.from({ length: R }, () =>
      Array.from({ length: C }, () => null)
    );

    for (let i = index + 1; i < index + 1 + R; i++) {
      for (let j = 0; j < C; j++) {
        if (input[i][j] === 'S') {
          queue.push([count, i - (index + 1), j, 0]);
          visited[count][i - (index + 1)][j] = true;
        }
        temp[i - (index + 1)][j] = input[i][j];
      }
    }

    board.push(temp);
    count += 1;
    index += R + 1;
  }

  bfs(L, R, C);

  index += 1;
}

console.log(answer.join('\n'));
