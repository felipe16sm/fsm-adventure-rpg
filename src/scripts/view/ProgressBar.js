class ProgressBar {
  element = document.createElement("div");
  barElement = document.createElement("div");

  constructor({ value, totalValue, barColor }) {
    this.value = value;
    this.totalValue = totalValue;
    this.barColor = barColor;

    this.generateProgressBar();
  }

  generateProgressBar() {
    this.element.style.display = "flex";
    this.element.style.width = "120px";
    this.element.style.height = "20px";
    this.element.style.border = "2px solid #222222";
    this.element.style.borderRadius = "4px";

    this.paintBar();

    this.element.appendChild(this.barElement);
  }

  paintBar() {
    this.barElement.style.backgroundColor = this.barColor;
    this.barElement.style.height = "100%";
    this.barElement.style.width = `${(this.value / this.totalValue) * 100}%`;
  }

  changeValue(value) {
    if (value > this.totalValue) {
      this.value = this.totalValue;
    } else {
      this.value = value;
    }

    this.paintBar();

    const event = new CustomEvent("changeProgressBarValue");
    document.dispatchEvent(event);
  }

  changeTotalValue(value) {
    this.totalValue = value;

    this.paintBar();

    const event = new CustomEvent("changeProgressBarTotalValue");
    document.dispatchEvent(event);
  }
}
