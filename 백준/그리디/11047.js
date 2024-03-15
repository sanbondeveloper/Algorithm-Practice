const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
let [str, ...arr] = input;
let [N, K] = str.split(' ').map(Number);
let answer = 0;
arr = arr.map(Number);
arr.sort((a, b) => b - a);

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > K) continue;

  answer += Math.floor(K / arr[i]);
  K %= arr[i];
}

console.log(answer);
