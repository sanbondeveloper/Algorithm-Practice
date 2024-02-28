const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const arr = input.map(Number);
const total = arr.reduce((a, b) => a + b, 0);

for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    const sum = arr[i] + arr[j];

    if (total - sum === 100) {
      const answer = arr
        .filter((v) => v !== arr[i] && v !== arr[j])
        .sort((a, b) => a - b);

      console.log(answer.join('\n'));
      return;
    }
  }
}

/*
  combination을 통해 키의 합이 100이 되는 7명의 난쟁이를 찾는 것도 좋지만
  결국 9명 중 7명을 찾는 것 즉, 2명이 가짜 난쟁이니까 이중 for문을 통해 가짜 난쟁이 2명을 찾는 방법도 있다.
*/
