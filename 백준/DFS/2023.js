// [2023](https://www.acmicpc.net/problem/2023)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const prime = [2, 3, 5, 7]; // 소수에서 가장 맨 앞에 올 수 있는 숫자

for (let i = 0; i < 4; i++) {
  dfs(prime[i], N - 1);
}

function dfs(first, n) {
  if (n === 0) console.log(first);

  for (let i = 1; i < 10; i += 2) {
    const tmp = first * 10 + i;

    if (isPrime(tmp)) dfs(tmp, n - 1);
  }
}

function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}
