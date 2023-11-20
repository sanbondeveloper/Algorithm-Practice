function solution(absolutes, signs) {
  let answer = 0;

  for (let i = 0; i < signs.length; i++) {
    const absolute = absolutes[i];
    const sign = signs[i];

    if (sign) answer += absolute;
    else answer -= absolute;
  }

  return answer;
}
