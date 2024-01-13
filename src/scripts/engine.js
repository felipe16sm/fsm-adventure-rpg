const player = new Character({
  id: UUID.generateUUIDv4(),
  name: "Felipe",
  charClass: "mage",
  level: 1,
});

const enemy = new Character({
  name: "Goblin",
  charClass: "warrior",
  level: 1,
});

setTimeout(() => {
  enemy.attackEnemy(player, "physical");
  setTimeout(() => {
    enemy.attackEnemy(player, "physical");
  }, 1000);
}, 1000);

setTimeout(() => {
  player.attackEnemy(enemy, "magic");
  setTimeout(() => {
    player.attackEnemy(enemy, "magic");

    for (let i = 0; i <= 330; i++) {
      player.attackEnemy(enemy, "physical");
    }
  }, 1000);
}, 1000);

// const bar = new ProgressBar({
//   value: 30,
//   totalValue: 100,
//   barColor: "#00FF00",
// });

// const statusInfo = new StatusInfo({
//   label: "HP",
//   progressBar: bar,
// });

// bar.changeTotalValue(500);
// bar.changeValue(150);

const characterCard = new CharacterCard(player);

document.body.appendChild(characterCard.element);

console.log(player);
