var React = require('react');
var ArticleList = require('../../app/components/article-list.react.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      articles: []
    };
  }

  handleDataChanged(data){
    this.setState(data);
  }

  componentWillMount(){
    this.props.store.subscribe(this.handleDataChanged.bind(this));
    this.props.actionCreator.initialize();
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
