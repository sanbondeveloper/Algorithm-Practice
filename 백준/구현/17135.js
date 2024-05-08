// [17135](https://www.acmicpc.net/problem/17135)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, D] = input[0].split(' ').map(Number);
const origin = input.slice(1).map((row) => row.split(' ').map(Number));
const board = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
);
let enemy = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (origin[i][j] === 1) enemy.push([i, j]);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    board[i][j] = origin[i][j];
  }
}

for (let i = 0; i < M - 2; i++) {
  for (let j = i + 1; j < M - 1; j++) {
    for (let k = j + 1; k < M; k++) {
      reset();
      let result = play([i, j, k]);
      answer = Math.max(answer, result);
    }
  }
}

console.log(answer);

function updateEnemy() {
  let remain = false;
  const newEnemy = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 1) {
        remain = true;
        newEnemy.push([i, j]);
      }
    }
  }

  enemy = [...newEnemy];

  return remain;
}

function attack(arr) {
  let kill = 0;

  // 궁수 한명에 대해 가장 가까이 있는 적을 찾는다.
  for (let i = 0; i < 3; i++) {
    let min_dist = 9999;
    let tmp = [];

    for (let j = 0; j < enemy.length; j++) {
      const dist = Math.abs(N - enemy[j][0]) + Math.abs(arr[i] - enemy[j][1]);

      if (dist < min_dist) {
        min_dist = dist;
        tmp = [];
        tmp.push([enemy[j][0], enemy[j][1]]);
      } else if (dist === min_dist) {
        tmp.push([enemy[j][0], enemy[j][1]]);
      }
    }

    tmp.sort((a, b) => a[1] - b[1]);

    const dist = Math.abs(N - tmp[0][0]) + Math.abs(arr[i] - tmp[0][1]);

    if (dist <= D && board[tmp[0][0]][tmp[0][1]] === 1) {
      board[tmp[0][0]][tmp[0][1]] = 0;
      kill += 1;
    }
  }

  return kill;
}

function move() {
  updateEnemy();

  const tmp = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => 0)
  );

  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i][0] + 1 === N) continue;

    tmp[enemy[i][0] + 1][enemy[i][1]] = 1;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      board[i][j] = tmp[i][j];
    }
  }
}

function play(arr) {
  let result = 0;

  while (updateEnemy()) {
    result += attack(arr);
    move();
  }

  return result;
}

function reset() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      board[i][j] = origin[i][j];
    }
  }
}
