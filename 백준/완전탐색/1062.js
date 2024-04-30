const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input[0].split(' ').map(Number);
const arr = input.slice(1);
const abc = Array(26).fill(false);
const antic = ['a', 'n', 't', 'i', 'c'];

if (K < 5) {
  console.log(0);
  return;
}

K -= 5;
let answer = 0;

function check() {
  let flag;
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    flag = true;
    const str = arr[i];

    for (let j = 0; j < str.length; j++) {
      if (!abc[str[j].charCodeAt(0) - 'a'.charCodeAt(0)]) {
        flag = false;
        break;
      }
    }

    if (flag) cnt += 1;
  }

  answer = Math.max(answer, cnt);
}

function dfs(idx, cnt) {
  if (cnt === K) {
    check();
    return;
  }

  for (let i = idx; i < 26; i++) {
    if (abc[i]) continue;
    abc[i] = true;
    dfs(i, cnt + 1);
    abc[i] = false;
  }
}

for (const ch of antic) {
  abc[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = true;
}

dfs(0, 0);
console.log(answer);
