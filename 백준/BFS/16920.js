const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

/*
 플레이어 수 만큼의 Queue가 필요하다. -> Queue 배열을 생성한다.
 Queue : 하나의 턴의 시작점들을 보관
 Next Queue : 하나의 턴에서 확장이 일어나는 점들을 보관
 성의 갯수 : 확장이 발생할 때마다 갱신해서 파악
 종료 조건 : 플레이어 수 크기의 확장 가능 배열을 만들어 확인
*/
