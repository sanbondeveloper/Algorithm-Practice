const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [n, ...rest] = input;
const N = +n;
const arr = rest.map((row) => row.split(' '));
const answer = [0, 0];

const dfs = (sr, sc, N) => {
  if (N === 1) {
    arr[sr][sc] === '0' ? (answer[0] += 1) : (answer[1] += 1);
    return;
  }

  const target = arr[sr][sc];
  let isCheck = true;

  for (let i = sr; i < sr + N; i++) {
    for (let j = sc; j < sc + N; j++) {
      if (target !== arr[i][j]) {
        isCheck = false;
        break;
      }
    }
    if (!isCheck) break;
  }

  if (isCheck) {
    arr[sr][sc] === '0' ? (answer[0] += 1) : (answer[1] += 1);
    return;
  }

  const w = N / 2;
  dfs(sr, sc, w);
  dfs(sr, sc + w, w);
  dfs(sr + w, sc, w);
  dfs(sr + w, sc + w, w);
};

dfs(0, 0, N);
console.log(answer.join('\n'));

/*
  분할 정복 - 사각형의 색깔이 같을 때까지 계속 사각형을 4등분한다.
  N = 1일 때는 더이상 나눌 수 없기 때문에 재귀를 중단해야 한다.
*/
