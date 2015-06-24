var React = require('react');
var VariationCategory = require('../../app/components/variation-category.react.js');

class VariationList extends React.Component {
  render(){
    var categories = this.props.categories.map((category) => {
      var variations = this.props.variations
        .filter((variation) => {
          return variation.category === category.id;
        });
      return <VariationCategory category={category} variations={variations} />
    });

    return <div>
            <h2>Diese Variationen sind verfügbar:</h2>
            {categories}
          </div>;
  }
};
module.exports = VariationList;
