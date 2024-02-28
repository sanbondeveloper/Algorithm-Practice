const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let left = 0;
let right = Math.max(...arr);
let answer = Number.MIN_SAFE_INTEGER;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  let sum = 0;

  for (const tree of arr) {
    if (tree > mid) {
      sum += tree - mid;
    }
  }

  if (sum >= M) {
    answer = Math.max(answer, mid);

    left = mid + 1; // 높이를 올라야 함, 높이를 올리수록 나무를 덜 가져간다.
  } else {
    right = mid - 1; // 높이를 내릴수록 더 많이 나무를 가져갈 수 있다.
  }
}

console.log(answer);

/*
  모든 높이를 일일이 완전 탐색을 하기에는 나무의 수도 많고 높이의 범위도 크다. 따라서 이분탐색을 이용한다.

  이 문제는 이분탐색으로 풀되 약간의 추가 구현이 필요하다.
  - 톱의 높이를 올릴수록 나무를 덜 가져가며 톱의 높이를 내릴수록 나무를 더 많이 가져간다. 따라서 자른 나무가 충분하거나 넘친다면 높이의 범위를 올려줘야 한다.
  - 정답으로 높이의 최대값을 구하는 문제이기 때문에 자른 나무가 충분하거나 넘치는 경우 높이값을 계속 갱신할 필요가 있다.
*/
