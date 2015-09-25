let React = require('react');

class ShoppingCartItem extends React.Component {
    render() {
      let image = 'assets/60x60/article_' + this.props.article.id + '.png';

      let addToCart = () => {
        this.props.actionCreator.addArticleToShoppingCart(this.props.article.id, 10);
      };

      let removeFromCart = () => {
        this.props.actionCreator.removeArticleFromShoppingCart(this.props.article.id, 10);
      };

      return <div className='shopping-cart-item'>
        <div className='content'><img src={image} />{this.props.article.name}</div>
        <div className='content'>{this.props.article.price / 100}</div>
        <div>
          <span className='content'>{this.props.article.amount}</span>
          <button className='addToCart' onClick={addToCart}>+</button>
          <button className='removeFromCart' onClick={removeFromCart}>-</button>
        </div>
        <div className='content'>{this.props.article.amount * this.props.article.price / 100}</div>
      </div>;
    }
}

ShoppingCartItem.propTypes = {
  article: React.PropTypes.object.isRequired
};
module.exports = ShoppingCartItem;
