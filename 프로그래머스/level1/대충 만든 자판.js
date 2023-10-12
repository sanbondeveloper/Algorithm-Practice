function solution(keymap, targets) {
  const answer = [];

  for (const target of targets) {
    let total = 0;
    let isAvailable = true;

    for (const ch of target) {
      let min = 1000;

      for (const key of keymap) {
        for (let i = 0; i < key.length; i++) {
          if (ch === key[i]) min = Math.min(min, i + 1);
        }
      }

      if (min === 1000) {
        isAvailable = false;
        break;
      }

      total += min;
    }

    if (isAvailable) answer.push(total);
    else answer.push(-1);
  }

  return answer;
}

const keymap = ["AGZ", "BSSS"];
const targets = ["ASA", "BGZ"];

console.log(solution(keymap, targets));
