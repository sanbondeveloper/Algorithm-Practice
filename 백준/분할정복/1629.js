const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [A, B, C] = require('fs')
  .readFileSync(filePath)
  .toString()
  .split(' ')
  .map(BigInt);

function dfs(power) {
  if (power === 1n) {
    return A % C;
  }

  const half = dfs(power / 2n) % C;

  if (power % 2n) {
    return (half * half * (A % C)) % C;
  }

  return (half * half) % C;
}

console.log(dfs(B).toString());
