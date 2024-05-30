const input = [];

const strToNumArr = (str) => str.split(' ').map(Number);

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line.trim());
  })
  .on('close', function () {
    const [N, K] = strToNumArr(input.shift());
    const items = input.map((str) => strToNumArr(str));
    items.unshift(undefined);

    const maxVSum = [];
    for (let i = 0; i <= N; i++) {
      maxVSum.push(Array(K + 1).fill(0));
    }

    for (let n = 1; n <= N; n++) {
      const [weight, value] = items[n];
      for (let k = 0; k <= K; k++) {
        if (k < weight) {
          maxVSum[n][k] = maxVSum[n - 1][k];
        } else {
          maxVSum[n][k] = Math.max(
            maxVSum[n - 1][k],
            maxVSum[n - 1][k - weight] + value
          );
        }
      }
    }

    console.log(maxVSum[N][K]);
  });
