// [12919/A와 B 2](https://www.acmicpc.net/problem/12919)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const S = input[0].split('');
const T = input[1].split('');
let answer = 0;

dfs(S, T);

console.log(answer);

function dfs(s, t) {
  if (s.join('') === t.join('')) answer = 1;
  if (s.length >= t.length) return;

  if (t[t.length - 1] === 'A') {
    const temp = [...t];
    temp.pop();
    dfs(s, temp);
  }

  if (t[0] === 'B') {
    const temp = [...t];
    temp.shift();
    temp.reverse();
    dfs(s, temp);
  }
}
