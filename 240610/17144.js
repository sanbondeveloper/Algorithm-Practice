// [17144/미세먼지 안녕!](https://www.acmicpc.net/problem/17144)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [R, C, T] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(' ').map(Number));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let count = 0;
const cleaner = [];

function cleanUp() {
  const dir = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
  ];
  let turn = 0;
  let [x, y] = cleaner[0];
  let up = x;
  y = 1;
  let previous = 0;

  while (true) {
    const nx = x + dir[turn][0];
    const ny = y + dir[turn][1];

    if (x === up && y === 0) break;
    if (nx < 0 || ny < 0 || nx >= R || ny >= C) {
      turn += 1;
      continue;
    }

    [board[x][y], previous] = [previous, board[x][y]];
    x = nx;
    y = ny;
  }
}

function cleanDown() {
  let [x, y] = cleaner[1];
  let down = x;
  let turn = 0;
  let previous = 0;
  const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  y = 1;

  while (true) {
    const nx = x + dir[turn][0];
    const ny = y + dir[turn][1];

    if (x === down && y === 0) break;
    if (nx < 0 || ny < 0 || nx >= R || ny >= C) {
      turn += 1;
      continue;
    }

    [board[x][y], previous] = [previous, board[x][y]];
    x = nx;
    y = ny;
  }
}

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === -1) {
      cleaner.push([i, j]);
    }
  }
}

while (true) {
  if (count === T) break;

  const temp = Array.from({ length: R }, () =>
    Array.from({ length: C }, () => 0)
  );

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (board[i][j] === 0 || board[i][j] === -1) continue;

      let cnt = 0;
      for (let k = 0; k < 4; k++) {
        const nx = i + dir[k][0];
        const ny = j + dir[k][1];

        if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
        if (board[nx][ny] === -1) continue;

        temp[nx][ny] += Math.floor(board[i][j] / 5);
        cnt += 1;
      }

      board[i][j] -= Math.floor(board[i][j] / 5) * cnt;
    }
  }

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      board[i][j] += temp[i][j];
    }
  }

  cleanUp();
  cleanDown();

  count += 1;
}

let answer = 0;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === -1) continue;

    answer += board[i][j];
  }
}

console.log(answer);
