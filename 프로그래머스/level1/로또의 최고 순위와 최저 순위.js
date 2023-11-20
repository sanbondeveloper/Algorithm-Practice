function solution(lottos, win_nums) {
  let count = 0;
  let zero_count = 0;

  for (const lotto of lottos) {
    if (win_nums.includes(lotto)) count += 1;
    if (lotto === 0) zero_count += 1;
  }

  const min = 7 - count >= 6 ? 6 : 7 - count;
  const max = 7 - (count + zero_count) >= 6 ? 6 : 7 - (count + zero_count);

  return [max, min];
}
