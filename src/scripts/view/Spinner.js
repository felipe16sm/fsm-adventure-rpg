class Spinner {
  element = document.createElement("div");

  constructor() {
    this.generateSpinner();
  }

  generateSpinner() {
    this.element.classList.add("spinner");
  }
}
