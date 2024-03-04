const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [n, ...rest] = input;
const N = +n;
const arr = rest.map((v) => v.split(' ').map(Number));

arr.sort((a, b) => a[0] - b[0]);

const dist = (o1, o2) => {
  return (o1[0] - o2[0]) * (o1[0] - o2[0]) + (o1[1] - o2[1]) * (o1[1] - o2[1]);
};

const brute = (start, end) => {
  let minDist = Number.MAX_SAFE_INTEGER;

  for (let i = start; i < end; i++) {
    for (let j = i + 1; j <= end; j++) {
      minDist = Math.min(minDist, dist(arr[i], arr[j]));
    }
  }

  return minDist;
};

const middleBand = (start, mid, end, minDist) => {
  const temp = [];

  const midX = arr[mid][0];
  for (let i = start; i <= end; i++) {
    const xDist = arr[i][0] - midX;

    if (xDist * xDist < minDist) {
      temp.push(arr[i]);
    }
  }

  temp.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < temp.length - 1; i++) {
    for (let j = i + 1; j < temp.length; j++) {
      const yDist = temp[i][1] - temp[j][1];

      if (yDist * yDist < minDist) {
        minDist = Math.min(dist(temp[i], temp[j]), minDist);
      } else {
        break;
      }
    }
  }

  return minDist;
};

const closest = (start, end) => {
  if (end - start + 1 < 4) {
    return brute(start, end);
  }

  const mid = Math.floor((start + end) / 2);

  const left = closest(start, mid);
  const right = closest(mid + 1, end);

  const minDist = Math.min(left, right);
  const band = middleBand(start, mid, end, minDist);

  return Math.min(minDist, band);
};

console.log(closest(0, N - 1));

/*
  여러운 분할 정복 문제는 이러한 구조로 되어있다.
  - 데이터 양이 많아서 완전 탐색으로 풀 수 없다.
  - 일단 부분적으로 최대 또는 최소를 구하고 범위에 대해서 한번 더 구한다.
*/
