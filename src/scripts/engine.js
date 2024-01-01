const player = new Character({
  name: "Felipe",
  charClass: "warrior",
  level: 1,
});

const enemy = new Character({
  name: "Goblin",
  charClass: "warrior",
  level: 1,
});

player.attackEnemy(enemy, "physical");
