let React = require('react');
var navigate = require('react-mini-router').navigate;

class ShoppingCartBadge extends React.Component {
  render() {

    var navigateToShoppingCart = () => {
      navigate('/shopping-cart');
    };

    return <div className='shopping-cart-badge' onClick={navigateToShoppingCart}>
      Shopping Cart
      <div className='article-count'>{this.props.shoppingCartInfo.articleCount}</div>
      <div className='total-price'>{this.props.shoppingCartInfo.totalPrice}</div>
    </div>
  }
}

ShoppingCartBadge.propTypes = {
  shoppingCartInfo: React.PropTypes.object.isRequired
}
module.exports = ShoppingCartBadge;
