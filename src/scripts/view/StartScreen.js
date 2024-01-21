class StartScreen {
  element = document.createElement("div");

  constructor() {
    this.generateStartScreen();
  }

  generateStartScreen() {
    this.element.style.position = "relative";
    this.element.style.width = "100vw";
    this.element.style.height = "100vh";

    this.element.style.display = "flex";
    this.element.style.justifyContent = "center";
    this.element.style.alignItems = "center";
    this.element.style.backgroundColor = "#BBB";

    const backgroundImageElement = document.createElement("div");
    backgroundImageElement.style.position = "absolute";
    backgroundImageElement.style.left = "50%";
    backgroundImageElement.style.top = "50%";
    backgroundImageElement.style.transform = "translate(-50%, -50%)";

    backgroundImageElement.classList.add("start-image");

    const titleElement = document.createElement("h1");
    titleElement.style.position = "absolute";
    titleElement.style.top = "5%";
    titleElement.style.color = "#333";
    titleElement.style.fontSize = "24px";
    titleElement.textContent = "FSM Adventure RPG";

    const chooseCharacterModal = new ChooseCharacterModal();

    const startButton = new Button({
      label: "Iniciar Jogo",
      backgroundColor: "#222222DD",
      color: "#FFF",
    });

    startButton.element.style.zIndex = 0;

    startButton.element.addEventListener("click", () => {
      chooseCharacterModal.openModal();
    });

    startButton.element.addEventListener("mouseover", () => {
      startButton.element.style.scale = 1.2;
    });

    startButton.element.addEventListener("mouseleave", () => {
      startButton.element.style.scale = 1;
    });

    document.body.appendChild(chooseCharacterModal.element);
    this.element.appendChild(backgroundImageElement);
    this.element.appendChild(titleElement);
    this.element.appendChild(startButton.element);
  }
}
