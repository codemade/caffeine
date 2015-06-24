var React = require('react');
var Variation = require('../../app/components/variation.react.js');

class VariationList extends React.Component {
  render(){
    return <div>
            These variations are available:
            <Variation />
            <Variation />
            <Variation />
          </div>;
  }
};

module.exports = VariationList;
