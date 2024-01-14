class Button {
  element = document.createElement("div");

  constructor({ action, label, color, backgroundColor }) {
    this.label = label;
    this.color = color;
    this.backgroundColor = backgroundColor;

    this.element.addEventListener("click", () => {
      action && action();
    });

    this.generateButton();
  }

  generateButton() {
    this.element.style.color = this.color;
    this.element.style.backgroundColor = this.backgroundColor;

    this.element.classList.add("button");
    this.element.textContent = this.label;
  }
}
