// [18352/특정 거리의 도시 찾기](https://www.acmicpc.net/problem/18352)

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.front == null && this.rear === null;
  }
  insert(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) this.front = newNode;
    else this.rear.next = newNode;

    this.rear = newNode;
    this.length += 1;
  }

  remove() {
    if (this.isEmpty()) return;
    this.front = this.front.next;

    if (!this.front) this.rear = null;
    this.length -= 1;
  }

  peekFront() {
    if (this.isEmpty()) return -404;
    return this.front.data;
  }

  display() {
    if (this.isEmpty()) return;
    let curr = this.front;
    process.stdout.write('(FRONT) ');

    while (curr != this.rear) {
      process.stdout.write(`${curr.data} ---> `);
      curr = curr.next;
    }
    process.stdout.write(`${this.rear.data} (REAR)\n`);
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, K, X] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const graph = {};
const answer = [];

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 0; i < M; i++) {
  const [a, b] = arr[i];

  graph[a].push(b);
}

function bfs() {
  const queue = new Queue();
  const visited = Array(N + 1).fill(false);
  const dp = Array(N + 1).fill(-1);

  queue.insert(X);
  visited[X] = true;
  dp[X] = 0;

  while (!queue.isEmpty()) {
    const cur = queue.peekFront();
    queue.remove();

    if (dp[cur] === K) answer.push(cur);
    if (dp[cur] >= K) continue;

    graph[cur].forEach((next) => {
      if (visited[next]) return;

      queue.insert(next);
      visited[next] = true;
      dp[next] = dp[cur] + 1;
    });
  }
}

bfs();
answer.sort((a, b) => a - b);
console.log(answer.length === 0 ? -1 : answer.join('\n'));
