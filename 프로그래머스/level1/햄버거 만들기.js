function solution(ingredients) {
  let answer = 0;
  const stack = [];

  for (const ingredient of ingredients) {
    stack.push(ingredient);

    while (stack.length >= 4) {
      const str =
        String(stack[stack.length - 4]) +
        String(stack[stack.length - 3]) +
        String(stack[stack.length - 2]) +
        String(stack[stack.length - 1]);

      if (str === "1231") {
        answer += 1;

        for (let i = 0; i < 4; i++) stack.pop();
      } else {
        break;
      }
    }
  }

  return answer;
}

const ingredients = [1, 3, 2, 1, 2, 1, 3, 1, 2];

console.log(solution(ingredients));
