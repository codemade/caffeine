module.exports.clone = (item) => {
  return JSON.parse(JSON.stringify(item));
};

module.exports.formatAsPrice = function(number) {
  return number.toFixed(2) + ' €';
};