const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const answer = [];

function HanoiTower(num, from, by, to) {
  if (num === 1) answer.push(`${from} ${to}`);
  else {
    HanoiTower(num - 1, from, to, by); // 1 -> 2
    answer.push(`${from} ${to}`);
    HanoiTower(num - 1, by, from, to); // 2 -> 3
  }
}

console.log((2n ** BigInt(N) - 1n).toString());
if (N > 20) return;

HanoiTower(N, 1, 2, 3);

console.log(answer.join('\n'));
