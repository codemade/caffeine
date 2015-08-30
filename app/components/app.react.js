var React = require('react');
var ArticleList = require('./article-list.react.js');
var ArticleInformation = require('./article-information.react.js');
var Maybe = require('../maybe.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      articles: [],
      selectedArticle: new Maybe(null)
    };
  }

  handleDataChanged(){
    this.setState(
      {
        categories: this.props.store.getCategories(),
        articles: this.props.store.getArticles(),
        selectedArticle: this.props.store.getMaybeSelectedArticle(),
      }
    );
  }

  componentDidMount() {
    this.deregisterChangeListener = this.props.store.addChangeListener('changed', this.handleDataChanged.bind(this));
    this.props.actionCreator.initialize();
  }

  componentWillUnmount() {
    this.deregisterChangeListener();
  }

  filterByIntensity(intensity) {
    this.props.actionCreator.filterByIntensity(intensity);
  }

  render(){
    var articleInformation;
    if (this.state.selectedArticle.hasValue) {
      articleInformation = <ArticleInformation article={this.state.selectedArticle.value}/>;
    }
    console.log(this.state);

    return <div>
            <h1>Unsere Kaffee-Geschmackserlebnisse</h1>
            <ArticleList categories={this.state.categories}
                         articles={this.state.articles}
                         actionCreator={this.props.actionCreator}/>
            {articleInformation}
          </div>;
  }
};

App.propTypes = {
  store: React.PropTypes.object,
  actionCreator: React.PropTypes.object
};
module.exports = App;
