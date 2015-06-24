var React = require('react');

class Variation extends React.Component {
  render(){
    var variation = this.props.variation;
    var image = 'assets/variation_' + variation.id + '.png';
    return <div className="variation-details">
            <img src={image} />
            <span className="variation-name">{variation.name}</span>&nbsp;(
            <span className="variation-intensity">Intensität {variation.intensity}</span>,&nbsp;
            <span className="variation-price">Preis {variation.price} €</span>)
           </div>;
  }
};

module.exports = Variation;
