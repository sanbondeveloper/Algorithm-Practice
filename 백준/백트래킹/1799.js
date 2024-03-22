const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const N = +input[0];
const chess = input.slice(1).map((row) => row.split(' ').map(Number));
const answer = [0, 0];
const l = Array(20).fill(false);
const r = Array(20).fill(false);

const tracking = (row, col, cnt, color) => {
  if (col >= N) {
    row += 1;
    if (col % 2 === 0) col = 1;
    else col = 0;
  }

  if (row >= N) {
    answer[color] = Math.max(answer[color], cnt);
    return;
  }

  if (chess[row][col] === 1 && !l[col - row + N - 1] && !r[row + col]) {
    l[col - row + N - 1] = true;
    r[row + col] = true;
    tracking(row, col + 2, cnt + 1, color);
    l[col - row + N - 1] = false;
    r[row + col] = false;
  }

  tracking(row, col + 2, cnt, color);
};

tracking(0, 0, 0, 0);
tracking(0, 1, 0, 1);
console.log(answer[0] + answer[1]);
