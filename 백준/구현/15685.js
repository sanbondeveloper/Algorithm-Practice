const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const board = Array.from({ length: 101 }, () =>
  Array.from({ length: 101 }, () => false)
);
const dir = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];
let stack;
let end_x, end_y;

for (const [y, x, d, g] of arr) {
  stack = [];

  board[x][y] = true;

  end_x = x + dir[d][0];
  end_y = y + dir[d][1];

  board[end_x][end_y] = true;

  stack.push(d);

  for (let i = 0; i < g; i++) {
    make();
  }
}

let answer = 0;
for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    if (
      board[i][j] &&
      board[i][j + 1] &&
      board[i + 1][j] &&
      board[i + 1][j + 1]
    ) {
      answer += 1;
    }
  }
}

console.log(answer);

function make() {
  let len = stack.length;

  for (let i = len - 1; i >= 0; i--) {
    const direct = (stack[i] + 1) % 4;

    end_x += dir[direct][0];
    end_y += dir[direct][1];

    board[end_x][end_y] = true;

    stack.push(direct);
  }
}
