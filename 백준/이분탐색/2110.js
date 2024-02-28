const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [str, ...rest] = input;
const [N, C] = str.split(' ').map(Number);
const arr = rest.map(Number).sort((a, b) => a - b);

function check(distance) {
  let count = C - 1;
  let prev = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - prev >= distance) {
      count -= 1;
      prev = arr[i];
    }
  }

  return count <= 0;
}

let left = 1;
let right = arr[arr.length - 1];

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (check(mid)) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(right);

/*
  거리를 가지고 이분탐색을 수행한다. 이때 mid는 인접한 최대 거리로 다른 공유기 사이의 거리는 이것보다 크다. 
*/
