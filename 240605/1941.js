// [1941/소문난 칠공주](https://www.acmicpc.net/problem/1941)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const arr = input.slice(0).map((row) => row.split(''));
const cand = [];
const selected = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => false)
);
let answer = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
