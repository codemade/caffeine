let React = require('react');
let Navigation = require('./navigation.react.js');
let ShoppingCartBadge = require('./shopping-cart-badge.react.js');
let ArticleList = require('./article-list.react.js');
let IntensityFilter = require('./intensity-filter.react.js');

let ArticlesControllerView = React.createClass({
  getInitialState() {
    return {
      categories: [],
      articles: [],
      shoppingCartInfo: {}
    };
  },

  handleDataChanged() {
    this.setState(
      {
        categories: this.props.store.getCategories(),
        articles: this.props.store.getArticles(),
        shoppingCartInfo: this.props.store.getShoppingCartBadgeInformation()
      }
    );
  },

  componentDidMount() {
    this.deregisterChangeListener = this.props.store.addChangeListener('changed', this.handleDataChanged);
    this.props.actionCreator.initialize();
  },

  componentWillUnmount() {
    this.deregisterChangeListener();
  },

  filterByIntensity(intensity) {
    this.props.actionCreator.filterByIntensity(intensity);
  },

  render() {
    let maximumIntensity = this.props.store.getMaximumPossibleIntensity();
    let availableIntensities = this.props.store.getAvailableIntensities();

    return <div>
            <Navigation>
              <ShoppingCartBadge shoppingCartInfo={this.state.shoppingCartInfo} navigate={this.props.navigate} />
            </Navigation>

            <div className="container contentWrapper">
              <IntensityFilter actionCreator={this.props.actionCreator}
                               maximumIntensity={maximumIntensity}
                               availableIntensities={availableIntensities} />
              <ArticleList categories={this.state.categories}
                           articles={this.state.articles}
                           actionCreator={this.props.actionCreator}/>
            </div>
          </div>;
  }
});

ArticlesControllerView.propTypes = {
  store: React.PropTypes.object.isRequired,
  actionCreator: React.PropTypes.object.isRequired
};
module.exports = ArticlesControllerView;
