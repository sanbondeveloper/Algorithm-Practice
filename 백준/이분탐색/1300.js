const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const K = +input[1];

let left = 1;
let right = K;
let answer = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  let cnt = 0;
  for (let i = 1; i <= N; i++) {
    cnt += Math.min(Math.floor(mid / i), N);
  }

  if (cnt >= K) {
    answer = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(answer);

/*
 문제 요약
 이차원 배열 A를 일차원 배열 B에 넣고 오름차순 정렬했을 때
 B[k], 즉 k번째 숫자를 구해라

 문제 풀이
 k번째 숫자를 이분 탐색한다.

 N = 100,000
 A[100000][100000] = 100억, B[100억] = 100억
 따라서 B[k] <= k, left = 1(인덱스는 1부터 시작), right = k

 k번째 숫자(mid)를 구할 때 
 mid보다 작거나 같은 값(cnt) >= k 을 만족해야 한다.
 만족하면 정답을 update, k번째 숫자를 줄인다.
 
 cnt 구하기 : min(mid / i, N)

 시간 복잡도
 O(NlogK)
*/
