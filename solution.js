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

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const population = [0, ...input[1].split(' ').map(Number)];
const temp = input.slice(2).map((row) => row.split(' ').map(Number));
const graph = {};
let answer = N * 100 + 1;
const section = new Array(N + 1).fill(null);
let populationA = 0;
let populationB = 0;

function bfs(start, target) {
  let cnt = 1;
  const queue = new Queue();
  const visited = Array(N + 1).fill(false);
  queue.insert(start);
  visited[start] = true;

  while (!queue.isEmpty()) {
    const node = queue.peekFront();
    queue.remove();

    graph[node].forEach((next) => {
      if (visited[next] || section[next] !== target) return;

      cnt += 1;
      visited[next] = true;
      queue.insert(next);

      if (target == 'A') populationA += population[next];
      else populationB += population[next];
    });
  }

  return cnt;
}

function combination(limit, cnt, idx) {
  if (limit == cnt) {
    let sectionA, sectionB;

    for (let i = 1; i <= N; i++) {
      if (section[i] != 'A') {
        section[i] = 'B';
        sectionB = i;
      } else {
        sectionA = i;
      }
    }

    populationA = population[sectionA];
    populationB = population[sectionB];

    let sum = bfs(sectionA, 'A') + bfs(sectionB, 'B');

    if (sum == N) {
      answer = Math.min(answer, Math.abs(populationA - populationB));
    }

    return;
  }

  for (let i = idx; i <= N; i++) {
    section[i] = 'A';
    combination(limit, cnt + 1, i + 1);
    section[i] = null;
  }
}

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 1; i <= N; i++) {
  for (let j = 1; j < temp[i - 1].length; j++) {
    graph[i].push(temp[i - 1][j]);
  }
}

for (let i = 1; i < N; i++) {
  combination(i, 0, 1);
}

console.log(answer === N * 100 + 1 ? -1 : answer);
