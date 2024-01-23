class MatchCard {
  element = document.createElement("div");
  messagePanelElement = document.createElement("div");
  actionsPanelElement = document.createElement("div");
  spinnerElement = new Spinner().element;

  constructor({ playerCharacter, enemyCharacter, leaveAction }) {
    this.playerCharacter = playerCharacter;
    this.enemyCharacter = enemyCharacter;
    this.message = "Escolha uma ação";
    this.leaveAction = leaveAction;

    this.generateMatchCard();
  }

  generateMatchCard() {
    this.element.style.width = "728px";
    const characterCardsContainerElement = document.createElement("div");
    characterCardsContainerElement.style.display = "flex";
    characterCardsContainerElement.style.justifyContent = "space-between";

    const playerCard = new CharacterCard(this.playerCharacter);
    const enemyCard = new CharacterCard(this.enemyCharacter);

    characterCardsContainerElement.appendChild(playerCard.element);
    characterCardsContainerElement.appendChild(enemyCard.element);

    this.element.appendChild(characterCardsContainerElement);

    this.generateMessagePanel();
    this.generateActionsPanel();
    this.generateSpinner();
  }

  generateMessagePanel() {
    this.messagePanelElement.style.backgroundColor = "#e6c8ba";
    this.messagePanelElement.style.display = "flex";
    this.messagePanelElement.style.justifyContent = "center";
    this.messagePanelElement.style.alignItems = "center";
    this.messagePanelElement.style.flexWrap = "wrap";
    this.messagePanelElement.style.padding = "20px";
    this.messagePanelElement.style.borderRadius = "4px";
    this.messagePanelElement.style.userSelect = "none";
    this.messagePanelElement.style.border = "2px solid #222";
    this.messagePanelElement.style.margin = "8px 0";

    this.messagePanelElement.textContent = this.message;

    this.element.appendChild(this.messagePanelElement);
  }

  generateActionsPanel() {
    this.actionsPanelElement.style.display = "flex";
    this.actionsPanelElement.style.justifyContent = "space-between";

    const physicalAttackButton = new Button({
      color: "#FFF",
      backgroundColor: "#00F",
      label: "Ataque Físico",
      action: () => {
        this.playRound("physical");
      },
    });

    const magicAttackButton = new Button({
      color: "#FFF",
      backgroundColor: "#00F",
      label: "Ataque Mágico",
      action: () => {
        this.playRound("magic");
      },
    });

    const runButton = new Button({
      color: "#FFF",
      backgroundColor: "#00F",
      label: "Sair",
      action: () => {
        this.leaveAction && this.leaveAction();
      },
    });

    this.actionsPanelElement.appendChild(physicalAttackButton.element);

    if (this.playerCharacter.charClass === "mage") {
      this.actionsPanelElement.appendChild(magicAttackButton.element);
    }

    this.actionsPanelElement.appendChild(runButton.element);

    this.element.appendChild(this.actionsPanelElement);
  }

  generateSpinner() {
    const spinnerContainerElement = document.createElement("div");
    spinnerContainerElement.style.display = "flex";
    spinnerContainerElement.style.justifyContent = "center";
    this.spinnerElement.style.display = "none";

    spinnerContainerElement.appendChild(this.spinnerElement);

    this.element.appendChild(spinnerContainerElement);
  }

  loadingAttack(isAttackLoading) {
    if (isAttackLoading) {
      this.actionsPanelElement.style.display = "none";
      this.spinnerElement.style.display = "block";
    } else {
      this.actionsPanelElement.style.display = "flex";
      this.spinnerElement.style.display = "none";
    }
  }

  changeMessage(message, color) {
    this.message = message;
    this.messagePanelElement.textContent = this.message;
    this.messagePanelElement.style.color = color || "#000";
  }

  async playRound(attackType) {
    await this.attackEnemy({ attacker: "player", attackType });

    if (
      this.enemyCharacter.charClass === "mage" &&
      this.enemyCharacter.MP > 0
    ) {
      await this.attackEnemy({ attacker: "enemy", attackType: "magic" });
    } else {
      await this.attackEnemy({ attacker: "enemy", attackType: "physical" });
    }
  }

  attackEnemy({ attacker, attackType }) {
    return new Promise((resolve) => {
      let attackerCharacter;
      let defenderCharacter;
      let messageColor;

      if (attacker === "player") {
        attackerCharacter = this.playerCharacter;
        defenderCharacter = this.enemyCharacter;
        messageColor = "#0000FF";
      } else {
        attackerCharacter = this.enemyCharacter;
        defenderCharacter = this.playerCharacter;
        messageColor = "#FF0000";
      }

      if (defenderCharacter.HP === 0) {
        this.changeMessage(
          `${defenderCharacter.name} está morto`,
          messageColor
        );
        resolve();
        return;
      }

      if (attackerCharacter.HP === 0) {
        this.changeMessage(
          `${attackerCharacter.name} está morto`,
          messageColor
        );
        resolve();
        return;
      }

      if (attackType === "physical") {
        this.changeMessage(
          `${attackerCharacter.name} lançou um ataque físico em ${defenderCharacter.name}`,
          messageColor
        );
      }

      if (attackType === "magic") {
        this.changeMessage(
          `${attackerCharacter.name} lançou um ataque mágico em ${defenderCharacter.name}`,
          messageColor
        );
      }

      this.loadingAttack(true);

      setTimeout(() => {
        const { damage, status } = attackerCharacter.attackEnemy(
          defenderCharacter,
          attackType
        );

        if (status === "SUCCESS") {
          this.changeMessage(
            `${attackerCharacter.name} causou ${damage} de dano em ${defenderCharacter.name}`,
            messageColor
          );
        }

        if (status === "NO_MP") {
          this.changeMessage(
            `${attackerCharacter.name} não tem mana`,
            messageColor
          );
        }

        if (status === "EVADED") {
          this.changeMessage(
            `${defenderCharacter.name} desviou do golpe`,
            messageColor
          );
        }

        setTimeout(() => {
          if (defenderCharacter.HP > 0 && attackerCharacter.HP > 0) {
            this.changeMessage("Escolha uma ação");
          }

          if (defenderCharacter.HP === 0) {
            this.changeMessage(`${defenderCharacter.name} está morto`);
          }

          if (attackerCharacter.HP === 0) {
            this.changeMessage(`${attackerCharacter.name} está morto`);
          }

          this.loadingAttack(false);
          resolve();
        }, 1500);
      }, 1500);
    });
  }
}
