const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const wheels = input.slice(0, 4).map((row) => row.split('').map(Number));
const K = +input[4];
const arr = input.slice(5).map((row) => row.split(' ').map(Number));

for (let [idx, dir] of arr) {
  idx -= 1;

  left(idx - 1, dir * -1);
  right(idx + 1, dir * -1);
  if (dir === -1) leftRotate(idx);
  else rightRotate(idx);
}

function left(idx, dir) {
  if (idx < 0) return;

  if (wheels[idx][2] !== wheels[idx + 1][6]) {
    left(idx - 1, dir * -1);
    if (dir === -1) leftRotate(idx);
    else rightRotate(idx);
  }
}

function right(idx, dir) {
  if (idx > 3) return;

  if (wheels[idx][6] !== wheels[idx - 1][2]) {
    right(idx + 1, dir * -1);
    if (dir === -1) leftRotate(idx);
    else rightRotate(idx);
  }
}

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

let answer = 0;

if (wheels[0][0] === 1) {
  answer += 1;
}
if (wheels[1][0] === 1) {
  answer += 2;
}
if (wheels[2][0] === 1) {
  answer += 4;
}
if (wheels[3][0] === 1) {
  answer += 8;
}

console.log(answer);
