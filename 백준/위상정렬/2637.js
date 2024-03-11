class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.data[this.tail++] = item;
  }

  pop() {
    this.head++;
  }

  front() {
    return this.data[this.head];
  }

  rear() {
    return this.data[this.tail - 1];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return Math.abs(this.head - this.tail);
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
let [N, M, ...arr] = input;
N = +N;
M = +M;
arr = arr.map((row) => row.split(' ').map(Number));
const graph = {};
const inDegree = Array.from({ length: N + 1 }, () => 0);

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 0; i < M; i++) {
  const [x, y, k] = arr[i];

  graph[x].push([y, k]);
  inDegree[y] += 1;
}

const topologySort = () => {
  const queue = new Queue();
  const count = Array.from({ length: N + 1 }, () => 0);
  const nodes = []; // 기본 부품을 보관
  const answer = [];
  queue.push(N);
  count[N] = 1;

  while (!queue.isEmpty()) {
    const x = queue.front();
    queue.pop();

    // 기본 부품은 리프 노트
    if (graph[x].length === 0) {
      nodes.push(x);
    }

    graph[x].forEach(([y, k]) => {
      count[y] += count[x] * k; // y는 x * k 만큼 필요해

      inDegree[y] -= 1;
      if (inDegree[y] === 0) {
        queue.push(y);
      }
    });
  }

  nodes.sort((a, b) => a - b);
  for (const node of nodes) answer.push(`${node} ${count[node]}`);

  console.log(answer.join('\n'));
};

topologySort();
