const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(' ').map(Number));

const v = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (1 <= board[i][j] && board[i][j] <= 5) {
      v.push([i, j]);
    }
  }
}

let answer = N * M + 1;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

dfs(0);
console.log(answer);

function dfs(idx) {
  if (idx === v.length) {
    answer = Math.min(answer, check());
    return;
  }

  const [x, y] = v[idx];
  const queue = Array.from({ length: 4 }, () => []);

  for (let k = 0; k < 4; k++) {
    let nx = x + dir[k][0];
    let ny = y + dir[k][1];

    while (nx >= 0 && ny >= 0 && nx < N && ny < M && board[nx][ny] !== 6) {
      if (board[nx][ny] === 0) {
        queue[k].push([nx, ny]);
      }

      nx += dir[k][0];
      ny += dir[k][1];
    }
  }

  if (board[x][y] === 1) {
    for (let i = 0; i < 4; i++) {
      change(queue[i], -1);
      dfs(idx + 1);
      change(queue[i], 0);
    }
  } else if (board[x][y] === 2) {
    for (let i = 0; i < 3; i += 2) {
      change(queue[i], -1);
      change(queue[i + 1], -1);
      dfs(idx + 1);
      change(queue[i], 0);
      change(queue[i + 1], 0);
    }
  } else if (board[x][y] === 3) {
    for (let i = 0; i < 2; i++) {
      change(queue[i], -1);
      for (let j = 2; j < 4; j++) {
        change(queue[j], -1);
        dfs(idx + 1);
        change(queue[j], 0);
      }
      change(queue[i], 0);
    }
  } else if (board[x][y] === 4) {
    for (let i = 0; i < 4; i++) {
      change(queue[i], -1);
      change(queue[(i + 1) % 4], -1);
      change(queue[(i + 2) % 4], -1);
      dfs(idx + 1);
      change(queue[i], 0);
      change(queue[(i + 1) % 4], 0);
      change(queue[(i + 2) % 4], 0);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      change(queue[i], -1);
    }
    dfs(idx + 1);
    for (let i = 0; i < 4; i++) {
      change(queue[i], 0);
    }
  }
}

function change(queue, value) {
  for (const [x, y] of queue) {
    board[x][y] = value;
  }
}

function check() {
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) cnt += 1;
    }
  }

  return cnt;
}
