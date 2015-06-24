var React = require('react');

class Variation extends React.Component {
  render(){
    var variation = this.props.variation;
    var image = 'assets/variation_' + variation.id + '.png';
    return <div>
            <img src={image} />
            {variation.name}
            Intensität {variation.intensity}
            Preis {variation.price}
           </div>;
  }
};

module.exports = Variation;
