let React = require('react');
let RouterMixin = require('react-mini-router').RouterMixin;
let ArticlesControllerView = require('./articles-controller-view.react.js');
let ShoppingCartControllerView = require('./shopping-cart-controller-view.react.js');
let navigate = require('react-mini-router').navigate;

const App = React.createClass({
  mixins: [RouterMixin],
  routes: {
    '/': 'articles',
    '/shopping-cart': 'shoppingCart'
  },
  render() {
    let currentRoute = this.renderCurrentRoute();
    return currentRoute;
  },
  articles() {
    return <ArticlesControllerView store={this.props.store} actionCreator={this.props.actionCreator} navigate={navigate} />;
  },
  shoppingCart() {
    return <ShoppingCartControllerView store={this.props.store} actionCreator={this.props.actionCreator} />;
  }
});

module.exports = App;
