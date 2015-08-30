var React = require('react');
var ArticleList = require('./article-list.react.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      articles: []
    };
  }

  handleDataChanged(){
    this.setState(
      {
        categories: this.props.store.getCategories(),
        articles: this.props.store.getArticles()
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
    return <div>
            <h1>Unsere Kaffee-Geschmackserlebnisse</h1>
            <ArticleList categories={this.state.categories}
                           articles={this.state.articles} />
          </div>;
  }
};
module.exports = App;
