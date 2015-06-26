module.exports = function() {
  var jsdom = require('jsdom').jsdom;
  var baseMarkup = '<!DOCTYPE html><html><head><title></title></head><body></body></html>';
  var window = jsdom(baseMarkup).defaultView;
  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
}();
