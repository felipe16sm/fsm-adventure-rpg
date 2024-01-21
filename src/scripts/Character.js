class Character {
  constructor({ id, name, charClass, level }) {
    this.id = id;
    this.name = name;
    this.charClass = charClass;
    this.level = level;
    this.XP = 0;

    this.generateAttributes();
  }

  generateAttributes() {
    switch (this.charClass) {
      case "warrior":
        this.HP = 9.5 + this.level * 1.5;
        this.HP_TOTAL = 9.5 + this.level * 1.5;
        this.ATTACK = this.level * 1.5;
        this.DEFENSE = this.level * 1.5;
        this.AGILITY = this.level;
        this.MP = 0;
        this.MP_TOTAL = 0;
        this.MAGIC_ATTACK = 0;
        this.MAGIC_DEFENSE = 0;
        break;
      case "mage":
        this.HP = 9 + this.level;
        this.HP_TOTAL = 9 + this.level;
        this.ATTACK = this.level;
        this.DEFENSE = this.level;
        this.AGILITY = this.level * 1.5;
        this.MP = 9 + this.level;
        this.MP_TOTAL = 9 + this.level;
        this.MAGIC_ATTACK = this.level * 1.5;
        this.MAGIC_DEFENSE = this.level * 1.5;
        break;
    }
  }

  attackEnemy(enemy, type) {
    const evadeFactor = (enemy.AGILITY * 0.5) / (enemy.AGILITY + this.AGILITY);
    const drawEvadeChance = Math.random();

    if (type === "magic") {
      this.changeMP(this.MP - 1);
    }

    if (evadeFactor > drawEvadeChance) {
      return { damage: 0, status: "EVADED" };
    }

    let damage;

    switch (type) {
      case "physical":
        damage = this.ATTACK - enemy.DEFENSE;
        break;
      case "magic":
        if (this.MP <= 0) {
          return { damage: 0, status: "NO_MP" };
        }

        damage = this.MAGIC_ATTACK - enemy.MAGIC_DEFENSE;
        break;
    }

    if (damage < 1) {
      damage = 1;
    }

    enemy.changeHP(enemy.HP - damage);

    this.addXP(damage);

    return { damage, status: "SUCCESS" };
  }

  changeHP(value) {
    if (value < 0) {
      this.HP = 0;
    } else {
      this.HP = value;
    }

    const event = new CustomEvent(`changeHP-${this.id}`);
    document.dispatchEvent(event);
  }

  changeMP(value) {
    if (value < 0) {
      this.MP = 0;
    } else {
      this.MP = value;
    }

    const event = new CustomEvent(`changeMP-${this.id}`);
    document.dispatchEvent(event);
  }

  changeXP(value) {
    this.XP = value;
    const event = new CustomEvent(`changeXP-${this.id}`);
    document.dispatchEvent(event);
  }

  addXP(value) {
    if (value + this.XP >= 100) {
      this.XP = 100 - (value + this.XP);
      this.levelUP();
      this.generateAttributes();
      const event = new CustomEvent(`changeAll-${this.id}`);
      document.dispatchEvent(event);
    } else {
      this.XP = this.XP + value;
      const event = new CustomEvent(`changeXP-${this.id}`);
      document.dispatchEvent(event);
    }
  }

  levelUP() {
    this.level++;

    const event = new CustomEvent(`changeLevel-${this.id}`);
    document.dispatchEvent(event);
  }
}
