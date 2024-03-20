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

let [N, K] = input[0].split(' ').map(Number);
let mov = 1;
const queue = new Queue();
const visited = Array.from({ length: 2 }, () =>
  Array.from({ length: 500001 }, () => false)
);
let answer = -1;

const bfs = () => {
  queue.insert(N);

  while (!queue.isEmpty()) {
    K += mov;

    if (K > 500000) {
      answer = -1;
      return;
    }

    if (visited[mov % 2][K]) {
      answer = mov;
      return;
    }

    const len = queue.size();
    for (let i = 0; i < len; i++) {
      const x = queue.peekFront();
      queue.remove();

      for (const nx of [x - 1, x + 1, x * 2]) {
        if (nx === K) {
          answer = mov;
          return;
        }

        if (nx < 0 || nx > 500000) continue;
        if (visited[mov % 2][nx]) continue;

        queue.insert(nx);
        visited[mov % 2][nx] = true;
      }
    }

    mov += 1;
  }
};

if (N === K) {
  console.log(0);
} else {
  bfs();
  console.log(answer);
}

/*
 동생은 매초마다 이동을 하며 1초 1칸, 2초 2칸, 3초 3칸 형태로 진행된다. 이 값을 현재 시간으로도 사용할 수 있다.
 어떤 지점 X를 수빈이와 동생이 몇초에 방문했는지, 더 자세히는 홀수초에 방문했는지 짝수초에 방문했는지 확인한다. -> visited[mov % 2][500001] 
*/
