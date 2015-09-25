let React = require('react');

class ShoppingCartItem extends React.Component {
    render() {
      return <div className='shopping-cart-item'>
        <div>{this.props.article.name}</div>
        <div>{this.props.article.price / 100}</div>
        <div>{this.props.article.amount}</div>
        <div>{this.props.article.amount * this.props.article.price / 100}</div>
      </div>;
    }
}

ShoppingCartItem.propTypes = {
  article: React.PropTypes.object.isRequired
};
module.exports = ShoppingCartItem;
