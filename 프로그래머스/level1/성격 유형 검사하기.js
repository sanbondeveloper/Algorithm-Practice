function solution(survey, choices) {
  const answer = [];
  const count_map = {};
  const types = ['RT', 'FC', 'MJ', 'AN'];
  
  for (const type of types) {
    const [a, b] = type.split('');
      
    count_map[a] = 0;
    count_map[b] = 0;
  }
  
  for (let i = 0; i < survey.length; i++) {
    const [a, b] = survey[i].split('')
    const choice = choices[i];
    
    if (choice === 4) continue;
    else if (choice < 4) count_map[a] += (4 - choice);
    else count_map[b] += (choice - 4);
  }
  
  for (const type of types) {
    const [a, b] = type.split('');
    
    if (count_map[a] === count_map[b]) {
      answer.push(a.charCodeAt(0) < b.charCodeAt(0) ? a : b);
    } else if (count_map[a] > count_map[b]) {
      answer.push(a);
    } else {
      answer.push(b);
    }
  }    
  
  return answer.join('');
}