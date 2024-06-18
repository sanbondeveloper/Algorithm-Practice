// [14891/톱니바퀴](https://www.acmicpc.net/problem/14891)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const wheels = [
  null,
  ...input.slice(0, 4).map((row) => row.split('').map(Number)),
];
const K = +input[4];
const arr = input.slice(5).map((row) => row.split(' ').map(Number));

function rightRotate(idx) {
  const temp = wheels[idx][7];

  for (let i = 7; i > 0; i--) {
    wheels[idx][i] = wheels[idx][i - 1];
  }

  wheels[idx][0] = temp;
}

function leftRotate(idx) {
  const temp = wheels[idx][0];

  for (let i = 0; i < 7; i++) {
    wheels[idx][i] = wheels[idx][i + 1];
  }
  wheels[idx][7] = temp;
}

function left(idx, dir) {
  if (idx < 1) return;

  if (wheels[idx][2] !== wheels[idx + 1][6]) {
    left(idx - 1, dir * -1);

    if (dir === 1) rightRotate(idx);
    else leftRotate(idx);
  }
}

function right(idx, dir) {
  if (idx > 4) return;

  if (wheels[idx][6] !== wheels[idx - 1][2]) {
    right(idx + 1, dir * -1);

    if (dir === 1) rightRotate(idx);
    else leftRotate(idx);
  }
}

for (let i = 0; i < K; i++) {
  const [idx, dir] = arr[i];

  left(idx - 1, dir * -1);
  right(idx + 1, dir * -1);

  if (dir === 1) rightRotate(idx);
  else leftRotate(idx);
}

let answer = 0;

for (let i = 1; i <= 4; i++) {
  if (wheels[i][0] === 1) answer += Math.pow(2, i - 1);
}

console.log(answer);
