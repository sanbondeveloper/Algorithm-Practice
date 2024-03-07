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

const [N, M, V] = input[0].split(' ').map(Number);
const graph = {};
const answer = [[], []];
let visited = Array.from({ length: N + 1 }, () => false);

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ');

  graph[a].push(b);
  graph[b].push(a);
}
for (let i = 1; i <= N; i++) graph[i].sort((a, b) => a - b);

const dfs = (node) => {
  answer[0].push(node);
  visited[node] = true;

  graph[node].forEach((next) => {
    if (visited[next]) return;

    dfs(next);
  });
};

const bfs = (start) => {
  const queue = new Queue();
  visited = Array.from({ length: N + 1 }, () => false);
  queue.push(start);
  visited[start] = true;

  while (!queue.isEmpty()) {
    const node = queue.front();
    queue.pop();
    answer[1].push(node);

    graph[node].forEach((next) => {
      if (visited[next]) return;

      queue.push(next);
      visited[next] = true;
    });
  }
};

dfs(V);
bfs(V);

console.log(answer[0].join(' '));
console.log(answer[1].join(' '));
