var React = require('react');
var Store = require('../app/store.js');
var ActionCreator = require('../app/action-creator.js');
var App = require('../app/components/app.react.js');
var DataAccess = require('../app/data-access.js');

var store = new Store();
var dataAccess = new DataAccess();
var actionCreator = new ActionCreator(dataAccess, store);

React.render(<App store={store} actionCreator={actionCreator} />, document.body);
