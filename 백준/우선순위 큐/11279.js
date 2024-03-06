class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  poll() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return value;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (this.heap[parentIdx] && this.heap[index] > this.heap[parentIdx]) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  bubbleDown() {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;

    while (
      (this.heap[leftIdx] && this.heap[leftIdx] > this.heap[index]) ||
      (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[index])
    ) {
      let biggerIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[biggerIdx]) {
        biggerIdx = rightIdx;
      }

      this.swap(index, biggerIdx);
      index = biggerIdx;
      leftIdx = index * 2 + 1;
      rightIdx = index * 2 + 2;
    }
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

let [N, ...arr] = input;
N = +N;
arr = arr.map(Number);
const heap = new MaxHeap();
const answer = [];

for (let i = 0; i < N; i++) {
  const target = arr[i];

  if (target === 0) {
    const value = heap.poll();

    answer.push(value || 0);
  } else {
    heap.add(target);
  }
}

console.log(answer.join('\n'));
