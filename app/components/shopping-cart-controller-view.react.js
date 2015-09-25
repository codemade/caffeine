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
    return <div className='shopping-cart'>
      <h1>Shopping-Cart-View</h1>
      {items}
    </div>;
  }
}

module.exports = ShoppingCartControllerView;
