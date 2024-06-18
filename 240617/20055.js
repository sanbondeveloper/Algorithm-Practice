// [20055/컨베이어 벨트 위의 로봇](https://www.acmicpc.net/problem/20055)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const belt = input[1].split(' ').map(Number);
const robot = Array(N).fill(false);
let start_pos = 0;
let end_pos = N - 1;
let inital_robot_pos = -1;
let stop = false;
let cnt = 0;
let result = 1;

function rotateBelt() {
  if (start_pos === 0) start_pos = 2 * N - 1;
  else start_pos -= 1;

  if (end_pos === 0) end_pos = 2 * N - 1;
  else end_pos -= 1;

  if (robot[end_pos]) robot[end_pos] = false;
}

function moveRobot() {
  if (inital_robot_pos !== -1) {
    let idx = end_pos;

    for (let i = 0; i < N - 1; i++) {
      let next = idx;
      if (idx === 0) idx = 2 * N - 1;
      else idx -= 1;

      if (!robot[next] && robot[idx] && belt[next] > 0) {
        belt[next] -= 1;

        if (belt[next] === 0) {
          cnt += 1;
          if (cnt >= K) {
            stop = true;
            break;
          }
        }

        robot[next] = true;
        robot[idx] = false;
      }
    }
    robot[end_pos] = false;
  }
}

function putRobot() {
  if (belt[start_pos] > 0) {
    belt[start_pos] -= 1;

    if (belt[start_pos] === 0) {
      cnt += 1;

      if (cnt >= K) {
        stop = true;
      }
    }

    robot[start_pos] = true;
    inital_robot_pos = 0;
  }
}

while (true) {
  rotateBelt();
  moveRobot();
  putRobot();

  if (stop) break;

  result += 1;
}

console.log(result);
