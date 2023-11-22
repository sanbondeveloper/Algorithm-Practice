function solution(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];

      answer.push(sum);
    }
  }
  return [...new Set(answer)].sort((a, b) => a - b);
}
