class GameOverModal extends Modal {
  constructor() {
    super();

    this.modalContainerElement.style.display = "flex";
    this.modalContainerElement.style.flexDirection = "column";

    this.generateChooseCharacterModal();
  }

  generateChooseCharacterModal() {
    this.modalContainerElement.style.backgroundColor = "#ABCDEF";
    this.modalContainerElement.style.maxWidth = "360px";

    const gameOverMessageElement = document.createElement("h3");

    gameOverMessageElement.textContent = "Você morreu!";
    gameOverMessageElement.style.margin = "0 0 8px 0";

    this.modalContainerElement.appendChild(gameOverMessageElement);

    this.generateConfirmationButton();
  }

  generateConfirmationButton() {
    const button = new Button({
      label: "Menu inicial",
      backgroundColor: "#000022DD",
      color: "#FFF",
    });

    button.element.style.display = "flex";
    button.element.style.justifyContent = "center";
    button.element.style.margin = "8px 0 0 0";

    button.element.addEventListener("click", () => {
      location.reload();
    });

    this.modalContainerElement.appendChild(button.element);
  }
}
