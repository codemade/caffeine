let React = require('react');

class ShoppingCartBadge extends React.Component {
  render() {
    return <div className='shopping-cart-badge'>
      Shopping Cart Overview
      <div className='article-count'>{this.props.shoppingCartInfo.articleCount}</div>
      <div className='total-price'>{this.props.shoppingCartInfo.totalPrice}</div>
    </div>
  }
}

ShoppingCartBadge.propTypes = {
  shoppingCartInfo: React.PropTypes.object.isRequired
};
module.exports = ShoppingCartBadge;
