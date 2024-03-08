const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
let [N, nums, ops] = input;
N = +N;
nums = nums.split(' ').map(Number);
ops = ops.split(' ').map(Number);
// let total = nums[0];
let min = Number.MAX_SAFE_INTEGER;
let max = Number.MIN_SAFE_INTEGER;

const dfs = (idx, sum) => {
  if (idx === N) {
    min = Math.min(min, sum);
    max = Math.max(max, sum);
    return;
  }

  if (ops[0] > 0) {
    ops[0] -= 1;
    dfs(idx + 1, sum + nums[idx]);
    ops[0] += 1;
  }

  if (ops[1] > 0) {
    ops[1] -= 1;
    dfs(idx + 1, sum - nums[idx]);
    ops[1] += 1;
  }

  if (ops[2] > 0) {
    ops[2] -= 1;
    dfs(idx + 1, sum * nums[idx]);
    ops[2] += 1;
  }

  if (ops[3] > 0) {
    ops[3] -= 1;
    dfs(idx + 1, ~~(sum / nums[idx]));
    ops[3] += 1;
  }
};

dfs(1, nums[0]);
console.log(max);
console.log(min);
