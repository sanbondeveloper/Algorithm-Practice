function solution(sizes) {
  const width = [];
  const height = [];

  for (const [a, b] of sizes) {
    const max = Math.max(a, b);
    const min = Math.min(a, b);

    width.push(max);
    height.push(min);
  }

  return Math.max(...width) * Math.max(...height);
}
