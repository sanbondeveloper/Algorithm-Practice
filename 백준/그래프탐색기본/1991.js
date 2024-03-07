const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

let [N, ...arr] = input;
N = +N;
const graph = {};
const answer = [[], [], []];

const preOrder = (node) => {
  if (node === '.') return;

  answer[0].push(node);
  preOrder(graph[node].left);
  preOrder(graph[node].right);
};

const inOrder = (node) => {
  if (node === '.') return;

  inOrder(graph[node].left);
  answer[1].push(node);
  inOrder(graph[node].right);
};

const postOrder = (node) => {
  if (node === '.') return;

  postOrder(graph[node].left);
  postOrder(graph[node].right);
  answer[2].push(node);
};

for (let i = 0; i < N; i++) {
  const [node, left, right] = arr[i].split(' ');
  graph[node] = { left, right };
}

preOrder('A');
inOrder('A');
postOrder('A');

console.log(answer[0].join(''));
console.log(answer[1].join(''));
console.log(answer[2].join(''));

/*
 - pre, in, post
 - 자식 노드는 최대 2개로 left, right로 식별 가능
 - 항상 재귀를 종료할 수 있는 base point가 있어야 된다.
*/
