// [15684/사다리 조작](https://www.acmicpc.net/problem/15684)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, H] = input[0].split(' ').map(Number);
const temp = input.slice(1).map((row) => row.split(' ').map(Number));
const ladder = Array.from({ length: H + 1 }, () =>
  Array.from({ length: N + 1 }, () => false)
);
let answer = Infinity;
let flag = false;

for (const [a, b] of temp) {
  ladder[a][b] = true;
}

function check() {
  for (let j = 1; j <= N; j++) {
    let curCol = j;
    for (let i = 1; i <= H; i++) {
      if (ladder[i][curCol]) curCol += 1;
      else if (ladder[i][curCol - 1]) curCol -= 1;
    }

    // 최종적으로 출발 열과 도착 열이 같지 않으면 해당 케이스는 정답이 아니다.
    if (j !== curCol) return false;
  }

  return true;
}

function combination(rowIdx, count, limit) {
  // rowIdx: 행 위치를 기억
  if (limit === count) {
    if (check()) {
      answer = Math.min(answer, count);
      flag = true;
    }

    return;
  }

  for (let i = rowIdx; i <= H; i++) {
    for (let j = 1; j < N; j++) {
      // 사다리는 연속해서 있을 수 없고 이미 사다리가 놓아져 있는 곳은 다시 놓을 수 없다.
      if (ladder[i][j] || ladder[i][j - 1] || ladder[i][j + 1]) continue;

      ladder[i][j] = true;
      combination(rowIdx, count + 1, limit);
      ladder[i][j] = false;
    }
  }
}

// 문제에서 놓아야 하는 사다리의 개수가 3보다 크면 -1 출력, 4개부터는 확인할 필요가 없다.
for (let i = 0; i < 4; i++) {
  combination(1, 0, i);
  if (flag) break; // 시간 초과 방지
}

console.log(answer === Infinity ? -1 : answer);
