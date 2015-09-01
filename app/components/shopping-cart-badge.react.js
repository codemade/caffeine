let React = require('react');

class ShoppingCartBadge extends React.Component {
  render() {
    return <div className='shopping-cart-badge'>
      Shopping Cart
      <span className='article-count'>{this.props.shoppingCartInfo.articleCount}</span>
      <span className='total-price'>{this.props.shoppingCartInfo.totalPrice}</span>
    </div>
  }
}

ShoppingCartBadge.propTypes = {
  shoppingCartInfo: React.PropTypes.object
}
module.exports = ShoppingCartBadge;
