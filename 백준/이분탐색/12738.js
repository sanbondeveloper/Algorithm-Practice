const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);
const lis = [];

for (let i = 0; i < N; i++) {
  if (lis.length === 0 || lis[lis.length - 1] < arr[i]) lis.push(arr[i]);
  else {
    let left = 0;
    let right = lis.length - 1;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);

      if (lis[mid] >= arr[i]) right = mid;
      else left = mid + 1;
    }

    lis[left] = arr[i];
  }
}

console.log(lis.length);
