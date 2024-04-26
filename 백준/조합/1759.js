const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [L, C] = input[0].split(' ').map(Number);
const arr = input[1].split(' ');
const aeiou = ['a', 'e', 'i', 'o', 'u'];
const answer = [];
const cand = [];

arr.sort();

combination(0, 0);

console.log(answer.map((v) => v.join('')).join('\n'));

function combination(index, count) {
  if (count === L) {
    const len1 = cand.filter((v) => aeiou.includes(v)).length;
    const len2 = cand.filter((v) => !aeiou.includes(v)).length;

    if (len1 >= 1 && len2 >= 2) {
      answer.push([...cand]);
    }

    return;
  }

  for (let i = index; i < C; i++) {
    cand.push(arr[i]);
    combination(i + 1, count + 1);
    cand.pop();
  }
}
