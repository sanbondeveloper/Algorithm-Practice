// [11559/Puyo Puyo](https://www.acmicpc.net/problem/11559)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const board = input.slice(0).map((row) => row.split(''));
let visited;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let answer = 0;

function bfs(i, j) {
  const queue = [[i, j]];
  const blocks = [[i, j]];
  visited[i][j] = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= 12 || ny >= 6) continue;
      if (board[nx][ny] !== board[x][y]) continue;
      if (visited[nx][ny]) continue;

      queue.push([nx, ny]);
      blocks.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }

  return blocks;
}

function remove(blocks) {
  for (const [x, y] of blocks) {
    board[x][y] = '.';
  }
}

function down() {
  for (let y = 0; y < 6; y++) {
    for (let x = 10; x >= 0; x--) {
      for (let k = 11; k > x; k--) {
        if (board[x][y] !== '.' && board[k][y] === '.') {
          board[k][y] = board[x][y];
          board[x][y] = '.';
        }
      }
    }
  }
}

while (true) {
  let flag = false;
  visited = Array.from({ length: 12 }, () =>
    Array.from({ length: 6 }, () => false)
  );

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === '.' || visited[i][j]) continue;

      const blocks = bfs(i, j);

      if (blocks.length >= 4) {
        flag = true;
        remove(blocks);
      }
    }
  }

  if (flag) {
    down();
    answer += 1;
  } else {
    break;
  }
}

console.log(answer);
