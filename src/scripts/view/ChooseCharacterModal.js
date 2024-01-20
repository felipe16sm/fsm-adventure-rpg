class ChooseCharacterModal extends Modal {
  playerName = "";
  selectedClass = "warrior";

  playerClasses = [
    { label: "Warrior", value: "warrior" },
    { label: "Mage", value: "mage" },
  ];

  errorElement = document.createElement("div");

  constructor() {
    super();

    this.modalContainerElement.style.display = "flex";
    this.modalContainerElement.style.flexDirection = "column";

    this.generateChooseCharacterModal();
  }

  generateChooseCharacterModal() {
    this.modalContainerElement.style.backgroundColor = "#ABCDEF";
    this.modalContainerElement.style.maxWidth = "360px";

    this.generatePlayerNameInput();
    this.generateError();
    this.generateClassSelector();
    this.generateConfirmationButton();
  }

  generatePlayerNameInput() {
    const playerNameLabelElement = document.createElement("div");
    playerNameLabelElement.textContent = "Nome do jogador";
    playerNameLabelElement.style.margin = "0 0 8px 0";

    const playerNameInputElement = document.createElement("input");
    playerNameInputElement.style.padding = "4px";

    playerNameInputElement.addEventListener("change", (e) => {
      this.playerName = e.target.value;
    });

    this.modalContainerElement.appendChild(playerNameLabelElement);
    this.modalContainerElement.appendChild(playerNameInputElement);
  }

  generateClassSelector() {
    const characterClassElementLabel = document.createElement("div");
    characterClassElementLabel.textContent = "Classe";
    characterClassElementLabel.style.margin = "16px 0 8px 0";

    const selectorElement = document.createElement("select");
    selectorElement.style.padding = "8px";

    selectorElement.addEventListener("change", (e) => {
      this.selectedClass = e.target.value;
    });

    this.playerClasses.forEach((e) => {
      const optionElement = document.createElement("option");

      optionElement.textContent = e.label;
      optionElement.setAttribute("value", e.value);

      selectorElement.appendChild(optionElement);
    });

    this.modalContainerElement.appendChild(characterClassElementLabel);
    this.modalContainerElement.appendChild(selectorElement);
  }

  generateError() {
    this.errorElement.style.display = "none";
    this.errorElement.style.color = "#F00";
    this.errorElement.style.margin = "8px 0";
    this.errorElement.style.fontSize = "12px";

    this.modalContainerElement.appendChild(this.errorElement);
  }

  generateConfirmationButton() {
    const button = new Button({
      label: "Ok",
      backgroundColor: "#000022DD",
      color: "#FFF",
    });

    button.element.style.display = "flex";
    button.element.style.justifyContent = "center";
    button.element.style.margin = "8px 0 0 0";

    button.element.addEventListener("click", () => {
      if (!this.playerName) {
        this.errorElement.style.display = "block";
        this.errorElement.textContent = "Digite o nome do player";
        return;
      }

      const data = { name: this.playerName, class: this.selectedClass };

      localStorage.setItem("player", JSON.stringify(data));

      this.closeModal();
    });

    this.modalContainerElement.appendChild(button.element);
  }
}
