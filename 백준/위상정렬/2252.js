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
let [str, ...arr] = input;
const [N, M] = str.split(' ').map(Number);
arr = arr.map((row) => row.split(' ').map(Number));
const graph = {};
const inDegree = Array.from({ length: N + 1 }, () => 0);
const queue = new Queue();
const answer = [];

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 0; i < M; i++) {
  const [a, b] = arr[i];

  graph[a].push(b);
  inDegree[b] += 1;
}

const topologySort = () => {
  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while (!queue.isEmpty()) {
    const x = queue.front();
    queue.pop();
    answer.push(x);

    graph[x].forEach((next) => {
      inDegree[next] -= 1;

      if (inDegree[next] === 0) {
        queue.push(next);
      }
    });
  }
};

topologySort();
console.log(answer.join(' '));

/*
 - 그래프와 차수 테이블을 만들어준다.
 - 차수가 0인 노드를 큐에 넣는다.
 - 큐에서 노드 하나를 빼서 연결된 간선을 제거한다. 여기서 next 노드의 차수가 0이 되면 큐에 넣는다. (반복)
 - 중간에 큐가 Empty되면 위상 정려를 수행할 수 없다.
*/
