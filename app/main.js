let React = require('react');
let ArticleStore = require('./article-store.js');
let ActionCreator = require('./action-creator.js');
let App = require('./components/app.react.js');
let DataAccess = require('./data-access.js');

let dataAccess = new DataAccess();
let actionCreator = new ActionCreator(dataAccess);
let store = new ArticleStore();

React.render(<App store={store} actionCreator={actionCreator} />, document.body);
