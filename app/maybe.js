let hasValue = (value) => {
  if(typeof value === 'undefined') return false;
  if(value === null) return false;
  return true;
}

class Maybe {
  constructor(value) {
    this.hasValue = hasValue(value);
    this.value = this.hasValue ? value : null;
  }
}

module.exports = Maybe;
