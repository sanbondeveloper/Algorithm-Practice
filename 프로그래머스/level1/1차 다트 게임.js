function solution(dartResult) {
  const answer = [];
  const n = dartResult.length;

  for (let i = 0; i < n; i++) {
    const isTen = dartResult[i] === "1" && dartResult[i + 1] === "0";
    let total = 0;
    const score = isTen ? "10" : dartResult[i];
    const bonus = !isTen ? dartResult[i + 1] : dartResult[i + 2];
    const option = !isTen ? dartResult[i + 2] : dartResult[i + 3];

    if (isTen) i += 1;

    if (bonus === "S") total = +score;
    else if (bonus === "D") total = +score * +score;
    else if (bonus === "T") total = +score * +score * +score;

    if (option === "*" || option === "#") {
      if (option === "*") {
        if (answer.length === 0) answer.push(total * 2);
        else {
          answer[answer.length - 1] *= 2;
          answer.push(total * 2);
        }
      } else {
        answer.push(-1 * total);
      }

      i += 2;
    } else {
      i += 1;
      answer.push(total);
    }
  }

  return answer.reduce((acc, cur) => acc + cur, 0);
}
