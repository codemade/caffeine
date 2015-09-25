let React = require('react');

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

  componentDidMount() {
    this.deregisterChangeListener = this.props.store.addChangeListener('changed', this.handleDataChanged.bind(this));
  }

  componentWillUnmount() {
    this.deregisterChangeListener();
  }

  render() {
    let items = this.state.shoppingCartItems.map((item) => {
      return <div className='shopping-cart-item'>{item.name}</div>;
    });
    return <div className='shopping-cart'>
      <h1>Shopping-Cart-View</h1>
      {items}
    </div>;
  }
}

module.exports = ShoppingCartControllerView;
