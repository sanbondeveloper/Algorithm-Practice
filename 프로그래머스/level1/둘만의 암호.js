/*
  - string.charCodeAt
  - String.fromCharCode
*/

function solution(s, skip, index) {
  let answer = "";

  for (let ch of s) {
    let count = 0;

    while (count < index) {
      ch = ch === "z" ? "a" : String.fromCharCode(ch.charCodeAt(0) + 1);

      if (skip.includes(ch)) continue;

      count += 1;
    }

    answer += ch;
  }

  return answer;
}

const s = "aukks";
const skip = "wbqd";
const index = 5;

console.log(solution(s, skip, index));
