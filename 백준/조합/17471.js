const N = +input[0];
const population = [0, ...input[1].split(' ').map(Number)];
const temp = input.slice(2).map((row) => row.split(' ').map(Number));
const graph = {};
let answer = N * 100 + 1;
const section = new Array(N + 1).fill(null);
let populationA = 0;
let populationB = 0;

function bfs(start, target) {
  let cnt = 1;
  const queue = new Queue();
  const visited = Array(N + 1).fill(false);
  queue.insert(start);
  visited[start] = true;

  while (!queue.isEmpty()) {
    const node = queue.peekFront();
    queue.remove();

    graph[node].forEach((next) => {
      if (visited[next] || section[next] !== target) return;

      cnt += 1;
      visited[next] = true;
      queue.insert(next);

      if (target == 'A') populationA += population[next];
      else populationB += population[next];
    });
  }

  return cnt;
}

function combination(limit, cnt, idx) {
  if (limit == cnt) {
    let sectionA, sectionB;

    for (let i = 1; i <= N; i++) {
      if (section[i] != 'A') {
        section[i] = 'B';
        sectionB = i;
      } else {
        sectionA = i;
      }
    }

    populationA = population[sectionA];
    populationB = population[sectionB];

    let sum = bfs(sectionA, 'A') + bfs(sectionB, 'B');

    if (sum == N) {
      answer = Math.min(answer, Math.abs(populationA - populationB));
    }

    return;
  }

  for (let i = idx; i <= N; i++) {
    section[i] = 'A';
    combination(limit, cnt + 1, i + 1);
    section[i] = null;
  }
}

for (let i = 1; i <= N; i++) graph[i] = [];
for (let i = 1; i <= N; i++) {
  for (let j = 1; j < temp[i - 1].length; j++) {
    graph[i].push(temp[i - 1][j]);
  }
}

for (let i = 1; i < N; i++) {
  combination(i, 0, 1);
}

console.log(answer === N * 100 + 1 ? -1 : answer);
