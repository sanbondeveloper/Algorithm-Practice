// [12904/A와 B](https://www.acmicpc.net/problem/12904)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const S = input[0].split('');
const T = input[1].split('');

while (S.length !== T.length) {
  if (T[T.length - 1] === 'A') {
    T.pop();
  } else if (T[T.length - 1] === 'B') {
    T.pop();
    T.reverse();
  }
}

console.log(S.join('') === T.join('') ? 1 : 0);
