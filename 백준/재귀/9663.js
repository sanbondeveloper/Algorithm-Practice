const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const visited = [];
let answer = 0;

function check(row, col) {
  for (let prev = 0; prev < row; prev++) {
    if (visited[prev] === col || row - prev === Math.abs(col - visited[prev])) {
      return false;
    }
  }

  return true;
}

function dfs(row) {
  if (row === N) {
    answer += 1;
    return;
  }

  for (let col = 0; col < N; col++) {
    if (check(row, col)) {
      visited[row] = col;
      dfs(row + 1);
    }
  }
}

dfs(0);

console.log(answer);

/*
  - 행은 dfs를 수행할 때 하나의 열에 퀸을 놓으면 1을 증가시키기 때문에 행이 중복되어 퀸이 놓아지는 일은 발생하지 않는다.
  - 열은 visited[]를 사용해 중복을 확인한다. 배열의 인덱스는 행을 의미하고 값은 열을 의미한다. 현재 행보다 이전 행에서 퀸이 놓인 열 위치를 확인하여 중복을 방지한다.
  - 대각선은 두 위치의 행과 열의 차이값이 같을 때 중복된걸 확인할 수 있다. 현재 행 - 이전 행 === Math.abs(현재 열 - 이전 열)
*/
