class Modal {
  element = document.createElement("div");
  modalContainerElement = document.createElement("div");

  constructor() {
    this.generateModal();
  }

  generateModal() {
    this.element.style.display = "none";
    this.element.style.position = "fixed";
    this.element.style.height = "100vh";
    this.element.style.width = "100vw";
    this.element.style.zIndex = 999;
    this.element.style.justifyContent = "center";
    this.element.style.alignItems = "center";
    this.element.style.backgroundColor = "#22222299";

    this.modalContainerElement.style.padding = "20px";
    this.modalContainerElement.style.border = "2px solid #000";
    this.modalContainerElement.style.borderRadius = "8px";
    this.modalContainerElement.style.backgroundColor = "#DDD";

    this.element.appendChild(this.modalContainerElement);
  }

  closeModal() {
    this.element.style.display = "none";
  }

  openModal() {
    this.element.style.display = "flex";
  }
}
