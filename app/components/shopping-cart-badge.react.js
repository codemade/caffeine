let React = require('react');

class ShoppingCartBadge extends React.Component {
  render() {
    let navigateToShoppingCart = () => {
      this.props.navigate('/shopping-cart');
    };

    return <div className='shoppingCartBadge shopping-cart-badge row' onClick={navigateToShoppingCart}>
      <div className='shoppingCartBadge__logo col-xs-2'><i className="fa fa-shopping-cart fa-2x"></i></div>
      <div className='shoppingCartBadge__cartInfo article-count col-xs-10'>{this.props.shoppingCartInfo.articleCount + ' Artikel: '} {this.props.shoppingCartInfo.totalPrice / 100 + ' €'}</div>
      
    </div>;
  }
}

ShoppingCartBadge.propTypes = {
  shoppingCartInfo: React.PropTypes.object.isRequired
};
module.exports = ShoppingCartBadge;
