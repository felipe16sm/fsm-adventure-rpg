class StatusProgressBarInfo {
  element = document.createElement("div");
  labelElement = document.createElement("div");
  infoElement = document.createElement("div");

  constructor({ label, progressBar }) {
    this.label = label;
    this.progressBar = progressBar;

    this.generateStatusInfo();

    document.addEventListener("changeProgressBarValue", () => {
      this.paintInfo();
    });
    document.addEventListener("changeProgressBarTotalValue", () => {
      this.paintInfo();
    });
  }

  generateStatusInfo() {
    this.element.style.display = "flex";
    this.element.style.alignItems = "center";
    this.element.style.fontSize = "14px";
    this.progressBar.element.style.margin = "0 8px";

    this.paintLabel();
    this.paintInfo();

    this.element.appendChild(this.labelElement);
    this.element.appendChild(this.progressBar.element);
    this.element.appendChild(this.infoElement);
  }

  paintLabel() {
    this.labelElement.textContent = this.label;
  }

  paintInfo() {
    this.infoElement.textContent = `${this.progressBar.value}/${this.progressBar.totalValue}`;
  }
}
