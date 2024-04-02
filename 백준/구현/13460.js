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

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1);

// 1. 초기 구슬의 위치부터 BFS를 수행해줘야 하기 때문에 빨간 구슬과 파랑 구슬의 위치를 파악한다.
let redX, redY, blueX, blueY;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 'R') {
      redX = i;
      redY = j;
    }

    if (board[i][j] === 'B') {
      blueX = i;
      blueY = j;
    }
  }
}

bfs(redX, redY, blueX, blueY);

function bfs(redX, redY, blueX, blueY) {
  const queue = new Queue();
  // 이전 위치로 돌아가는 것을 어떻게 방지할 것인가? 4차원 배열을 이용
  const visited = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => false))
    )
  );
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  queue.insert([redX, redY, blueX, blueY, 0]);
  visited[redX][redY][blueX][blueY] = true;

  while (!queue.isEmpty()) {
    const [rx, ry, bx, by, cnt] = queue.peekFront();
    queue.remove();

    if (cnt >= 10) break;

    for (let k = 0; k < 4; k++) {
      let nrx = rx;
      let nry = ry;
      let nbx = bx;
      let nby = by;
      let rc = 0;
      let bc = 0;

      while (
        board[nrx + dir[k][0]][nry + dir[k][1]] !== '#' &&
        board[nrx][nry] !== 'O'
      ) {
        nrx += dir[k][0];
        nry += dir[k][1];
        rc += 1;
      }

      while (
        board[nbx + dir[k][0]][nby + dir[k][1]] !== '#' &&
        board[nbx][nby] !== 'O'
      ) {
        nbx += dir[k][0];
        nby += dir[k][1];
        bc += 1;
      }

      if (board[nbx][nby] === 'O') continue;
      if (board[nrx][nry] === 'O') {
        console.log(cnt + 1);
        return;
      }

      if (nrx === nbx && nry === nby) {
        if (rc > bc) {
          nrx -= dir[k][0];
          nry -= dir[k][1];
        } else {
          nbx -= dir[k][0];
          nby -= dir[k][1];
        }
      }

      if (visited[nrx][nry][nbx][nby]) continue;

      visited[nrx][nry][nbx][nby] = true;
      queue.insert([nrx, nry, nbx, nby, cnt + 1]);
    }
  }

  console.log(-1);
}
