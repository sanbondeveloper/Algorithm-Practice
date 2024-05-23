const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.trim());

const [N, M] = input
  .shift()
  .split(' ')
  .map((el) => +el);

const board = input.map((str) => str.split(' ').map((el) => +el));
console.log(solution(N, M, board));

function solution(N, M, board) {
  const visited = Array.from({ length: N }, () => new Array(M).fill(false));
  let answer = 0;
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const case1 = [
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  const case2 = [
    [-1, 0],
    [0, -1],
    [1, 0],
  ];
  const case3 = [
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const case4 = [
    [-1, 0],
    [1, 0],
    [0, 1],
  ];
  function dfs(x, y, idx, sum) {
    if (idx === 4) {
      answer = Math.max(answer, sum);
      return;
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visited[nx][ny]) continue;

      visited[nx][ny] = true;
      dfs(nx, ny, idx + 1, sum + board[nx][ny]);
      visited[nx][ny] = false;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, 1, board[i][j]);
      visited[i][j] = false;

      answer = Math.max(answer, check(i, j, case1, board));
      answer = Math.max(answer, check(i, j, case2, board));
      answer = Math.max(answer, check(i, j, case3, board));
      answer = Math.max(answer, check(i, j, case4, board));
    }
  }

  return answer;
}

function check(x, y, dir, board) {
  let sum = board[x][y];
  for (let k = 0; k < 3; k++) {
    const nx = x + dir[k][0];
    const ny = y + dir[k][1];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) return -1;
    sum += board[nx][ny];
  }

  return sum;
}
