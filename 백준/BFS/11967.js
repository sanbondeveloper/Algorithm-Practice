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
  }

  isEmpty() {
    return this.front == null && this.rear === null;
  }
  insert(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) this.front = newNode;
    else this.rear.next = newNode;

    this.rear = newNode;
  }

  remove() {
    if (this.isEmpty()) return;
    this.front = this.front.next;

    if (!this.front) this.rear = null;
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

const [N, M] = input[0].split(' ').map(Number);
const temp = input.slice(1).map((row) => row.split(' ').map(Number));
const arr = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [])
);
for (const [x, y, a, b] of temp) {
  arr[x - 1][y - 1].push([a - 1, b - 1]);
}
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
const on = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
let answer = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = () => {
  const queue = new Queue();
  queue.insert([0, 0]);
  visited[0][0] = true;
  on[0][0] = true;
  answer += 1;

  // for (const [x, y] of arr[0][0]) {
  //   if (!on[x][y]) {
  //     on[x][y] = true;
  //     answer += 1;
  //   }
  // }

  while (!queue.isEmpty()) {
    const [x, y] = queue.peekFront();
    queue.remove();

    for (const [i, j] of arr[x][y]) {
      if (!on[i][j]) {
        on[i][j] = true;
        answer += 1;

        for (let k = 0; k < 4; k++) {
          const nx = i + dir[k][0];
          const ny = j + dir[k][1];

          if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
          if (visited[nx][ny]) {
            queue.insert([nx, ny]);
            visited[nx][ny] = true;
            break;
          }
        }
      }
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (!on[nx][ny] || visited[nx][ny]) continue;

      queue.insert([nx, ny]);
      visited[nx][ny] = true;
    }
  }
};

bfs();
console.log(answer);
