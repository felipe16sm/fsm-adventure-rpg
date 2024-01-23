class CharacterCard {
  element = document.createElement("div");

  constructor(character) {
    this.character = character;

    this.generateCharacterCard();
  }

  generateCharacterCard() {
    this.element.style.border = "2px solid #222";
    this.element.style.padding = "20px";
    this.element.style.width = "360px";
    this.element.style.borderRadius = "8px";

    this.generateHeaderInfo();

    this.generateStatusProgressHPBarInfo();

    this.generateStatusProgressMPBarInfo();

    this.generateStatusProgressXPBarInfo();

    this.generateStatusAttackInfo();

    this.generateStatusDefenseInfo();

    this.generateStatusAgilityInfo();

    this.generateMagicAttackInfo();

    this.generateMagicDefenseInfo();
  }

  generateHeaderInfo() {
    this.headerContainerElement = document.createElement("div");

    this.headerContainerElement.style.display = "flex";
    this.headerContainerElement.style.justifyContent = "space-between";
    this.headerContainerElement.style.alignItems = "center";
    this.headerContainerElement.style.marginBottom = "16px";

    const nameElement = document.createElement("div");

    nameElement.style.fontSize = "12px";
    nameElement.textContent = this.character.name;
    nameElement.style.maxWidth = "160px";

    const levelElement = document.createElement("div");
    levelElement.style.fontSize = "12px";
    levelElement.textContent = `Level ${this.character.level}`;

    document.addEventListener(`changeLevel-${this.character.id}`, () => {
      levelElement.textContent = `Level ${this.character.level}`;
    });

    const iconElement = document.createElement("div");

    if (this.character.charClass === "warrior") {
      iconElement.classList.add("sword");
    }

    if (this.character.charClass === "mage") {
      iconElement.classList.add("staff2");
    }

    this.headerContainerElement.appendChild(nameElement);
    this.headerContainerElement.appendChild(levelElement);
    this.headerContainerElement.appendChild(iconElement);

    this.element.appendChild(this.headerContainerElement);
  }

  generateStatusProgressHPBarInfo() {
    const characterHPBar = new ProgressBar({
      value: this.character.HP,
      totalValue: this.character.HP_TOTAL,
      barColor: "#FF0000",
    });

    document.addEventListener(`changeHP-${this.character.id}`, () => {
      characterHPBar.changeValue(this.character.HP);
    });

    document.addEventListener(`changeAll-${this.character.id}`, () => {
      characterHPBar.changeValue(this.character.HP);
      characterHPBar.changeTotalValue(this.character.HP_TOTAL);
    });

    this.statusProgressHPBarInfo = new StatusProgressBarInfo({
      label: "HP",
      progressBar: characterHPBar,
    });

    this.statusProgressHPBarInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusProgressHPBarInfo.element);
  }

  generateStatusProgressMPBarInfo() {
    if (this.character.MP_TOTAL !== 0) {
      const characterMPBar = new ProgressBar({
        value: this.character.MP,
        totalValue: this.character.MP_TOTAL,
        barColor: "#0000FF",
      });

      document.addEventListener(`changeMP-${this.character.id}`, () => {
        characterMPBar.changeValue(this.character.MP);
      });

      document.addEventListener(`changeAll-${this.character.id}`, () => {
        characterMPBar.changeValue(this.character.MP);
        characterMPBar.changeTotalValue(this.character.MP_TOTAL);
      });

      this.statusProgressMPBarInfo = new StatusProgressBarInfo({
        label: "MP",
        progressBar: characterMPBar,
      });

      this.statusProgressMPBarInfo.element.style.marginBottom = "16px";

      this.element.appendChild(this.statusProgressMPBarInfo.element);
    }
  }

  generateStatusProgressXPBarInfo() {
    const characterXPBar = new ProgressBar({
      value: this.character.XP,
      totalValue: 100,
      barColor: "#00FF00",
    });

    document.addEventListener(`changeXP-${this.character.id}`, () => {
      characterXPBar.changeValue(this.character.XP);
    });

    document.addEventListener(`changeAll-${this.character.id}`, () => {
      characterXPBar.changeValue(this.character.XP);
    });

    this.statusProgressXPBarInfo = new StatusProgressBarInfo({
      label: "XP",
      progressBar: characterXPBar,
    });

    this.statusProgressXPBarInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusProgressXPBarInfo.element);
  }

  generateStatusAttackInfo() {
    this.statusAttackInfo = new StatusInfo({
      label: "Attack",
      value: this.character.ATTACK,
    });

    document.addEventListener(`changeAll-${this.character.id}`, () => {
      this.statusAttackInfo.changeValue(this.character.ATTACK);
    });

    this.statusAttackInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusAttackInfo.element);
  }

  generateStatusDefenseInfo() {
    this.statusDefenseInfo = new StatusInfo({
      label: "Defense",
      value: this.character.DEFENSE,
    });

    document.addEventListener(`changeAll-${this.character.id}`, () => {
      this.statusDefenseInfo.changeValue(this.character.DEFENSE);
    });

    this.statusDefenseInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusDefenseInfo.element);
  }

  generateStatusAgilityInfo() {
    this.statusAgilityInfo = new StatusInfo({
      label: "Agility",
      value: this.character.AGILITY,
    });

    document.addEventListener(`changeAll-${this.character.id}`, () => {
      this.statusAgilityInfo.changeValue(this.character.AGILITY);
    });

    this.statusAgilityInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusAgilityInfo.element);
  }

  generateMagicAttackInfo() {
    this.statusMagicAttackInfo = new StatusInfo({
      label: "Magic Attack",
      value: this.character.MAGIC_ATTACK,
    });

    document.addEventListener(`changeAll-${this.character.id}`, () => {
      this.statusMagicAttackInfo.changeValue(this.character.MAGIC_ATTACK);
    });

    this.statusMagicAttackInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusMagicAttackInfo.element);
  }

  generateMagicDefenseInfo() {
    this.statusMagicDefenseInfo = new StatusInfo({
      label: "Magic Defense",
      value: this.character.MAGIC_DEFENSE,
    });

    document.addEventListener(`changeAll-${this.character.id}`, () => {
      this.statusMagicDefenseInfo.changeValue(this.character.MAGIC_DEFENSE);
    });

    this.element.appendChild(this.statusMagicDefenseInfo.element);
  }
}
