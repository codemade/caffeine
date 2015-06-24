var React = require('react');
var Variation = require('../../app/components/variation.react.js');

class VariationCategory extends React.Component {
  render(){
    var variations = this.props.variations.map((variation) => {
      return <Variation variation={variation} />
    });

    return <div>
            <h3>{this.props.category.name}</h3>
            {variations}
          </div>;
  }
};
module.exports = VariationCategory;
