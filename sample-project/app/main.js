var React = require('react');
var Store = require('../app/store.js');
var ActionCreator = require('../app/action-creator.js');
var App = require('../app/components/app.react.js');
var DataAccess = require('../app/data-access.js');


var actionCreator = new ActionCreator(dataAccess);
var store = new Store(actionCreator);
var dataAccess = new DataAccess();


React.render(<App store={store} actionCreator={actionCreator} />, document.body);
