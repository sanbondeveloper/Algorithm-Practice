const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = input.slice(1).map((row) => row.split(' ').map(Number));
const directions = Array(5).fill(-1);
const board = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => null)
);
let answer = 0;

const moveLeft = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
      let check = false;

      if (board[i][j] === 0) {
        let k = j + 1;
        while (k <= N - 1) {
          if (board[i][k] !== 0) {
            check = true;
            break;
          }

          k += 1;
        }

        if (check) {
          board[i][j] = board[i][k];
          board[i][k] = 0;
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
      if (board[i][j] === board[i][j + 1]) {
        board[i][j] *= 2;
        board[i][j + 1] = 0;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
      let check = false;

      if (board[i][j] === 0) {
        let k = j + 1;
        while (k < N) {
          if (board[i][k] !== 0) {
            check = true;
            break;
          }

          k += 1;
        }

        if (check) {
          board[i][j] = board[i][k];
          board[i][k] = 0;
        }
      }
    }
  }
};

const moveRight = () => {
  for (let i = 0; i < N; i++) {
    for (let j = N - 1; j > 0; j--) {
      let check = false;

      if (board[i][j] === 0) {
        let k = j - 1;
        while (k >= 0) {
          if (board[i][k] !== 0) {
            check = true;
            break;
          }

          k -= 1;
        }

        if (check) {
          board[i][j] = board[i][k];
          board[i][k] = 0;
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = N - 1; j > 0; j--) {
      if (board[i][j] === board[i][j - 1]) {
        board[i][j] *= 2;
        board[i][j - 1] = 0;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = N - 1; j > 0; j--) {
      let check = false;

      if (board[i][j] === 0) {
        let k = j - 1;
        while (k >= 0) {
          if (board[i][k] !== 0) {
            check = true;
            break;
          }

          k -= 1;
        }

        if (check) {
          board[i][j] = board[i][k];
          board[i][k] = 0;
        }
      }
    }
  }
};

const moveTop = () => {
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N; j++) {
      let check = false;

      if (board[i][j] === 0) {
        let k = i + 1;
        while (k <= N - 1) {
          if (board[k][j] !== 0) {
            check = true;
            break;
          }

          k += 1;
        }

        if (check) {
          board[i][j] = board[k][j];
          board[k][j] = 0;
        }
      }
    }
  }

  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === board[i + 1][j]) {
        board[i][j] *= 2;
        board[i + 1][j] = 0;
      }
    }
  }

  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N; j++) {
      let check = false;

      if (board[i][j] === 0) {
        let k = i + 1;
        while (k <= N - 1) {
          if (board[k][j] !== 0) {
            check = true;
            break;
          }

          k += 1;
        }

        if (check) {
          board[i][j] = board[k][j];
          board[k][j] = 0;
        }
      }
    }
  }
};

const moveBottom = () => {
  for (let i = N - 1; i > 0; i--) {
    for (let j = 0; j < N; j++) {
      let check = false;

      if (board[i][j] === 0) {
        let k = i - 1;
        while (k >= 0) {
          if (board[k][j] !== 0) {
            check = true;
            break;
          }

          k -= 1;
        }

        if (check) {
          board[i][j] = board[k][j];
          board[k][j] = 0;
        }
      }
    }
  }

  for (let i = N - 1; i > 0; i--) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === board[i - 1][j]) {
        board[i][j] *= 2;
        board[i - 1][j] = 0;
      }
    }
  }

  for (let i = N - 1; i > 0; i--) {
    for (let j = 0; j < N; j++) {
      let check = false;

      if (board[i][j] === 0) {
        let k = i - 1;
        while (k >= 0) {
          if (board[k][j] !== 0) {
            check = true;
            break;
          }

          k -= 1;
        }

        if (check) {
          board[i][j] = board[k][j];
          board[k][j] = 0;
        }
      }
    }
  }
};

const play = () => {
  for (let i = 0; i < 5; i++) {
    const dir = directions[i];

    if (dir === 0) moveRight();
    else if (dir === 1) moveLeft();
    else if (dir === 2) moveBottom();
    else if (dir === 3) moveTop();
  }

  answer = Math.max(answer, Math.max(...[].concat(...board)));
};

const permutation = (idx) => {
  if (idx === 5) {
    // 배열 복사
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        board[i][j] = arr[i][j];
      }
    }
    // 게임 시작
    play();
    return;
  }

  for (let d = 0; d < 4; d++) {
    directions[idx] = d;
    permutation(idx + 1);
    directions[idx] = -1;
  }
};

permutation(0);
console.log(answer);
