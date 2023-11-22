function solution(n) {
  const answer = parseInt([...n.toString(3)].reverse().join(""), 3);
  return answer;
}
