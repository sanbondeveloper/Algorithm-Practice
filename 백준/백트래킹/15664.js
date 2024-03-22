const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const answer = [];

arr.sort((a, b) => a - b);

const dfs = (idx, cnt, candi) => {
  if (cnt === M) {
    answer.push(candi.join(' '));
    return;
  }

  for (let i = idx; i < N; i++) {
    dfs(i + 1, cnt + 1, [...candi, arr[i]]);
  }
};

dfs(0, 0, []);
console.log([...new Set(answer)].join('\n'));
