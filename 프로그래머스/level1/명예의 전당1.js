function solution(k, scores) {
  const answer = [];
  const rank = [];

  for (const score of scores) {
    rank.push(score);
    rank.sort((a, b) => b - a);

    if (rank.length > k) rank.pop();

    answer.push(rank[rank.length - 1]);
  }

  return answer;
}

const k = 4;
const score = [0, 300, 40, 300, 20, 70, 150, 50, 500, 1000];

console.log(solution(k, score));
