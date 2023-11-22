function solution(numbers, hand) {
  let answer = "";
  const pos_map = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    "*": [3, 0],
    0: [3, 1],
    "#": [3, 2],
  };
  let left = "*";
  let right = "#";

  for (const number of numbers) {
    if ([1, 4, 7].includes(number)) {
      left = number;
      answer += "L";
    } else if ([3, 6, 9].includes(number)) {
      right = number;
      answer += "R";
    } else {
      const [x, y] = pos_map[number];
      const [leftX, leftY] = pos_map[left];
      const [rightX, rightY] = pos_map[right];
      const left_distance = Math.abs(x - leftX) + Math.abs(y - leftY);
      const right_distance = Math.abs(x - rightX) + Math.abs(y - rightY);

      if (left_distance > right_distance) {
        right = number;
        answer += "R";
      } else if (left_distance < right_distance) {
        left = number;
        answer += "L";
      } else {
        if (hand === "left") {
          left = number;
          answer += "L";
        } else {
          right = number;
          answer += "R";
        }
      }
    }
  }
  return answer;
}
