const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = [0, ...input.slice(1).map(Number)];
const visited = Array(N + 1).fill(false);
const answer = [];
let cnt = 0;

for (let i = 1; i <= N; i++) {
  if (dfs(i, i)) {
    answer.push(i);
    cnt += 1;
  }
}

console.log(cnt);
console.log(answer.join('\n'));

function dfs(start, current) {
  if (visited[current]) {
    return start === current;
  }

  visited[current] = true;
  const result = dfs(start, arr[current]);
  visited[current] = false;

  return result;
}
