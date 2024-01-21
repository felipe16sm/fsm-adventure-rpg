class MainScreenLayout {
  element = document.createElement("div");
  sideBarElement = document.createElement("div");
  contentElement = document.createElement("div");
  playerTitleElement = document.createElement("div");

  constructor() {
    this.loadPlayerData();
    this.generatePlayerSideBarCard();

    this.generateMainScreenLayout();
  }

  loadPlayerData() {
    const playerCharacterData = JSON.parse(localStorage.getItem("player"));

    this.playerCharacter = new Character({
      id: playerCharacterData.id,
      name: playerCharacterData.name,
      charClass: playerCharacterData.charClass,
      level: playerCharacterData.level,
    });

    this.playerCharacter.changeHP(playerCharacterData.HP);
    this.playerCharacter.changeMP(playerCharacterData.MP);
    this.playerCharacter.changeXP(playerCharacterData.XP);
  }

  generatePlayerSideBarCard() {
    this.playerTitleElement.style.fontSize = "12px";
    this.playerTitleElement.style.color = "#FFF";
    this.playerTitleElement.style.margin = "16px 0";
    this.playerTitleElement.textContent = `${this.playerCharacter.name} level ${this.playerCharacter.level}`;

    this.sideBarElement.appendChild(this.playerTitleElement);

    this.generateStatusProgressHPBarInfo();
    this.generateStatusProgressMPBarInfo();
    this.generateStatusProgressXPBarInfo();
  }

  generateStatusProgressHPBarInfo() {
    const characterHPBar = new ProgressBar({
      value: this.playerCharacter.HP,
      totalValue: this.playerCharacter.HP_TOTAL,
      barColor: "#FF0000",
    });

    characterHPBar.element.style.border = "3px solid #FFF";

    document.addEventListener(`changeHP-${this.playerCharacter.id}`, () => {
      characterHPBar.changeValue(this.playerCharacter.HP);
    });

    document.addEventListener(`changeAll-${this.playerCharacter.id}`, () => {
      characterHPBar.changeValue(this.playerCharacter.HP);
      characterHPBar.changeTotalValue(this.playerCharacter.HP_TOTAL);
    });

    this.statusProgressHPBarInfo = new StatusProgressBarInfo({
      label: "HP",
      progressBar: characterHPBar,
    });

    this.statusProgressHPBarInfo.element.style.marginBottom = "16px";
    this.statusProgressHPBarInfo.element.style.fontSize = "12px";
    this.statusProgressHPBarInfo.element.style.color = "#FFF";

    this.sideBarElement.appendChild(this.statusProgressHPBarInfo.element);
  }

  generateStatusProgressMPBarInfo() {
    if (this.playerCharacter.MP_TOTAL !== 0) {
      const characterMPBar = new ProgressBar({
        value: this.playerCharacter.MP,
        totalValue: this.playerCharacter.MP_TOTAL,
        barColor: "#0000FF",
      });

      characterMPBar.element.style.border = "3px solid #FFF";

      document.addEventListener(`changeMP-${this.playerCharacter.id}`, () => {
        characterMPBar.changeValue(this.playerCharacter.MP);
      });

      document.addEventListener(`changeAll-${this.playerCharacter.id}`, () => {
        characterMPBar.changeValue(this.playerCharacter.MP);
        characterMPBar.changeTotalValue(this.playerCharacter.MP_TOTAL);
      });

      this.statusProgressMPBarInfo = new StatusProgressBarInfo({
        label: "MP",
        progressBar: characterMPBar,
      });

      this.statusProgressMPBarInfo.element.style.marginBottom = "16px";
      this.statusProgressMPBarInfo.element.style.fontSize = "12px";
      this.statusProgressMPBarInfo.element.style.color = "#FFF";

      this.sideBarElement.appendChild(this.statusProgressMPBarInfo.element);
    }
  }

  generateStatusProgressXPBarInfo() {
    const characterXPBar = new ProgressBar({
      value: this.playerCharacter.XP,
      totalValue: 100,
      barColor: "#00FF00",
    });

    characterXPBar.element.style.border = "3px solid #FFF";

    document.addEventListener(`changeXP-${this.playerCharacter.id}`, () => {
      characterXPBar.changeValue(this.playerCharacter.XP);
    });

    document.addEventListener(`changeAll-${this.playerCharacter.id}`, () => {
      characterXPBar.changeValue(this.playerCharacter.XP);
    });

    this.statusProgressXPBarInfo = new StatusProgressBarInfo({
      label: "XP",
      progressBar: characterXPBar,
    });

    this.statusProgressXPBarInfo.element.style.marginBottom = "16px";
    this.statusProgressXPBarInfo.element.style.fontSize = "12px";
    this.statusProgressXPBarInfo.element.style.color = "#FFF";

    this.sideBarElement.appendChild(this.statusProgressXPBarInfo.element);
  }

  generateMainScreenLayout() {
    this.element.style.display = "flex";

    this.sideBarElement.style.minHeight = "100vh";
    this.sideBarElement.style.width = "320px";
    this.sideBarElement.style.backgroundColor = "#0A8A48";
    this.sideBarElement.style.padding = "20px";

    this.contentElement.style.padding = "20px";
    this.contentElement.style.display = "flex";
    this.contentElement.style.width = "100%";
    this.contentElement.style.flexDirection = "column";
    this.contentElement.style.alignItems = "center";

    const titleMessageContentElement = document.createElement("h2");

    titleMessageContentElement.textContent =
      "Bem vindo! Clique em Explorar e escolha uma zona de combate ou clique em Descansar para recuperar o HP e o MP";

    titleMessageContentElement.style.textAlign = "center";
    titleMessageContentElement.style.lineHeight = "40px";

    this.contentElement.appendChild(titleMessageContentElement);

    this.generateMenuItem({
      action: () => {
        console.log("Teste");
      },
      label: "Explorar",
    });

    this.generateMenuItem({
      action: () => {
        this.restPlayer();
      },
      label: "Descansar",
    });

    this.element.appendChild(this.sideBarElement);
    this.element.appendChild(this.contentElement);
  }

  generateMenuItem({ action, label }) {
    const itemElement = document.createElement("div");

    itemElement.style.border = "2px solid #FFF";
    itemElement.style.borderRadius = "4px";
    itemElement.style.margin = "28px 0";
    itemElement.style.padding = "8px";
    itemElement.style.cursor = "pointer";
    itemElement.style.color = "#FFF";
    itemElement.style.display = "flex";
    itemElement.style.justifyContent = "center";
    itemElement.style.alignItems = "center";
    itemElement.style.fontSize = "12px";

    itemElement.textContent = label;

    itemElement.addEventListener("click", () => {
      action && action();
    });

    itemElement.addEventListener("mouseover", () => {
      itemElement.style.backgroundColor = "#12c96b";
    });

    itemElement.addEventListener("mouseleave", () => {
      itemElement.style.backgroundColor = "transparent";
    });

    this.sideBarElement.appendChild(itemElement);
  }

  restPlayer() {
    this.contentElement.innerHTML = "";

    const restMessageElement = document.createElement("h1");

    restMessageElement.textContent = "Descansando...";
    restMessageElement.style.textAlign = "center  ";

    const spinner = new Spinner();
    spinner.element.style.margin = "16px 0";

    setTimeout(() => {
      this.playerCharacter.changeHP(this.playerCharacter.HP_TOTAL);
      this.playerCharacter.changeMP(this.playerCharacter.MP_TOTAL);

      const data = {
        id: this.playerCharacter.id,
        name: this.playerCharacter.name,
        charClass: this.playerCharacter.charClass,
        HP: this.playerCharacter.HP,
        MP: this.playerCharacter.MP,
        XP: this.playerCharacter.XP,
        level: this.playerCharacter.level,
      };

      localStorage.setItem("player", JSON.stringify(data));

      restMessageElement.textContent = "HP e MP restaurados";

      this.contentElement.removeChild(spinner.element);
    }, 1500);

    this.contentElement.appendChild(restMessageElement);
    this.contentElement.appendChild(spinner.element);
  }
}
