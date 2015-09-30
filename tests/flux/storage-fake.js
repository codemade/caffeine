class StorageFake {
  constructor() {
    this.data = [];
  }
  getItem(key) {
    return this.data[key];
  }
  setItem(key, value) {
    this.data[key] = value;
  }
}

module.exports = StorageFake;
