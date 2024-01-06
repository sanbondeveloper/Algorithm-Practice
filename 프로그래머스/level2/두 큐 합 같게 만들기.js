function solution(queue1, queue2) {
  const n = queue1.length;
  const queue = [...queue1, ...queue2];
  let total1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let total2 = queue2.reduce((acc, cur) => acc + cur, 0);
  let a = 0;
  let b = n;

  for (let i = 0; i < 4 * n; i++) {
    if (total1 === total2) return i;

    if (total1 > total2) {
      total1 -= queue[a % queue.length];
      total2 += queue[a % queue.length];
      a += 1;
    } else {
      total1 += queue[b % queue.length];
      total2 -= queue[b % queue.length];
      b += 1;
    }
  }

  return -1;
}
