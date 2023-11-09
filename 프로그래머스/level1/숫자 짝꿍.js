function solution(X, Y) {
  let answer = "";
  const map_x = {};
  const map_y = {};

  for (const ch of X) {
    if (!map_x[ch]) map_x[ch] = 0;
    map_x[ch] += 1;
  }

  for (const ch of Y) {
    if (!map_y[ch]) map_y[ch] = 0;
    map_y[ch] += 1;
  }

  for (const key of Object.keys(map_x)) {
    if (!map_y[key]) continue;

    const min = Math.min(map_x[key], map_y[key]);

    answer += key.repeat(min);
  }

  if (answer === "") return "-1";

  const count = answer.split("").filter((el) => el !== "0").length;

  if (count === 0) return "0";

  return answer
    .split("")
    .sort((a, b) => b - a)
    .join("");
}
