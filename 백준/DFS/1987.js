const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [R, C] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(''));
let answer = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const visited = new Set();

function dfs(x, y, cnt) {
  answer = Math.max(answer, cnt);

  for (let k = 0; k < 4; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
    if (visited.has(board[nx][ny])) continue;

    visited.add(board[nx][ny]);
    dfs(nx, ny, cnt + 1);
    visited.delete(board[nx][ny]);
  }
}

visited.add(board[0][0]);
dfs(0, 0, 1);

console.log(answer);
