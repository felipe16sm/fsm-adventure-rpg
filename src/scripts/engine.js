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

const bar = new ProgressBar({
  value: 30,
  totalValue: 100,
  barColor: "#00FF00",
});

const statusInfo = new StatusInfo({
  label: "HP",
  progressBar: bar,
});

bar.changeTotalValue(500);
bar.changeValue(150);

document.body.appendChild(statusInfo.element);
