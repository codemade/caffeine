let React = require('react');
let ShoppingCartItem = require('./shopping-cart-item.react.js');

class ShoppingCartControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartItems: []
    };
  }

  handleDataChanged() {
    this.setState(
      {
        shoppingCartItems: this.props.store.getShoppingCartContent()
      }
    );
  }

  componentWillMount() {
    this.handleDataChanged();
  }

  componentDidMount() {
    this.deregisterChangeListener = this.props.store.addChangeListener('changed', this.handleDataChanged.bind(this));
  }

  componentWillUnmount() {
    this.deregisterChangeListener();
  }

  render() {
    let items = this.state.shoppingCartItems.map((item) => {
      return <ShoppingCartItem article={item} />;
    });

    let totalAmount = this.state.shoppingCartItems.reduce((acc, item) => {
      acc += item.amount;
      return acc;
    }, 0);

    let totalPrice = this.state.shoppingCartItems.reduce((acc, item) => {
      acc += item.amount * item.price / 100;
      return acc;
    }, 0);

    return <div className='shopping-cart'>
      <h1>Shopping-Cart-View</h1>
      <div className='shopping-cart-header'>
        <div>Artikel</div>
        <div>Einzelpreis</div>
        <div>Anzahl</div>
        <div>Gesamtpreis</div>
      </div>
      {items}
      <div className='shopping-cart-footer'>
        <div></div>
        <div></div>
        <div>{totalAmount}</div>
        <div>{totalPrice}</div>
      </div>
    </div>;
  }
}

module.exports = ShoppingCartControllerView;
