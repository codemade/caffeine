var chai = require('chai');
var expect = chai.expect;
var React = require('react/addons');
var DOM = require('../bootstrap-jsdom.js');
var renderTarget, component;

describe('variations component', () => {
  beforeEach(() => {
    var ComponentClass = require('../app/components/variation.react.js');
    renderTarget = DOM.document.getElementsByTagName('body')[0];
    var renderedComponent = React.createElement(ComponentClass, renderTarget);
    component = renderedComponent;
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    component = null;
  });

  it('should be able to render', () => {
    expect(component).not.to.equal(null);
  });

  it('should not be null', () => {
    expect(component).not.to.equal(null);
  });
});
