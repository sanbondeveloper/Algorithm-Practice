// [14890/경사로](https://www.acmicpc.net/problem/14890)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, L] = input[0].split(' ').map(Number);
const road1 = input.slice(1).map((row) => row.split(' ').map(Number));
const road2 = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 0)
);
let answer = 0;

function passCnt(road) {
  for (let i = 0; i < N; i++) {
    const slope = Array(N).fill(false);
    let possible = true;

    for (let h = 0; h < N - 1; h++) {
      if (Math.abs(road[i][h] - road[i][h + 1]) > 1) {
        possible = false;
        break;
      }

      if (road[i][h] === road[i][h + 1] + 1) {
        const cur_height = road[i][h + 1];

        for (let k = h + 2; k < h + 1 + L; k++) {
          if (k >= N || road[i][k] !== cur_height) {
            possible = false;
            break;
          }
        }

        if (possible) {
          slope[h + L] = true;
        } else {
          break;
        }
      }

      if (road[i][h] === road[i][h + 1] - 1) {
        const cur_height = road[i][h];

        for (let k = h; k > h - L; k--) {
          if (k < 0 || road[i][k] !== cur_height || slope[k]) {
            possible = false;
            break;
          }
        }

        if (!possible) break;
      }
    }

    if (possible) answer += 1;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    road2[j][i] = road1[i][j];
  }
}

passCnt(road1);
passCnt(road2);

console.log(answer);
