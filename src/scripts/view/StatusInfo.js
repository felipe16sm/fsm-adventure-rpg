class StatusInfo {
  element = document.createElement("div");
  labelElement = document.createElement("div");
  valueElement = document.createElement("div");

  constructor({ label, value }) {
    this.label = label;
    this.value = value;

    this.generateStatusInfo();
  }

  generateStatusInfo() {
    this.element.style.display = "flex";
    this.element.style.justifyContent = "space-between";
    this.element.style.alignItems = "center";
    this.element.style.fontSize = "14px";

    this.paintLabel();
    this.paintValue();

    this.element.appendChild(this.labelElement);
    this.element.appendChild(this.valueElement);
  }

  paintLabel() {
    this.labelElement.textContent = this.label;
    this.labelElement.style.marginRight = "8px";
  }

  paintValue() {
    this.valueElement.style.display = "flex";
    this.valueElement.style.width = "80px";
    this.valueElement.textContent = this.value;
  }
}
