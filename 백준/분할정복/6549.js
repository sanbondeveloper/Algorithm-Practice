const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const arr = input.map((v) => v.split(' ').map(Number));

const getMidArea = (left, right, mid, histogram) => {
  let toLeft = mid;
  let toRight = mid;
  let height = histogram[mid];
  let maxArea = height;

  while (left < toLeft && toRight < right) {
    if (histogram[toLeft - 1] < histogram[toRight + 1]) {
      toRight += 1;
      height = Math.min(height, histogram[toRight]);
    } else {
      toLeft -= 1;
      height = Math.min(height, histogram[toLeft]);
    }

    maxArea = Math.max(maxArea, height * (toRight - toLeft + 1));
  }

  while (toRight < right) {
    toRight += 1;
    height = Math.min(height, histogram[toRight]);
    maxArea = Math.max(maxArea, height * (toRight - toLeft + 1));
  }

  while (toLeft > left) {
    toLeft -= 1;
    height = Math.min(height, histogram[toLeft]);
    maxArea = Math.max(maxArea, height * (toRight - toLeft + 1));
  }

  return maxArea;
};

const getArea = (left, right, histogram) => {
  if (left === right) {
    // 히스토그램이 1개일 때
    return histogram[left];
  }

  // 나누는 작업 수행
  const mid = Math.floor((left + right) / 2);

  const leftArea = getArea(left, mid, histogram);
  const rightArea = getArea(mid + 1, right, histogram);

  // 일단, 왼쪽 영역과 오른쪽 영역에 대해 최대값을 구한다. 이는 최대값이 아닐 수 있다.
  let max = Math.max(leftArea, rightArea);

  max = Math.max(max, getMidArea(left, right, mid, histogram));

  return max;
};

const answer = [];

for (const [N, ...histogram] of arr) {
  if (N === 0) break;
  answer.push(getArea(0, N - 1, histogram));
}

console.log(answer.join('\n'));

/*
  일단 간단하게 히스토그램을 1개가 될 때까지 반으로 나누며 최대값을 찾는다. 왼쪽와 오른쪽 영역으로 분리한다고 생각하자
  반으로 나누며 찾은 최대값은 확실하게 최대값이라고 보장되지 않는다. 따라서 부분적으로 영역으로 넓이를 확인할 필요가 있다.
*/
