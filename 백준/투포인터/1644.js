const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = generate(N);

let a = 0;
let b = 0;
let sum = 0;
let answer = 0;

// 작을 때 뒷부분 하나 추가한 뒤 해당 부분이 마지막이고 여전히 작다면 더이상 그 값을 만들 수 없기 때문에 종료
while (b <= arr.length) {
  // 크거나 같을 때는 앞부분 하나 제거, 작을 때는 뒷부분 하나 추가
  if (sum > N) {
    sum -= arr[a++];
  } else if (sum < N) {
    sum += arr[b++];
  } else {
    answer += 1;
    sum -= arr[a++];
  }
}

console.log(answer);

function generate(n) {
  const result = [];
  const isPrime = new Array(n + 1).fill(true);

  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    if (isPrime[i]) result.push(i);
  }

  return result;
}
