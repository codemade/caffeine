var React = require('react');
var Store = require('./store.js');
var ActionCreator = require('./action-creator.js');
var App = require('./components/app.react.js');
var DataAccess = require('./data-access.js');


var dataAccess = new DataAccess();
var actionCreator = new ActionCreator(dataAccess);
var store = new Store(actionCreator);

React.render(<App store={store} actionCreator={actionCreator} />, document.body);
