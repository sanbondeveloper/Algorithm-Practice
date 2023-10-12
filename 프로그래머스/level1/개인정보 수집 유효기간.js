function solution(today, terms, privacies) {
  const answer = [];
  const [today_y, today_m, today_d] = today.split(".").map((el) => +el);
  const termsMap = terms.reduce((acc, cur) => {
    const [a, b] = cur.split(" ");
    acc[a] = +b;

    return acc;
  }, {});
  let idx = 0;

  for (const privacy of privacies) {
    const [date, term] = privacy.split(" ");
    const period = termsMap[term];
    let [year, month, day] = date.split(".").map((el) => +el);

    month += period;

    if (month > 12) {
      year += Math.floor(month / 12);
      if (month % 12 === 0) year -= 1;
      month = month % 12 === 0 ? 12 : month % 12;
    }

    day -= 1;

    if (day === 0) {
      month -= 1;
      day = 28;

      if (month === 0) {
        year -= 1;
        month = 12;
      }
    }

    idx += 1;

    if (today_y < year) continue;
    if (today_y === year && today_m < month) continue;
    if (today_y === year && today_m === month && today_d <= day) continue;

    answer.push(idx);
  }

  return answer;
}

const today = "2020.01.01";
const terms = ["Z 3", "D 5"];
const privacies = [
  "2019.01.01 D",
  "2019.11.15 Z",
  "2019.08.02 D",
  "2019.07.01 D",
  "2018.12.28 Z",
];

console.log(solution(today, terms, privacies));
