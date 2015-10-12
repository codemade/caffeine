/*eslint-disable no-unused-vars*/
let React = require('react');
let ReactDOM = require('react-dom');

let routie = require('./routing/routie.js');

let ArticleStore = require('./article-store.js');
let ActionCreator = require('./action-creator.js');
let DataAccess = require('./data-access.js');

let ArticlesControllerView = require('./components/articles-controller-view.react.js');
let ShoppingCartControllerView = require('./components/shopping-cart-controller-view.react.js');

let dataAccess = new DataAccess();
let actionCreator = new ActionCreator(dataAccess);
let store = new ArticleStore(sessionStorage);

const renderComponent = function(component) {
	ReactDOM.render(component, document.getElementById('content'));
};

routie({
	'': function() {
		renderComponent(<ArticlesControllerView store={store} actionCreator={actionCreator} navigate={routie} />);
	},
	'shopping-cart': function() {
		renderComponent(<ShoppingCartControllerView store={store} actionCreator={actionCreator} />);
	}
});
