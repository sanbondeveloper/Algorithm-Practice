function solution(bandage, health, attacks) {
  const total = health;
  let time = 1;
  let heal = 0;
  const [t, x, y] = bandage;

  while (true) {
    if (attacks[0][0] === time) {
      heal = 0;
      health -= attacks[0][1];

      attacks.shift();
    } else {
      heal += 1;
      health += x;

      if (heal === t) {
        health += y;
        heal = 0;
      }
    }

    health = health > total ? total : health;

    if (health <= 0) return -1;

    if (attacks.length === 0) break;

    time += 1;
  }

  return health;
}
