let React = require('react');
let RouterMixin = require('react-mini-router').RouterMixin;
let ArticlesControllerView = require('./articles-controller-view.react.js');

const App = React.createClass({
  mixins: [RouterMixin],
  routes: {
    '/': 'articles'
  },
  render() {
    return this.renderCurrentRoute();
  },
  articles() {
    return <ArticlesControllerView store={this.props.store} actionCreator={this.props.actionCreator} />;
  }
});

module.exports = App;
