// toFixed : 소수점 표현, 반올림 수행
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [C, ...arr] = input;
const answer = [];

for (let i = 0; i < C; i++) {
  const [N, ...scores] = arr[i].split(' ').map(Number);
  const sum = scores.reduce((a, b) => a + b, 0);
  const avg = sum / N;
  const rate = scores.filter((score) => score > avg).length / N;

  answer.push((rate * 100).toFixed(3) + '%');
}

console.log(answer.join('\n'));
