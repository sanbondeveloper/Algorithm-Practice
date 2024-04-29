const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const init = input[0].split(' ').map(Number);
const sender = [0, 0, 1, 1, 2, 2];
const reciver = [1, 2, 0, 2, 0, 1];
const visited = Array.from({ length: 201 }, () =>
  Array.from({ length: 201 }, () => false)
);
const answer = Array(201).fill(false);

const queue = [[0, 0]];
visited[0][0] = true;
answer[init[2]] = true;

while (queue.length > 0) {
  const [a, b] = queue.shift();
  const c = init[2] - (a + b);

  if (a === 0) answer[c] = true;

  for (let k = 0; k < 6; k++) {
    const next = [a, b, c];

    next[reciver[k]] += next[sender[k]];
    next[sender[k]] = 0;

    if (next[reciver[k]] > init[reciver[k]]) {
      next[sender[k]] = next[reciver[k]] - init[reciver[k]];
      next[reciver[k]] = init[reciver[k]];
    }

    if (visited[next[0]][next[1]]) continue;

    visited[next[0]][next[1]] = true;
    queue.push([next[0], next[1]]);
  }
}

const result = [];

for (let i = 0; i < answer.length; i++) {
  if (answer[i]) result.push(i);
}

console.log(result.join(' '));
