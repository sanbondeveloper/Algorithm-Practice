const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);
const stack = [{ idx: 1, height: arr[0] }];
const answer = [0];

for (let i = 1; i < N; i++) {
  const cur = arr[i]; // target 높이

  while (stack.length > 0) {
    if (stack[stack.length - 1].height >= cur) {
      answer.push(stack[stack.length - 1].idx);
      break;
    }

    stack.pop(); // cur 뒤에 존재하는 탑은 cur에 막혀서 해당 탑에 레이저를 보낼 수 없다.
  }

  if (stack.length === 0) {
    answer.push(0);
  }

  stack.push({ idx: i + 1, height: cur });
}

console.log(answer.join(' '));

/*
 N의 범위가 커서 완전탐색으로는 풀 수 없다.
 스택을 활용해서 푼다.
 - 레이저가 왼쪽 방향으로 발사되기 때문에 가장 가까운 왼쪽에 자신보다 높은 탑이 존재하면 자신보다 높은 탑 왼쪽에 있는 모든 탑들에게는 레이저를 보낼 수 없다.
 - 현재 탑보다 높은 탑을 만나기 이전에 자신보다 낮은 탑도 고려할 필요가 없다.
 (현재 탑도 자신보다 낮은 탑에 레이저를 보낼 수 없고 현재 탑 오른쪽에 있는 탑들도 레이저를 보낼 수 없다.)
 - 탑을 순차적으로 순회하며 현재 탑보다 높이가 낮은 이전 탑들은 고려할 필요가 없다. 즉 스택에서 제거해준다.
 (이 작업은 현재 탑보다 높이가 낮은 이전 탑들이 여러개 존재할 수 있기 때문에 여러번 수행될 수도 있다.)

 어쩔 때 0을 넣어줄 것인가?
 - while을 수행하는 동안에는 현재 탑을 스택에 넣지 않고 while문이 종료되었을 때 stack의 길이를 확인 후 넣어준다.
 - 이렇게 하면 스택이 비어있다면 현재 탑의 레이저를 수신할 수 있는 이전 탑이 없다는 것이기에 그 때 0을 넣어주면 된다.

 정답은 탑의 인덱스를 구하는 것인데 인덱스는 어떻게 표시할 것인가?
 - 스택에 탑을 넣을 때 인덱스값도 같이 넣으면 된다.
*/
