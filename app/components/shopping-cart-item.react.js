let React = require('react');

class ShoppingCartItem extends React.Component {
    render() {
      let image = 'assets/60x60/article_' + this.props.article.id + '.png';

      let addToCart = () => {
        this.props.actionCreator.addArticleToShoppingCart(this.props.article.id, 10);
      };

      return <div className='shopping-cart-item'>
        <div><img src={image} />{this.props.article.name}</div>
        <div>{this.props.article.price / 100}</div>
        <div>
          <span>{this.props.article.amount}</span>
          <button className='addToCart' onClick={addToCart}>+</button>
        </div>
        <div>{this.props.article.amount * this.props.article.price / 100}</div>
      </div>;
    }
}

ShoppingCartItem.propTypes = {
  article: React.PropTypes.object.isRequired
};
module.exports = ShoppingCartItem;
