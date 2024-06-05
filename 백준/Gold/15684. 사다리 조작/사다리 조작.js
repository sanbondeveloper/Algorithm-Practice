// [15684/사다리 조작](https://www.acmicpc.net/problem/15684)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, H] = input[0].split(' ').map(Number);
const temp = input.slice(1).map((row) => row.split(' ').map(Number));
const ladder = Array.from({ length: H + 1 }, () =>
  Array.from({ length: N + 1 }, () => false)
);
let answer = Infinity;
let flag = false;

for (const [a, b] of temp) {
  ladder[a][b] = true;
}

function check() {
  for (let j = 1; j <= N; j++) {
    let curCol = j;
    for (let i = 1; i <= H; i++) {
      if (ladder[i][curCol]) curCol += 1;
      else if (ladder[i][curCol - 1]) curCol -= 1;
    }

    if (j !== curCol) return false;
  }

  return true;
}

function combination(rowIdx, count, limit) {
  if (limit === count) {
    if (check()) {
      answer = Math.min(answer, count);
      flag = true;
    }

    return;
  }

  for (let i = rowIdx; i <= H; i++) {
    for (let j = 1; j < N; j++) {
      if (ladder[i][j] || ladder[i][j - 1] || ladder[i][j + 1]) continue;

      ladder[i][j] = true;
      combination(rowIdx, count + 1, limit);
      ladder[i][j] = false;
    }
  }
}

for (let i = 0; i < 4; i++) {
  combination(1, 0, i);
  if (flag) break;
}

console.log(answer === Infinity ? -1 : answer);
