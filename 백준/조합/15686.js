const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(' ').map(Number));
const houses = [];
const chickens = [];
let answer = Infinity;

for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (board[r][c] === 1) {
      houses.push({ r, c });
    } else if (board[r][c] === 2) {
      chickens.push({ r, c, visited: false });
    }
  }
}

combination(0, 0);

console.log(answer);

function combination(index, count) {
  if (count === M) {
    calc();
    return;
  }

  for (let i = index; i < chickens.length; i++) {
    chickens[i].visited = true;
    combination(i + 1, count + 1);
    chickens[i].visited = false;
  }
}

function calc() {
  let result = 0;

  for (let i = 0; i < houses.length; i++) {
    let min = Infinity;
    for (let j = 0; j < chickens.length; j++) {
      if (chickens[j].visited) {
        let cur =
          Math.abs(houses[i].r - chickens[j].r) +
          Math.abs(houses[i].c - chickens[j].c);
        min = Math.min(min, cur);
      }
    }
    result += min;
  }

  answer = Math.min(answer, result);
}
