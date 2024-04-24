const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [R, C] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(''));
const dir = [
  [-1, 1],
  [0, 1],
  [1, 1],
];
let finished;
let answer = 0;

for (let i = 0; i < R; i++) {
  finished = false;
  board[i][0] = '@';
  dfs(i, 0);
}

console.log(answer);

function dfs(x, y) {
  if (y === C - 1) {
    finished = true;
    answer += 1;
    return;
  }

  for (let k = 0; k < 3; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
    if (board[nx][ny] === 'x' || board[nx][ny] === '@') continue;
    if (finished) continue;

    board[nx][ny] = '@';
    dfs(nx, ny);
  }
}
