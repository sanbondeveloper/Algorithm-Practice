const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const str = input[0];
const stack = [];
let answer = 0;
let temp = 1;

for (let i = 0; i < str.length; i++) {
  const ch = str[i];

  if (ch === '(' || ch === '[') {
    stack.push(ch);

    if (ch === '(') temp *= 2;
    else temp *= 3;
  } else if (ch === ')' || ch === ']') {
    if (!stack.length) {
      answer = 0;
      break;
    }

    const top = stack.pop();
    if (ch === ')') {
      if (top !== '(') {
        answer = 0;
        break;
      }

      if (str[i - 1] === '(') {
        answer += temp;
        temp /= 2;
      } else {
        temp /= 2;
      }
    } else {
      if (top !== '[') {
        answer = 0;
        break;
      }

      if (str[i - 1] === '[') {
        answer += temp;
        temp /= 3;
      } else {
        temp /= 3;
      }
    }
  }
}

if (stack.length !== 0) answer = 0;

console.log(answer);

/*
 분배법칙을 이용해서 구현한다.
 여는 괄호가 나올 때 곱셈을 수행한다.
 닫히는 괄호가 나올 때 이전 문자열에 따라 정답에 더해줄지를 결정한다.
*/
