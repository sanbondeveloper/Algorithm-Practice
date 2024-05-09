// const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
// const input = require('fs')
//   .readFileSync(filePath)
//   .toString()
//   .trim()
//   .split('\n');

var value = 1;

var obj = {
  value: 100,
  foo: function () {
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  },
};

obj.foo();
