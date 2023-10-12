function solution(cards1, cards2, goal) {
  const answer = "Yes";
  let a = 0;
  let b = 0;

  for (const word of goal) {
    if (a < cards1.length && cards1[a] === word) {
      a += 1;
      continue;
    }

    if (b < cards2.length && cards2[b] === word) {
      b += 1;
      continue;
    }

    return "No";
  }

  return answer;
}

const cards1 = ["i", "water", "drink"];
const cards2 = ["want", "to"];
const goal = ["i", "want", "to", "drink", "water"];

console.log(solution(cards1, cards2, goal));
