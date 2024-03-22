const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [N, M, X, Y, K] = input[0].split(' ').map(Number);
const board = input.slice(1, 1 + N).map((row) => row.split(' ').map(Number));
const comm = input[1 + N].split(' ').map(Number);
const dir = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
let dice = [0, 0, 0, 0, 0, 0];

const turn = (dir) => {
  const [a, b, c, d, e, f] = dice;

  if (dir === 1) {
    dice = [d, b, a, f, e, c];
  } else if (dir === 2) {
    dice = [c, b, f, a, e, d];
  } else if (dir === 3) {
    dice = [e, a, c, d, f, b];
  } else {
    dice = [b, f, c, d, a, e];
  }
};

let nx = X;
let ny = Y;
const answer = [];

for (const d of comm) {
  nx += dir[d - 1][0];
  ny += dir[d - 1][1];

  if (nx < 0 || ny < 0 || nx >= N || ny >= M) {
    nx -= dir[d - 1][0];
    ny -= dir[d - 1][1];
    continue;
  }
  turn(d);

  if (board[nx][ny] === 0) {
    board[nx][ny] = dice[5];
  } else {
    dice[5] = board[nx][ny];
    board[nx][ny] = 0;
  }

  answer.push(dice[0]);
}

console.log(answer.join('\n'));
