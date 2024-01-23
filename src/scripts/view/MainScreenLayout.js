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
        this.exploreZones();
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
    restMessageElement.style.textAlign = "center";

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

  exploreZones() {
    this.contentElement.innerHTML = "";

    const titleElement = document.createElement("h1");

    titleElement.textContent = "Zonas";
    titleElement.style.textAlign = "center";

    const zonesContainerElement = document.createElement("div");

    zonesContainerElement.style.display = "flex";
    zonesContainerElement.style.flexWrap = "wrap";
    zonesContainerElement.style.justifyContent = "space-between";
    zonesContainerElement.style.width = "100%";
    zonesContainerElement.style.margin = "20px";

    const zoneItemElement = ({ title, subtitle, action }) => {
      const containerElement = document.createElement("div");

      containerElement.style.backgroundColor = "#0A8A48";
      containerElement.style.display = "flex";
      containerElement.style.flexDirection = "column";
      containerElement.style.justifyContent = "center";
      containerElement.style.alignItems = "center";
      containerElement.style.borderRadius = "4px";
      containerElement.style.cursor = "pointer";
      containerElement.style.userSelect = "none";
      containerElement.style.color = "#FFF";
      containerElement.style.fontSize = "12px";
      containerElement.style.padding = "8px 0";
      containerElement.style.margin = "8px";
      containerElement.style.width = "360px";

      const titleElement = document.createElement("span");

      titleElement.textContent = title;
      titleElement.style.margin = "0 0 8px 0";

      const subtitleElement = document.createElement("span");

      subtitleElement.textContent = subtitle;

      containerElement.addEventListener("click", () => {
        action && action();
      });

      containerElement.addEventListener("mouseover", () => {
        containerElement.style.backgroundColor = "#12c96b";
      });

      containerElement.addEventListener("mouseleave", () => {
        containerElement.style.backgroundColor = "#0A8A48";
      });

      containerElement.appendChild(titleElement);
      containerElement.appendChild(subtitleElement);

      return containerElement;
    };

    const tempestValey = zoneItemElement({
      title: "Vale da Tempestade",
      subtitle: "Level 1 -> 10",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Goblin", charClass: "warrior" },
            { name: "Orc", charClass: "warrior" },
          ],
          levelMin: 1,
          levelMax: 10,
        });
      },
    });

    const forbiddenJungle = zoneItemElement({
      title: "Selva Proibida",
      subtitle: "Level 10 -> 20",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Necromante Perverso", charClass: "mage" },
            { name: "Engolidor de Almas", charClass: "mage" },
          ],
          levelMin: 10,
          levelMax: 20,
        });
      },
    });

    const ruinPlateau = zoneItemElement({
      title: "Planalto da ruína",
      subtitle: "Level 20 -> 30",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Elemental Caótico", charClass: "mage" },
            { name: "Harpia Sanguinária", charClass: "warrior" },
          ],
          levelMin: 20,
          levelMax: 30,
        });
      },
    });

    const canyonOfTheForgotten = zoneItemElement({
      title: "Desfiladeiro dos Esquecidos",
      subtitle: "Level 30 -> 40",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Esqueleto Carniceiro", charClass: "warrior" },
            { name: "Troll Trovejante", charClass: "warrior" },
          ],
          levelMin: 30,
          levelMax: 40,
        });
      },
    });

    const cityOfShadows = zoneItemElement({
      title: "Cidade das Sombras",
      subtitle: "Level 40 -> 50",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Serpente Venenosa", charClass: "warrior" },
            { name: "Homúnculo Sinistro", charClass: "warrior" },
          ],
          levelMin: 40,
          levelMax: 50,
        });
      },
    });

    const landOfSpirits = zoneItemElement({
      title: "Terra dos Espíritos",
      subtitle: "Level 50 -> 60",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Bruxo das Sombras", charClass: "mage" },
            { name: "Centauro Enlouquecido", charClass: "warrior" },
          ],
          levelMin: 50,
          levelMax: 60,
        });
      },
    });

    const deathIsland = zoneItemElement({
      title: "Ilha da morte",
      subtitle: "Level 60 -> 70",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Banshee Aterrorizante", charClass: "mage" },
            { name: "Sombra Assassina", charClass: "warrior" },
          ],
          levelMin: 60,
          levelMax: 70,
        });
      },
    });

    const lakeOfDespair = zoneItemElement({
      title: "Lago do Desespero",
      subtitle: "Level 70 -> 80",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Gigante de Pedra", charClass: "warrior" },
            { name: "Hidra Voraz", charClass: "warrior" },
          ],
          levelMin: 70,
          levelMax: 80,
        });
      },
    });

    const sinisterGlacier = zoneItemElement({
      title: "Geleira Sinistra",
      subtitle: "Level 80 -> 90",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Ciclope Devorador", charClass: "warrior" },
            { name: "Elemental de Gelo", charClass: "mage" },
          ],
          levelMin: 80,
          levelMax: 90,
        });
      },
    });

    const enchantedSwamp = zoneItemElement({
      title: "Pântano Enfeitiçado",
      subtitle: "Level 90 -> 100",
      action: () => {
        this.goToFightZone({
          enemyList: [
            { name: "Espectro Sombrio", charClass: "mage" },
            { name: "Draconiano Cruel", charClass: "warrior" },
          ],
          levelMin: 90,
          levelMax: 100,
        });
      },
    });

    zonesContainerElement.appendChild(tempestValey);
    zonesContainerElement.appendChild(forbiddenJungle);
    zonesContainerElement.appendChild(ruinPlateau);
    zonesContainerElement.appendChild(canyonOfTheForgotten);
    zonesContainerElement.appendChild(cityOfShadows);
    zonesContainerElement.appendChild(landOfSpirits);
    zonesContainerElement.appendChild(deathIsland);
    zonesContainerElement.appendChild(lakeOfDespair);
    zonesContainerElement.appendChild(sinisterGlacier);
    zonesContainerElement.appendChild(enchantedSwamp);

    this.contentElement.appendChild(titleElement);
    this.contentElement.appendChild(zonesContainerElement);
  }

  rafleEnemy({ enemyList, levelMin, levelMax }) {
    const positionSorted = Math.floor(Math.random() * enemyList.length);
    const sortedLevel = Math.floor(
      levelMin + Math.random() * (levelMax - levelMin + 1)
    );

    this.enemyCharacter = new Character({
      id: UUID.generateUUIDv4(),
      name: enemyList[positionSorted].name,
      charClass: enemyList[positionSorted].charClass,
      level: sortedLevel,
    });
  }

  goToFightZone({ enemyList, levelMin, levelMax }) {
    this.rafleEnemy({
      enemyList,
      levelMin,
      levelMax,
    });

    const matchCard = new MatchCard({
      playerCharacter: this.playerCharacter,
      enemyCharacter: this.enemyCharacter,
      leaveAction: () => {
        this.goToFightZone({ enemyList, levelMin, levelMax });
      },
    });

    this.contentElement.innerHTML = "";

    this.contentElement.appendChild(matchCard.element);
  }
}
