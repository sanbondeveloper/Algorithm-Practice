class Heap {
  constructor() {
    this.items = [];
  }
  swap(index1, index2) {
    let temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  leftChildIndex(index) {
    return index * 2 + 1;
  }
  rightChildIndex(index) {
    return index * 2 + 2;
  }
  parent(index) {
    return this.items[this.parentIndex(index)];
  }
  leftChild(index) {
    return this.items[this.leftChildIndex(index)];
  }
  rightChild(index) {
    return this.items[this.rightChildIndex(index)];
  }
  peek() {
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
}
class MinHeap extends Heap {
  //bubbleUp
  bubbleUp() {
    let index = this.items.length - 1;
    while (
      this.parent(index) !== undefined &&
      this.parent(index) > this.items[index]
    ) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }
  //bubbleDown
  bubbleDown() {
    let index = 0;
    while (
      this.leftChild(index) !== undefined &&
      (this.leftChild(index) < this.items[index] ||
        this.rightChild(index) < this.items[index])
    ) {
      let smallerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) !== undefined &&
        this.rightChild(index) < this.items[smallerIndex]
      ) {
        smallerIndex = this.rightChildIndex(index);
      }
      this.swap(index, smallerIndex);
      index = smallerIndex;
    }
  }
  //add
  add(item) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }
  //poll
  poll() {
    let item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }
}
class MaxHeap extends MinHeap {
  //bubbleUp
  bubbleUp() {
    let index = this.items.length - 1;
    while (
      this.parent(index) !== undefined &&
      this.parent(index) < this.items[index]
    ) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }
  //bubbleDown
  bubbleDown() {
    let index = 0;
    while (
      this.leftChild(index) !== undefined &&
      (this.leftChild(index) > this.items[index] ||
        this.rightChild(index) > this.items[index])
    ) {
      let largerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) !== undefined &&
        this.rightChild(index) > this.items[largerIndex]
      ) {
        largerIndex = this.rightChildIndex(index);
      }
      this.swap(index, largerIndex);
      index = largerIndex;
    }
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input[0];
const arr = [];
for (let i = 1; i <= N; i++) {
  const [h, o] = input[i].split(' ').map(Number);

  if (h > o) arr.push([o, h]);
  else arr.push([h, o]);
}
const d = +input[N + 1];

arr.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];

  return a[1] - b[1];
});

const minHeap = new MinHeap();
let maxSize = 0;

for (let i = 0; i < arr.length; i++) {
  const iR = arr[i][1];
  const iL = arr[i][0];

  if (iR - iL <= d) {
    minHeap.add(iL);
  } else {
    continue;
  }

  while (minHeap.size() > 0) {
    const temp = minHeap.peek();
    if (iR - temp <= d) break;
    else minHeap.poll();
  }

  maxSize = Math.max(maxSize, minHeap.size());
}

console.log(maxSize);

/*
 라인스위핑 문제 - 우선순위 큐, 해당 문제에서는 최소힙 사용

 - 문제에서 회사와 집보다 직선상에서 이전에 있는 경우가 존재 -> 별도의 처리가 필요하다.
 - 도착지점을 기준으로 오름차순, 같으면 출발지점을 기준으로 오름차순
 - 배열을 순회하며 집과 회사의 거리가 <= d일 경우에만 출발지점을 최소힙에 넣어준다.
 - 이후 최소값과 현재 도착지점을 비교하여 거리가 > d일 때 힙에서 제거해준다.
*/
