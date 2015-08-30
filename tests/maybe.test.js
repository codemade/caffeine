var chai = require('chai');
var expect = chai.expect;

describe('maybe', () => {
  let Maybe = require('../app/maybe.js');

  describe('constructing with undefined', () => {
    it('should have hasValue=false', () => {
      let maybe = new Maybe();
      expect(maybe.hasValue).to.equal(false);
    });

    it('should have hasValue=null', () => {
      let maybe = new Maybe();
      expect(maybe.value).to.equal(null);
    });
  });

  describe('constructing with null', () => {
    it('should have hasValue=false', () => {
      let maybe = new Maybe(null);
      expect(maybe.hasValue).to.equal(false);
    });

    it('should have hasValue=null', () => {
      let maybe = new Maybe(null);
      expect(maybe.value).to.equal(null);
    });
  });

  describe('constructing with a value object', () => {
    it('should have hasValue=true', () => {
      let value = {id: 42, name: 'john'};
      let maybe = new Maybe(value);
      expect(maybe.hasValue).to.equal(true);
    });

    it('should have value to deep equal that value object', () => {
      let value = {id: 42, name: 'john'};
      let maybe = new Maybe(value);
      expect(maybe.value).to.deep.equal(value);      
    });
  });
});
