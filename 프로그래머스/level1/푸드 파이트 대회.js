function solution(foods) {
  let answer = "";
  foods.shift();

  for (let i = 0; i < foods.length; i++) {
    const count = Math.floor(foods[i] / 2);
    const idx = String(i + 1);

    answer += idx.repeat(count);
  }

  answer += "0" + answer.split("").reverse().join("");

  return answer;
}

const foods = [1, 7, 1, 2];

console.log(solution(foods));
