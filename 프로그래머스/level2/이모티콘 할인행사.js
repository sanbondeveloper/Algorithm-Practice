function solution(users, emoticons) {
  const result = [];
  let temp = [];
  const rate = [10, 20, 30, 40];
  const answer = [];

  function getDupPermutation(cnt) {
    if (cnt === emoticons.length) {
      result.push([...temp]);
      return;
    }

    for (let i = 0; i < 4; i++) {
      temp.push(rate[i]);
      getDupPermutation(cnt + 1);
      temp.pop();
    }
  }

  getDupPermutation(0);

  for (const target of result) {
    let count = 0;
    let total = 0;

    for (const [userRate, userPrice] of users) {
      let subTotal = 0;

      for (let i = 0; i < target.length; i++) {
        if (target[i] < userRate) continue;

        subTotal += emoticons[i] * (1 - target[i] * 0.01);
      }

      if (subTotal < userPrice) total += subTotal;
      else count += 1;
    }

    answer.push([count, total]);
  }

  return answer.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];

    return b[0] - a[0];
  })[0];
}
