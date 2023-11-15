function solution(id_list, report, k) {
  const answer = [];
  const count_map = {};
  const report_map = {};
  const email_map = {};
  const reports = [...new Set(report)];

  for (const id of id_list) {
    count_map[id] = 0;
    email_map[id] = 0;
    report_map[id] = [];
  }

  for (const item of reports) {
    const [user, target] = item.split(" ");

    count_map[target] += 1;
    report_map[target].push(user);
  }

  for (const id of id_list) {
    if (count_map[id] < k) continue;

    for (const user of report_map[id]) email_map[user] += 1;
  }

  for (const id of id_list) {
    answer.push(email_map[id]);
  }

  return answer;
}
