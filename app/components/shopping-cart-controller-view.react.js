let React = require('react');
let ShoppingCartItem = require('./shopping-cart-item.react.js');

class ShoppingCartControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartContent: {
        totalAmount: 0,
        totalPrice: 0,
        items: []
      }
    };
  }

  handleDataChanged() {
    this.setState(
      {
        shoppingCartContent: this.props.store.getShoppingCartContent()
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
    let items = this.state.shoppingCartContent.items.map((item) => {
      return <ShoppingCartItem article={item} />;
    });

    let footer = <div className='shopping-cart-footer'>
        <div></div>
        <div></div>
        <div>{this.state.shoppingCartContent.totalAmount}</div>
        <div>{this.state.shoppingCartContent.totalPrice / 100}</div>
      </div>;

    return <div className='shopping-cart'>
      <h1>Shopping-Cart-View</h1>
      <div className='shopping-cart-header'>
        <div>Artikel</div>
        <div>Einzelpreis</div>
        <div>Anzahl</div>
        <div>Gesamtpreis</div>
      </div>
      {items}
      {footer}
    </div>;
  }
}

module.exports = ShoppingCartControllerView;
