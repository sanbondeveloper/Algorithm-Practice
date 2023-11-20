function solution(s) {
  const arr = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  for (let i = 0; i <= 9; i++) {
    s = s.replaceAll(arr[i], i);
  }

  return parseInt(s, 10);
}
