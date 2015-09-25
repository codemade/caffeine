let React = require('react');

class ShoppingCartItem extends React.Component {
    render() {
      let image = 'assets/60x60/article_' + this.props.article.id + '.png';

      return <div className='shopping-cart-item'>
        <div><img src={image} />{this.props.article.name}</div>
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
