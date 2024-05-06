// [16724](https://www.acmicpc.net/problem/16724)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(''));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]; // U, D, L, R 순
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
); // 0: 미방문, 1: 방문, 2: 싸이클에 속함
let answer = 0;

// 방향 전환을 쉽게하기 위해 숫자로 표시
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const target = board[i][j];

    if (target === 'U') board[i][j] = 0;
    else if (target === 'D') board[i][j] = 1;
    else if (target === 'L') board[i][j] = 2;
    else if (target === 'R') board[i][j] = 3;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] === 0) {
      dfs(i, j);
    }
  }
}

console.log(answer);

function dfs(i, j) {
  visited[i][j] = 1;

  const nx = i + dir[board[i][j]][0];
  const ny = j + dir[board[i][j]][1];

  if (visited[nx][ny] === 1) answer += 1;
  if (visited[nx][ny] === 0) dfs(nx, ny);

  visited[i][j] = 2;
}
