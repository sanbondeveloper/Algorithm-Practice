const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

let [N, ...arr] = input;
N = +N;
arr = arr.map((row) => row.split(' ').map(Number));
const dp = Array.from({ length: N }, () =>
  Array.from({ length: 1 << N }, () => 0)
);

const dfs = (now, visited) => {
  // 1. 모든 노드를 방문한 경우
  if (visited === (1 << N) - 1) {
    if (arr[now][0]) return arr[now][0];
    return Infinity;
  }

  // 2. 해당 경로까지 최솟값이 있는 경우
  if (dp[now][visited]) return dp[now][visited];

  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i < N; i++) {
    if (arr[now][i] === 0 || visited & (1 << i)) continue;

    const cost = dfs(i, visited | (1 << i)) + arr[now][i];
    min = Math.min(min, cost);
  }

  dp[now][visited] = min;

  return min;
};

console.log(dfs(0, 1));

/*
  외판원 순회
  - 어느 한 도시에서 출발해 N의 도시를 거쳐 다시 원래 도시로 돌아와야 한다.
  - 중복 방문은 할 수 없다.
  - 가장 적은 비용
*/
