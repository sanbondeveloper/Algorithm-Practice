// [14226/이모티콘](https://www.acmicpc.net/problem/14226)

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const S = +input[0];

function bfs() {
  const queue = [];
  const visited = new Set();
  queue.push([1, 0, 0]);
  visited.add(`100`);

  while (queue.length > 0) {
    const [cnt, time, clipboard] = queue.shift();

    if (cnt === S) return console.log(time);

    if (
      clipboard > 0 &&
      !visited.has(`${cnt + clipboard}${time + 1}${clipboard}`)
    ) {
      visited.add(`${cnt + clipboard}${time + 1}${clipboard}`);
      queue.push([cnt + clipboard, time + 1, clipboard]);
    }

    const newClipboard = cnt;
    if (
      newClipboard > 0 &&
      clipboard !== cnt &&
      !visited.has(`${cnt}${time + 1}${newClipboard}`)
    ) {
      visited.add(`${cnt}${time + 1}${newClipboard}`);
      queue.push([cnt, time + 1, newClipboard]);
    }

    if (cnt > 0 && !visited.has(`${cnt - 1}${time + 1}${clipboard}`)) {
      visited.add(`${cnt - 1}${time + 1}${clipboard}`);
      queue.push([cnt - 1, time + 1, clipboard]);
    }
  }
}

bfs();
