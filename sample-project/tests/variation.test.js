var chai = require('chai');
var expect = chai.expect;
var React = require('react/addons');

describe('variations component', () => {  
  it('should not be null', () => {
    var component = require('../app/components/variation.react.js');
    expect(component).not.to.equal(null);
  });
});