class UUID {
  static generateUUIDv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        let v;

        if (c === "x") {
          v = r;
        } else {
          v = Math.floor(Math.random() * 4) + 8;
        }

        return v.toString(16);
      }
    );
  }
}
