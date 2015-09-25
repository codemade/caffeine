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
    return <div className='shopping-cart'>Shopping-Cart-View</div>;
  }
}

module.exports = ShoppingCartControllerView;
