let React = require('react');

class ShoppingCartItem extends React.Component {
    render() {
      return <div className='shopping-cart-item'>
        <div className='name'>{this.props.article.name}</div>
        <div className='amount'>{this.props.article.amount}</div>
        <div className='price'>{this.props.article.price}</div>
      </div>;
    }
}

ShoppingCartItem.propTypes = {
  article: React.PropTypes.object.isRequired
};
module.exports = ShoppingCartItem;
