const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => '*')
);

const star = (x, y, N, blank) => {
  if (blank) {
    for (let i = x; i < x + N; i++) {
      for (let j = y; j < y + N; j++) {
        arr[i][j] = ' ';
      }
    }
  }

  if (N === 1) return;

  const size = N / 3;
  let count = 0;

  for (let i = x; i < x + N; i += size) {
    for (let j = y; j < y + N; j += size) {
      count += 1;
      if (count === 5) {
        star(i, j, size, true);
      } else {
        star(i, j, size, false);
      }
    }
  }
};

star(0, 0, N, false);
console.log(arr.map((row) => row.join('')).join('\n'));

/*
 - 큰 모양부터 작은 모양으로 분할하면서 구현
 - 크기 상관없이 모든 모양을 3 * 3 으로 나타냈을 때 (1, 1) 부분이 공백이다.
*/
