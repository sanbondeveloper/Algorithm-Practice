// [16928/뱀과 사다리 게임](https://www.acmicpc.net/problem/16928)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const ladder = {};
const snake = {};

for (let i = 0; i < N; i++) {
  const [a, b] = arr[i];

  ladder[a] = b;
}

for (let i = N; i < arr.length; i++) {
  const [a, b] = arr[i];

  snake[a] = b;
}

function bfs() {
  const queue = [];
  const visited = Array(101).fill(false);
  queue.push([1, 0]);
  visited[1] = true;

  while (queue.length > 0) {
    const [cur, cnt] = queue.shift();

    if (cur === 100) return console.log(cnt);

    for (let k = 1; k <= 6; k++) {
      let next = cur + k;

      if (next < 1 || next > 100) continue;

      while (ladder[next] || snake[next]) {
        if (visited[next]) break;

        if (ladder[next]) next = ladder[next];
        else if (snake[next]) next = snake[next];
      }

      if (visited[next]) continue;

      queue.push([next, cnt + 1]);
      visited[next] = true;
    }
  }
}

bfs();
