const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const arr = input.map(Number);
const answer = [];

const postOrder = (start, end) => {
  if (start >= end) return;

  if (start === end - 1) {
    answer.push(arr[start]);
    return;
  }

  let idx = start + 1;
  while (idx < end) {
    if (arr[start] < arr[idx]) break;

    idx += 1;
  }

  postOrder(start + 1, idx);
  postOrder(idx, end);
  answer.push(arr[start]);
};

postOrder(0, arr.length);
console.log(answer.join('\n'));

/*
 재귀를 반복적으로 수행하며 왼쪽 영역과 오른쪽 영역을 분리한다.
*/
