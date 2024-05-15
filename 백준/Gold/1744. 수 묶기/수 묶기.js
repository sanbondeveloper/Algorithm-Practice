// [1744/수 묶기](https://www.acmicpc.net/problem/1744)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const arr = input.slice(1).map(Number);
const p = [];
const m = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  if (arr[i] > 0) p.push(arr[i]);
  else m.push(arr[i]);
}

p.sort((a, b) => b - a);
m.sort((a, b) => a - b);

if (p.length % 2 !== 0) answer += p[p.length - 1];
for (let i = 0; i < p.length - 1; i += 2) {
  if (p[i + 1] === 1) answer += p[i] + p[i + 1];
  else answer += p[i] * p[i + 1];
}

if (m.length % 2 !== 0) answer += m[m.length - 1];
for (let i = 0; i < m.length - 1; i += 2) {
  answer += m[i] * m[i + 1];
}

console.log(answer);
