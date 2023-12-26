function solution(cap, n, deliveries, pickups) {
  let answer = 0;

  while (n > 0 && deliveries[n - 1] === 0 && pickups[n - 1] === 0) {
    deliveries.pop();
    pickups.pop();

    n -= 1;
  }

  while (true) {
    let cnt = cap;

    for (let i = deliveries.length - 1; i >= 0; i--) {
      if (deliveries[i] <= cnt) {
        cnt -= deliveries[i];
        deliveries[i] = 0;
        deliveries.pop();
      } else {
        deliveries[i] -= cnt;
        cnt = 0;
        break;
      }
    }

    cnt = cap;
    for (let i = pickups.length - 1; i >= 0; i--) {
      if (pickups[i] <= cnt) {
        cnt -= pickups[i];
        pickups[i] = 0;
        pickups.pop();
      } else {
        pickups[i] -= cnt;
        cnt = 0;
        break;
      }
    }

    answer += n * 2;

    n = Math.max(pickups.length, deliveries.length);

    if (n <= 0) break;
  }

  return answer;
}
