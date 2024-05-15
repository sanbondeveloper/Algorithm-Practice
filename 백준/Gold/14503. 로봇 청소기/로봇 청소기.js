const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input
  .shift()
  .split(' ')
  .map((el) => +el);
// console.log(N, M);
let [r, c, d] = input
  .shift()
  .split(' ')
  .map((el) => +el);
// console.log(r, c, d);
const map = input.map((el) => el.split(' ').map((el) => +el));
// console.log(map);
solution();

function solution() {
  let answer = 0;
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let cnt = 0;

  while (true) {
    if (map[r][c] === 0) {
      answer++;
      map[r][c] = 2;
    }

    d--;
    cnt++;
    if (d < 0) d = 3;
    const nx = r + dir[d][0];
    const ny = c + dir[d][1];
    if (map[nx][ny] === 0) {
      cnt = 0;
      r = nx;
      c = ny;
    }

    if (cnt === 4) {
      const bx = r - dir[d][0];
      const by = c - dir[d][1];

      if (map[bx][by] !== 1) {
        r = bx;
        c = by;
        cnt = 0;
      } else {
        break;
      }
    }
  }

  console.log(answer);
}