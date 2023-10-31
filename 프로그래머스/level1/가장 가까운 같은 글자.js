function solution(s) {
  const answer = [];

  for (let i = 0; i < s.length; i++) {
    const target = s[i];
    let flag = true;

    for (let j = i - 1; j >= 0; j--) {
      if (target === s[j]) {
        answer.push(i - j);
        flag = false;
        break;
      }
    }

    if (flag) answer.push(-1);
  }

  return answer;
}

const s = "banana";

console.log(solution(s));
