function solution(s) {
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    const target = s[i];
    let x = 1;
    let notX = 0;

    for (let j = i + 1; j < s.length; j++) {
      if (target === s[j]) x += 1;
      else notX += 1;

      if (x === notX) {
        answer += 1;
        i = j;
        break;
      }
    }

    if (x !== notX) {
      answer += 1;
      break;
    }
  }

  return answer;
}

const s = "aaabbaccccabba";

console.log(solution(s));
