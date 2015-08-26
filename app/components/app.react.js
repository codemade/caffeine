var React = require('react');
var ArticleList = require('./article-list.react.js');
var ArticleInformation = require('./article-information.react.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      articles: [],
      selectedArticle: null
    };
  }

  handleDataChanged(){
    this.setState(
      {
        categories: this.props.store.getCategories(),
        articles: this.props.store.getArticles(),
        selectedArticle: this.props.store.getSelectedArticle()
      }
    );
  }

  componentWillMount(){
    this.props.store.addChangeListener('changed', this.handleDataChanged.bind(this));
    this.props.actionCreator.initialize();
  }

  filterByIntensity(intensity) {
    this.props.actionCreator.filterByIntensity(intensity);
  }

  render(){
    return <div>
            <h1>Unsere Kaffee-Geschmackserlebnisse</h1>
            <ArticleList categories={this.state.categories}
                         articles={this.state.articles}
                         actionCreator={this.props.actionCreator}/>
            <ArticleInformation article={this.state.selectedArticle}/>
          </div>;
  }
};

App.propTypes = {
  store: React.PropTypes.object,
  actionCreator: React.PropTypes.object
};
module.exports = App;
