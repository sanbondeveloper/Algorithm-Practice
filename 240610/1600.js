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

const K = +input[0];
const [W, H] = input[1].split(' ').map(Number);
const board = input.slice(2).map((row) => row.split(' ').map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const houseDir = [
  [-1, -2],
  [-2, -1],
  [-1, 2],
  [-2, 1],
  [1, -2],
  [2, -1],
  [1, 2],
  [2, 1],
];

function bfs() {
  const queue = new Queue();
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Array(K).fill(false))
  );

  queue.push([0, 0, 0, 0]); // x, y, 능력 사용 횟수, 이동 횟수
  visited[0][0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, horse, cnt] = queue.front();
    queue.pop();

    if (x === H - 1 && y === W - 1) {
      console.log(cnt);
      return;
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= H || ny >= W) continue;
      if (visited[nx][ny][horse] || board[nx][ny] === 1) continue;

      visited[nx][ny][horse] = true;
      queue.push([nx, ny, horse, cnt + 1]);
    }

    // 말의 능력을 모두 사용한 경우 더 이상 사용할 수 없다.
    if (horse >= K) continue;

    for (let k = 0; k < 8; k++) {
      const nx = x + houseDir[k][0];
      const ny = y + houseDir[k][1];

      if (nx < 0 || ny < 0 || nx >= H || ny >= W) continue;
      if (visited[nx][ny][horse + 1] || board[nx][ny] === 1) continue;

      visited[nx][ny][horse + 1] = true;
      queue.push([nx, ny, horse + 1, cnt + 1]);
    }
  }

  console.log(-1);
}

bfs();
