function solution(babbling) {
  let answer = 0;
  const array = ["aya", "ye", "woo", "ma"];

  for (let bab of babbling) {
    for (const word of array) {
      if (bab.includes(word.repeat(2))) break;

      bab = bab.split(word).join(" ");
    }

    if (bab.split(" ").join("").length === 0) answer += 1;
  }

  return answer;
}
