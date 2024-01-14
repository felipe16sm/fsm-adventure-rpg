const player = new Character({
  id: UUID.generateUUIDv4(),
  name: "Felipe",
  charClass: "mage",
  level: 1,
});

const enemy = new Character({
  id: UUID.generateUUIDv4(),
  name: "Goblin",
  charClass: "warrior",
  level: 1,
});

const characterCard = new CharacterCard(player);

const matchCard = new MatchCard({
  playerCharacter: player,
  enemyCharacter: enemy,
});

document.body.appendChild(matchCard.element);
