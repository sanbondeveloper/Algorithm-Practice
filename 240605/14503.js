// [14503/로봇 청소기](https://www.acmicpc.net/problem/14503)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let [r, c, d] = input[1].split(' ').map(Number);
const board = input.slice(2).map((row) => row.split(' ').map(Number));
let answer = 0;
let count = 0;
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

while (true) {
  if (count === 4) {
    const nr = r - dir[d][0];
    const nc = c - dir[d][1];

    if (board[nr][nc] === 1) break;

    r = nr;
    c = nc;
    count = 0;
  }

  if (board[r][c] === 0) {
    answer += 1;
    board[r][c] = 2;
  }

  while (true) {
    d = d - 1 < 0 ? 3 : d - 1;

    const nr = r + dir[d][0];
    const nc = c + dir[d][1];
    count += 1;

    if (board[nr][nc] === 0) {
      r = nr;
      c = nc;
      count = 0;
      break;
    }

    if (count >= 4) break;
  }
}

console.log(answer);
