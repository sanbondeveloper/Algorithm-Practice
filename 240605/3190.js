// [3190/뱀](https://www.acmicpc.net/problem/3190)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const K = +input[1];
const board = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 0)
);
const apples = input.slice(2, 2 + K).map((row) => row.split(' ').map(Number));
const L = +input[2 + K];
const arr = input.slice(2 + K + 1).map((row) => row.split(' '));
let dir = 0;
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let time = 0;
const queue = [[0, 0]];
board[0][0] = 2;

for (const [x, y] of apples) {
  board[x - 1][y - 1] = 1;
}

while (true) {
  time += 1;

  const [x, y] = queue[queue.length - 1];

  const nx = x + dirs[dir][0];
  const ny = y + dirs[dir][1];

  if (nx < 0 || ny < 0 || nx >= N || ny >= N) break;
  if (board[nx][ny] === 2) break;

  if (board[nx][ny] === 1) {
    board[nx][ny] = 2;
    queue.push([nx, ny]);
  } else {
    const [tx, ty] = queue.shift();

    board[tx][ty] = 0;
    board[nx][ny] = 2;
    queue.push([nx, ny]);
  }

  if (arr.length > 0 && time === +arr[0][0]) {
    if (arr[0][1] === 'D') dir = dir === 3 ? 0 : dir + 1;
    else dir = dir === 0 ? 3 : dir - 1;

    arr.shift();
  }
}

console.log(time);
