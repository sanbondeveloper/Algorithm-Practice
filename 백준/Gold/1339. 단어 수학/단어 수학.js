const input = [];
require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    input.push(line);
  })
  .on('close', function () {
    input.shift();
    console.log(solution(input));
    process.exit();
  });

function solution(arr) {
  const map = {};
  arr.forEach((str) => {
    let size = 1;

    for (let i = str.length - 1; i >= 0; i--) {
      if (!map[str[i]]) map[str[i]] = 0;
      map[str[i]] += size;
      size *= 10;
    }
  });

  const sortedArr = Object.entries(map).sort((a, b) => b[1] - a[1]);

  let target = 9;
  let total = 0;
  for (let i = 0; i < sortedArr.length; i++) {
    total += sortedArr[i][1] * target;
    target--;
  }
  return total;
}
