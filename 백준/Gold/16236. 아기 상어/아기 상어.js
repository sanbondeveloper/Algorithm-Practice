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
const board = input.slice(1).map((row) => row.split(' ').map(Number));

let posX, posY;
let size = 2;
let count = 0;
let answer = 0;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
// 아기 상어 위치 찾기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 9) {
      posX = i;
      posY = j;
      board[i][j] = 0;
    }
  }
}

function bfs() {
  const queue = new Queue();
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  let time;
  let eat = false;
  queue.insert([posX, posY, 0]);
  visited[posX][posY] = true;

  while (!queue.isEmpty()) {
    const [x, y, cnt] = queue.peekFront();
    queue.remove();

    // 가장 먼저 발견된 최단거리를 찾았다고 해도 우선순위가 존재
    // 최단거리 중 우선순위가 높은 물고기를 선택한다.
    if (board[x][y] > 0 && board[x][y] < size && time === cnt) {
      if (posX > x || (posX == x && posY > y)) {
        posX = x;
        posY = y;
        continue;
      }
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (visited[nx][ny] || board[nx][ny] > size) continue;

      // 이 부분에서 최단거리의 물고기를 찾더라도 eat만 true로 바꿔주고 계속 탐색
      // 가장 왼쪽, 같은 경우 가장 위쪽의 물고기를 찾는다.
      // 우선 순위에 따라 새로운 물고기를 찾아도 시간이나 정답에는 변동이 없다. 위치만 변경
      if (board[nx][ny] > 0 && board[nx][ny] < size && !eat) {
        eat = true;
        posX = nx;
        posY = ny;
        time = cnt + 1;
        answer += time;
      } else {
        queue.insert([nx, ny, cnt + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  return eat;
}

while (true) {
  if (bfs()) {
    count += 1;
    board[posX][posY] = 0;

    if (count === size) {
      size += 1;
      count = 0;
    }
  } else {
    break;
  }
}

console.log(answer);
