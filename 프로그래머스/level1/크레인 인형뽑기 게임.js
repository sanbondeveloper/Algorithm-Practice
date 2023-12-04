function solution(board, moves) {
  let answer = 0;
  let n = board.length;
  const bucket = [];

  for (const move of moves) {
    for (let i = 0; i < n; i++) {
      const doll = board[i][move - 1];

      if (doll !== 0) {
        bucket.push(doll);
        board[i][move - 1] = 0;
        break;
      }
    }

    while (
      bucket.length >= 2 &&
      bucket[bucket.length - 2] === bucket[bucket.length - 1]
    ) {
      bucket.pop();
      bucket.pop();
      answer += 2;
    }
  }

  return answer;
}
