const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

/*
  - 정확한 시간복잡도는 알 수 없지만 백트래킹을 이용할 수밖에 없다.
  - 스도쿠의 모든 빈 칸이 채워지기 전까지 가능한지 알 수 없다.
  - 비어 있는 칸을 모아 백트래킹을 수행한다.
  - 행, 열, 3*3 부분을 확인하여 가능할 때마다 재귀를 수행한다.
  - 1부터 9까지 차례대로 넣어보면 사전순은 자동으로 만족하게 된다.
*/

const board = input.slice(0).map((row) => row.split('').map(Number));
const empties = [];
let flag = false;

// 입력되지 않은 부분을 백트래킹에 사용할 배열에 넣어준다.
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === 0) empties.push([i, j]);
  }
}

backTracking(0);

// idx: 비어 있는 칸을 의미
function backTracking(idx) {
  if (idx === empties.length) {
    if (!flag) console.log(board.map((row) => row.join('')).join('\n'));

    flag = true;
    return;
  }

  const x = empties[idx][0];
  const y = empties[idx][1];

  // 1부터 9까지 모든 수를 넣어본다.
  for (let k = 1; k <= 9; k++) {
    if (check(x, y, k)) {
      board[x][y] = k;
      backTracking(idx + 1);
      if (flag) return;
      board[x][y] = 0;
    }
  }
}

// board[x][y]에 k를 넣을 수 있는지 확인
// 행, 열, 3*3 부분을 확인
function check(x, y, k) {
  for (let i = 0; i < 9; i++) {
    if (board[x][i] === k && i !== y) return false;

    if (board[i][y] === k && i !== x) return false;

    const nx = Math.floor(x / 3) * 3 + Math.floor(i / 3);
    const ny = Math.floor(y / 3) * 3 + (i % 3);
    if (board[nx][ny] === k && !(nx === x && ny === y)) return false;
  }

  return true;
}
