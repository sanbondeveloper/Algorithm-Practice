const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
let [N, ...arr] = input;
N = +N;
arr = arr.map((row) => row.split(' ').map(Number));

arr.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];

  return a[1] - b[1];
});

let answer = 0;
let time = 0;
for (const [start, end] of arr) {
  if (time > start) continue;

  time = end;
  answer += 1;
}

console.log(answer);
