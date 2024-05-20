// [17471/게리맨더링](https://www.acmicpc.net/problem/17471)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const population = [0, ...input[1].split(' ').map(Number)];
const temp = input.slice(2).map((row) => row.split(' ').map(Number));
const graph = {};
const selected = Array(N + 1).fill(false);
let answer = 987654321;

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 0; i < N; i++) {
  const arr = temp[i];
  for (let j = 1; j < arr.length; j++) {
    graph[i + 1].push(arr[j]);
  }
}

function combination(limit, cnt, idx) {
  if (limit === cnt) {
    let sectionA, sectionB;

    for (let i = 1; i <= N; i++) {
      if (selected[i]) sectionA = i;
      else sectionB = i;
    }

    const [countA, peopleA] = bfs(sectionA, true);
    const [countB, peopleB] = bfs(sectionB, false);

    if (countA + countB === N) {
      answer = Math.min(answer, Math.abs(peopleA - peopleB));
    }

    return;
  }

  for (let i = idx; i <= N; i++) {
    selected[i] = true;
    combination(limit, cnt + 1, i + 1);
    selected[i] = false;
  }
}

function bfs(start, flag) {
  const queue = [];
  const visited = Array(N + 1).fill(false);
  let cnt = 1;
  let people = population[start];

  queue.push(start);
  visited[start] = true;

  while (queue.length > 0) {
    const cur = queue.shift();

    // console.log(graph[cur], cur);

    graph[cur].forEach((next) => {
      if (visited[next] || selected[next] !== flag) return;

      cnt += 1;
      visited[next] = true;
      queue.push(next);

      people += population[next];
    });
  }

  return [cnt, people];
}

for (let i = 1; i < N; i++) {
  combination(i, 0, 1);
}

console.log(answer === 987654321 ? -1 : answer);
