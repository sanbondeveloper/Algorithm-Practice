const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const str1 = input[0].split('');
const str2 = input[1].split('');
const dp = Array.from({ length: str1.length + 1 }, () =>
  Array.from({ length: str2.length + 1 }, () => 0)
);

for (let i = 1; i <= str1.length; i++) {
  for (let j = 1; j <= str2.length; j++) {
    if (str1[i - 1] === str2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[str1.length][str2.length]);

/*
  LCS(최장 공통 부분 수열)
*/
