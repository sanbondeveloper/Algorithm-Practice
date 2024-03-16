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
const T = +input[0];
let index = 1;
let count = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const answer = [];

while (true) {
  if (count === T) break;

  const [W, H] = input[index].split(' ').map(Number);
  const board = Array.from({ length: H }, () => Array.from({ length: W }));
  const person = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => -1)
  );
  const fire = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => -1)
  );
  const queue_person = new Queue();
  const queue_fire = new Queue();

  for (let i = index + 1; i < index + 1 + H; i++) {
    for (let j = 0; j < W; j++) {
      board[i - (index + 1)][j] = input[i][j];

      if (board[i - (index + 1)][j] === '*') {
        queue_fire.push([i - (index + 1), j]);
        fire[i - (index + 1)][j] = 0;
      }

      if (board[i - (index + 1)][j] === '@') {
        queue_person.push([i - (index + 1), j]);
        person[i - (index + 1)][j] = 0;
      }
    }
  }

  while (!queue_fire.isEmpty()) {
    const [x, y] = queue_fire.front();
    queue_fire.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= H || ny >= W) continue;
      if (fire[nx][ny] >= 0 || board[nx][ny] === '#') continue;

      fire[nx][ny] = fire[x][y] + 1;
      queue_fire.push([nx, ny]);
    }
  }

  let success = false;
  while (!queue_person.isEmpty() && !success) {
    const [x, y] = queue_person.front();
    queue_person.pop();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= H || ny >= W) {
        answer.push(person[x][y] + 1);
        success = true;
        break;
      }

      if (person[nx][ny] >= 0 || board[nx][ny] === '#') continue;
      if (fire[nx][ny] !== -1 && person[x][y] + 1 >= fire[nx][ny]) continue;

      person[nx][ny] = person[x][y] + 1;
      queue_person.push([nx, ny]);
    }
  }

  if (!success) answer.push('IMPOSSIBLE');

  index += 1 + H;
  count += 1;
}

console.log(answer.join('\n'));
