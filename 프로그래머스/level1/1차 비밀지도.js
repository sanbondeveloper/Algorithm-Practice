function solution(n, arr1, arr2) {
  const answer = [];
  
  for (let i = 0; i < n; i++) {
    let a = arr1[i].toString(2);
    let b = arr2[i].toString(2);
      
    a = '0'.repeat(n - a.length) + a;
    b = '0'.repeat(n - b.length) + b;
    
    let row = '';
    for (let j = 0; j < n; j++) {
      if (a[j] === '1' || b[j] === '1') row += '#';
      else row += ' ';
    }
    
    answer.push(row);
  }
  
  return answer;
}