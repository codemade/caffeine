let React = require('react');
let ShoppingCartItem = require('./shopping-cart-item.react.js');

class ShoppingCartControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartContent: props.store.getShoppingCartContent()
    };
  }

  fetchData() {
    this.setState(
      {
        shoppingCartContent: this.props.store.getShoppingCartContent()
      }
    );
  }

  componentDidMount() {
    this.deregisterChangeListener = this.props.store.addChangeListener('changed', this.fetchData.bind(this));
  }

  componentWillUnmount() {
    this.deregisterChangeListener();
  }

  render() {
    let items = this.state.shoppingCartContent.items.map((item) => {
      return <ShoppingCartItem key={item.id} article={item} actionCreator={this.props.actionCreator} />;
    });

    let header = <div className='shopping-cart-header'>
      <div>Artikel</div>
      <div>Einzelpreis</div>
      <div>Anzahl</div>
      <div>Gesamtpreis</div>
    </div>;

    let footer = <div className='shopping-cart-footer'>
        <div></div>
        <div></div>
        <div>{this.state.shoppingCartContent.totalAmount}</div>
        <div>{this.state.shoppingCartContent.totalPrice / 100}</div>
      </div>;

    let warning = this.state.shoppingCartContent.packagingSizeInvalid
      ? <div className='shopping-cart-warning'>Gesamtmenge muss ein Vielfaches von 50 sein!</div>
      : '';

    return <div className='shopping-cart'>
      <h1>Shopping-Cart-View</h1>
      <div className='shopping-cart-content'>
        {header}
        {items}
        {footer}
      </div>
      {warning}
    </div>;
  }
}

module.exports = ShoppingCartControllerView;
