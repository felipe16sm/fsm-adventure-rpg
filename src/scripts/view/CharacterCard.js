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

    nameElement.style.fontSize = "20px";
    nameElement.textContent = this.character.name;

    const levelElement = document.createElement("div");
    levelElement.style.fontSize = "12px";
    levelElement.textContent = `Level ${this.character.level}`;

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

      this.statusProgressMPBarInfo = new StatusProgressBarInfo({
        label: "MP",
        progressBar: characterMPBar,
      });

      this.statusProgressMPBarInfo.element.style.marginBottom = "16px";

      this.element.appendChild(this.statusProgressMPBarInfo.element);
    }
  }

  generateStatusAttackInfo() {
    this.statusAttackInfo = new StatusInfo({
      label: "Attack",
      value: this.character.ATTACK,
    });

    this.statusAttackInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusAttackInfo.element);
  }

  generateStatusDefenseInfo() {
    this.statusDefenseInfo = new StatusInfo({
      label: "Defense",
      value: this.character.DEFENSE,
    });

    this.statusDefenseInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusDefenseInfo.element);
  }

  generateStatusAgilityInfo() {
    this.statusAgilityInfo = new StatusInfo({
      label: "Agility",
      value: this.character.AGILITY,
    });

    this.statusAgilityInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusAgilityInfo.element);
  }

  generateMagicAttackInfo() {
    this.statusMagicAttackInfo = new StatusInfo({
      label: "Magic Attack",
      value: this.character.MAGIC_ATTACK,
    });

    this.statusMagicAttackInfo.element.style.marginBottom = "16px";

    this.element.appendChild(this.statusMagicAttackInfo.element);
  }

  generateMagicDefenseInfo() {
    this.statusMagicDefenseInfo = new StatusInfo({
      label: "Magic Defense",
      value: this.character.MAGIC_DEFENSE,
    });

    this.element.appendChild(this.statusMagicDefenseInfo.element);
  }
}
