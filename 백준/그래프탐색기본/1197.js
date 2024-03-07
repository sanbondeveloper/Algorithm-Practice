const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [V, M] = input[0].split(' ').map(Number);
const arr = [];
const parent = [];
let answer = 0;

for (let i = 1; i <= M; i++) {
  const [a, b, w] = input[i].split(' ').map(Number);

  arr.push([a, b, w]);
}
arr.sort((a, b) => a[2] - b[2]);

const find = (x) => {
  if (parent[x] === x) return x;
  else return (parent[x] = find(parent[x]));
};

const union = (x, y) => {
  x = find(x);
  y = find(y);

  if (x !== y) parent[y] = x;
};

const sameParent = (x, y) => {
  x = find(x);
  y = find(y);

  return x === y;
};

for (let i = 1; i <= V; i++) parent[i] = i;

for (let i = 0; i < M; i++) {
  if (!sameParent(arr[i][0], arr[i][1])) {
    union(arr[i][0], arr[i][1]);
    answer += arr[i][2];
  }
}

console.log(answer);

/*
  방향이 없는 그래프에서 모든 노드를 포함하면서, 순환되는 경로를 제거한 형태 -> 스패닝 트리
  이 스패닝 트리에서 가중치의 합을 최소로 만드는 트리 -> 최소 스패닝 트리(MST)

  크루스칼 알고리즘
  - 가중치를 기준으로 오름차순
  - 부모가 같은지 확인 (Find & Union)
  - 부모가 같으면 사이클이 발생하기 때문에 부모가 같지 않을 때만 연결
*/
