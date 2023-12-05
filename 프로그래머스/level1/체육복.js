function solution(n, lost, reserve) {
  let answer = 0;
  const arr = Array.from({ length: n }, () => 1);

  for (const num of reserve) arr[num - 1] += 1;
  for (const num of lost) arr[num - 1] -= 1;

  for (let i = 0; i < arr.length; i++) {
    const prev = i - 1;
    const next = i + 1;

    if (arr[i] >= 1) {
      answer += 1;
      arr[i] -= 1;

      continue;
    }

    if (prev >= 0 && arr[prev] >= 1) {
      answer += 1;
      arr[prev] -= 1;

      continue;
    }

    if (next < n && arr[next] >= 2) {
      answer += 1;
      arr[next] -= 1;

      continue;
    }
  }

  return answer;
}
