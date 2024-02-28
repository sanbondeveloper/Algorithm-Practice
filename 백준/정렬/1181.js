const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, ...arr] = input;

const set = [...new Set(arr)];

set.sort((a, b) => {
  if (a.length === b.length) return a < b ? -1 : 1;

  return a.length - b.length;
});

console.log(set.join('\n'));

/*
  문자열을 정렬할 때는 부등호를 통해 -1, 1, 0을 리턴해준다.
*/
