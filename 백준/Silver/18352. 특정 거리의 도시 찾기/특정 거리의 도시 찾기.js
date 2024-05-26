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
const [str, ...arr] = input;
const [N, M, K, X] = str.split(' ').map(Number);
const graph = {};
const answer = [];

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 0; i < arr.length; i++) {
  const [a, b] = arr[i].split(' ').map(Number);

  graph[a].push(b);
}

const bfs = (start) => {
  const queue = new Queue();
  const visited = Array.from({ length: N + 1 }, () => false);
  queue.push([start, 0]);
  visited[start] = true;

  while (!queue.isEmpty()) {
    const [x, cnt] = queue.front();
    queue.pop();

    if (cnt === K) {
      answer.push(x);
      continue;
    }

    graph[x].forEach((next) => {
      if (visited[next]) return;

      queue.push([next, cnt + 1]);
      visited[next] = true;
    });
  }
};

bfs(X);

if (answer.length === 0) console.log(-1);
else console.log(answer.sort((a, b) => a - b).join('\n'));
