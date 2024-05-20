const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map((el) => +el);
let answer = 1;

arr.sort((a, b) => a - b);

// 길이를 조금씩 줄여가면서 확인
for (let i = 0; i < N - 1; i++) {
  for (let j = N - 1; j >= 0; j--) {
    if (i + 1 === j) break;

    if (arr[i] + arr[i + 1] > arr[j]) {
      answer = Math.max(answer, j - i + 1);

      break; // arr가 정렬되어 있기 때문에 더 이상 확인할 필요 없다.
    }
  }
}

// 수열의 길이가 2 이하인 경우, 항상 삼각 수열이라고 한다.
console.log(answer === 1 && N >= 2 ? 2 : answer);
